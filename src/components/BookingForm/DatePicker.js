import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const DatePicker = ({ selected, onChange }) => {
  const [excludedDates, setExcludedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/booked-dates`
        );
        setExcludedDates(data.map((d) => new Date(d.event_date)));
      } catch (error) {
        console.error("Failed to fetch booked dates:", error);
      }
    };
    fetchBookedDates();
  }, []);

  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      excludeDates={excludedDates}
      minDate={new Date()}
      placeholderText="Select event date"
      className="form-control booking-form__input"
      dateFormat="yyyy-MM-dd"
      autoComplete="off"
    />
  );
};

export default DatePicker;
