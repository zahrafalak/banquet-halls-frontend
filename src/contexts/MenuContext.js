import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuPackages, setMenuPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuPackages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/menu-packages"
        );
        const packagesWithParsedContents = response.data.map((pkg) => ({
          ...pkg,
          contents: JSON.parse(pkg.contents), // Parse the JSON string back into an object
        }));
        setMenuPackages(packagesWithParsedContents);
      } catch (error) {
        setError("Failed to fetch menu packages.");
        console.error("Error fetching menu packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuPackages();
  }, []);

  return (
    <MenuContext.Provider value={{ menuPackages, isLoading, error }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
