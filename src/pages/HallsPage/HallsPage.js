import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HallsCard from "../../components/HallsCard/HallsCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

const HallsPage = () => {
  const [hallsData, setHallsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHallsData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get("http://localhost:8080/api/v1/halls");
        setHallsData(resp.data);
        setError(null); // Reset error state
      } catch (err) {
        setError("Failed to fetch halls data");
        console.error("Error fetching halls:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHallsData();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        hallsData.map((hall) => (
          <HallsCard key={hall.hall_id} hallDetails={hall} />
        ))
      )}
      <Footer />
    </>
  );
};

export default HallsPage;
