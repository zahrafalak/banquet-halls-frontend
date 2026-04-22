import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const DatePicker = ({ selected, onChange }) => {
  const { getToken } = useAuth();
  const [excludedDates, setExcludedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/booked-dates`,
          { headers: { Authorization: `Bearer ${token}` } });
        setExcludedDates(data.map((d) => new Date(d.event_date)));
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
      }
    };
    fetchBookedDates();
  }, []);

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onChange}
      disabled={[{ before: new Date() }, ...excludedDates]}
      footer={selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a date"}
    />
  );
};

export default DatePicker;
