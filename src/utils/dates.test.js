import { toDateString, parseDateString, formatEventDate } from "./dates";

describe("event date helpers", () => {
  it("formats a local date as YYYY-MM-DD", () => {
    expect(toDateString(new Date(2026, 9, 5))).toBe("2026-10-05");
  });

  it("reads YYYY-MM-DD as that calendar day in local time, not the day before", () => {
    const date = parseDateString("2026-10-15");
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 9, 15]);
  });

  it("shows the same calendar day the user booked", () => {
    expect(formatEventDate("2026-10-15")).toBe("October 15, 2026");
  });
});
