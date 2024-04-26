import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HallsCard from "../../components/HallsCard/HallsCard";
import React, { useContext } from "react";
import BookingForm from "../../components/BookingForm/BookingForm";
import HallsContext from "../../contexts/HallsContext";

const HallsPage = () => {
  const { hallsData, loading, error } = useContext(HallsContext);

  return (
    <>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {hallsData.map((hall) => {
            return <HallsCard key={hall.hall_id} hallDetails={hall} />;
          })}
        </>
      )}
      <Footer />
    </>
  );
};

export default HallsPage;
