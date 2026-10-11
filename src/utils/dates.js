// Event dates travel as "YYYY-MM-DD" strings. Build and read them in local time,
// so a date never shifts by a day between the browser, the API and the database.

// Local Date -> "YYYY-MM-DD"
export const toDateString = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

// "YYYY-MM-DD" (or an ISO timestamp starting with it) -> local Date at midnight
export const parseDateString = (value) => {
  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
};

// "YYYY-MM-DD" -> "October 15, 2026"
export const formatEventDate = (value) =>
  parseDateString(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Local midnight tomorrow: the earliest date that can be booked
export const tomorrow = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 1);
  return date;
};
