import { tomorrow } from "./dates";

// Same rules as the API (banquet-halls-backend/utils/bookingRequestHelpers.js)
// Letters from any language, plus spaces, apostrophes and hyphens (e.g. O'Brien, Jean-Luc, Zoë)
const NAME_PATTERN = /^[\p{L}\p{M}' -]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns an error message for one booking-form field, or "" when the value is valid
export const validateField = (field, value) => {
  switch (field) {
    case "firstName":
    case "lastName":
      if (!value.trim()) return "This field cannot be blank";
      if (!NAME_PATTERN.test(value.trim())) return "Please enter a valid name";
      return "";
    case "email":
      if (!value.trim()) return "This field cannot be blank";
      if (!EMAIL_PATTERN.test(value.trim())) return "Please enter a valid email address";
      return "";
    case "eventDate":
      if (!value) return "Please pick a date";
      if (value < tomorrow()) return "Please pick a future date";
      return "";
    case "hallId":
    case "menuId":
      return value ? "" : "Please make a selection";
    default:
      return "";
  }
};

// Validates the whole form; returns { fieldName: message } for every invalid field
export const validateBookingForm = (values) =>
  Object.fromEntries(
    Object.entries(values)
      .map(([field, value]) => [field, validateField(field, value)])
      .filter(([, message]) => message)
  );
