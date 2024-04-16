import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MenuPackageCard from "../../components/MenuPackageCard/MenuPackageCard";

const MenuPage = () => {
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
    <>
      <Header />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : menuPackages.length > 0 ? (
          menuPackages.map((pkg) => (
            <MenuPackageCard key={pkg.package_id} packageData={pkg} />
          ))
        ) : (
          <p>No menu packages available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
