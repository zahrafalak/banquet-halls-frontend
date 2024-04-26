import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MenuPackageCard from "../../components/MenuPackageCard/MenuPackageCard";
import React, { useContext } from "react";
import MenuContext from "../../contexts/MenuContext";

const MenuPage = () => {
  const { menuPackages, isLoading, error } = useContext(MenuContext);
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
