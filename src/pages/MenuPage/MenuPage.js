import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuPackageCard from "../../components/MenuPackageCard/MenuPackageCard";

const MenuPage = () => {
  const [menuPackages, setMenuPackages] = useState([]);

  useEffect(() => {
    const fetchMenuPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/menu-packages"
        );
        const menuPackages = response.data.map((pkg) => ({
          ...pkg,
          contents: JSON.parse(pkg.contents), // Parse the JSON string back into an object
        }));
        setMenuPackages(menuPackages);
      } catch (error) {
        console.error("Error fetching menu packages:", error);
      }
    };

    fetchMenuPackages();
  }, []);
  return (
    menuPackages && (
      <>
        <Header />
        <div>
          {menuPackages.map((pkg) => {
            return <MenuPackageCard key={pkg.package_id} packageData={pkg} />;
          })}
        </div>
        <Footer />
      </>
    )
  );
};

export default MenuPage;
