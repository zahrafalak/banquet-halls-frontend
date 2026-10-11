import { validateField, validateBookingForm } from "./formValidations";
import { tomorrow } from "./dates";

describe("validateField", () => {
  it.each(["firstName", "lastName", "email"])("flags a blank %s", (field) => {
    expect(validateField(field, "  ")).toBe("This field cannot be blank");
  });

  it("flags a name with numbers or symbols", () => {
    expect(validateField("lastName", "Kh@n1")).toBe("Please enter a valid name");
  });

  it.each(["Ayesha", "O'Brien", "Jean-Luc", "Zoë"])("accepts the name %s", (name) => {
    expect(validateField("firstName", name)).toBe("");
  });

  it("flags an email without an @", () => {
    expect(validateField("email", "ayesha.example.com")).toBe("Please enter a valid email address");
  });

  it("accepts a valid email", () => {
    expect(validateField("email", "ayesha@example.com")).toBe("");
  });

  it("asks for a date when none is picked", () => {
    expect(validateField("eventDate", null)).toBe("Please pick a date");
  });

  it("flags today, which is too soon to book", () => {
    expect(validateField("eventDate", new Date())).toBe("Please pick a future date");
  });

  it("accepts tomorrow", () => {
    expect(validateField("eventDate", tomorrow())).toBe("");
  });

  it("asks for a hall or menu selection when none is made", () => {
    expect(validateField("hallId", "")).toBe("Please make a selection");
    expect(validateField("menuId", "2")).toBe("");
  });
});

describe("validateBookingForm", () => {
  const completeForm = {
    firstName: "Ayesha",
    lastName: "Khan",
    email: "ayesha@example.com",
    eventDate: tomorrow(),
    hallId: "1",
    menuId: "2",
  };

  it("passes a fully completed form", () => {
    expect(validateBookingForm(completeForm)).toEqual({});
  });

  it("lists every invalid field", () => {
    expect(validateBookingForm({ ...completeForm, lastName: "", email: "nope", menuId: "" })).toEqual({
      lastName: "This field cannot be blank",
      email: "Please enter a valid email address",
      menuId: "Please make a selection",
    });
  });
});
