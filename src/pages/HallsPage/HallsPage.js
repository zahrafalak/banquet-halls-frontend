import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HallsCard from "../../components/HallsCard/HallsCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HallsPage = () => {
  const [hallsData, setHallsData] = useState([]);

  useEffect(() => {
    const fetchHallsData = async () => {
      const resp = await axios.get("http://localhost:8080/api/v1/halls");
      setHallsData(resp.data);
    };
    fetchHallsData();
  }, []);

  return (
    <>
      <Header />
      {hallsData.map((hall) => {
        return <HallsCard key={hall.hall_id} hallDetails={hall} />;
      })}
      <Footer />
    </>
  );
};

export default HallsPage;
