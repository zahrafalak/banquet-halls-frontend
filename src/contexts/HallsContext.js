import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const HallsContext = createContext();

export const HallsProvider = ({ children }) => {
  const [hallsData, setHallsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHallsData = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/halls`);
        setHallsData(resp.data);
        setError(null);
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
    <HallsContext.Provider value={{ hallsData, loading, error }}>
      {children}
    </HallsContext.Provider>
  );
};

export default HallsContext;
