import {
  validateTextInput,
  validateDropdownSelection,
  validateAllFormFields,
} from "./formValidations";

// The validators read e.target.id and e.target.value, then pass the new errors to setError
const runTextValidation = (id, value, errors = {}) => {
  const setError = jest.fn();
  validateTextInput({ target: { id, value } }, errors, setError);
  return setError.mock.calls[0][0];
};

describe("validateTextInput", () => {
  it("flags a blank field", () => {
    expect(runTextValidation("inputFirstName", "  ")).toEqual({
      inputFirstName: "This field cannot be blank",
    });
  });

  it("flags a name with numbers or symbols", () => {
    expect(runTextValidation("inputLastName", "Kh@n1")).toEqual({
      inputLastName: "Please enter a valid name",
    });
  });

  it("clears the error once the name is corrected", () => {
    const errors = { inputFirstName: "Please enter a valid name" };

    expect(runTextValidation("inputFirstName", "Ayesha", errors)).toEqual({});
  });

  it("flags an email without an @", () => {
    expect(runTextValidation("exampleForm.ControlInput1", "ayesha.example.com")).toEqual({
      "exampleForm.ControlInput1": "Please enter a valid email address",
    });
  });

  it("accepts a valid email", () => {
    expect(runTextValidation("exampleForm.ControlInput1", "ayesha@example.com")).toEqual({});
  });

  it("flags a date that is not in YYYY-MM-DD format", () => {
    expect(runTextValidation("inputEventDate", "15/06/2099")).toEqual({
      inputEventDate: "Please enter the date in YYYY-MM-DD format",
    });
  });

  it("flags a date in the past", () => {
    expect(runTextValidation("inputEventDate", "2020-01-01")).toEqual({
      inputEventDate: "Please enter a future date",
    });
  });

  it("accepts a future date", () => {
    expect(runTextValidation("inputEventDate", "2099-06-15")).toEqual({});
  });

  it("keeps errors on other fields", () => {
    const errors = { inputLastName: "Please enter a valid name" };

    expect(runTextValidation("inputFirstName", "Ayesha", errors)).toEqual(errors);
  });
});

describe("validateDropdownSelection", () => {
  it("asks for a selection when none is made", () => {
    const setError = jest.fn();
    validateDropdownSelection({ target: { id: "hallSelection", value: "" } }, {}, setError);

    expect(setError).toHaveBeenCalledWith({ hallSelection: "Please make a selection" });
  });

  it("clears the error once an option is chosen", () => {
    const setError = jest.fn();
    const errors = { hallSelection: "Please make a selection" };
    validateDropdownSelection({ target: { id: "hallSelection", value: "1" } }, errors, setError);

    expect(setError).toHaveBeenCalledWith({});
  });
});

describe("validateAllFormFields", () => {
  // A stand-in for the form's ref: elements looked up by id, each with a value
  const formRef = (values) => ({
    current: {
      elements: Object.fromEntries(
        Object.entries(values).map(([id, value]) => [id, { value }])
      ),
    },
  });

  const completeForm = {
    inputFirstName: "Ayesha",
    inputLastName: "Khan",
    "exampleForm.ControlInput1": "ayesha@example.com",
    inputEventDate: "2099-06-15",
    hallSelection: "1",
    menuSelection: "2",
  };

  it("passes a fully completed form", () => {
    expect(validateAllFormFields(formRef(completeForm))).toEqual({
      formIsValid: true,
      errors: {},
    });
  });

  it("blocks submission and lists every blank field", () => {
    const result = validateAllFormFields(
      formRef({ ...completeForm, inputLastName: "", menuSelection: " " })
    );

    expect(result).toEqual({
      formIsValid: false,
      errors: {
        inputLastName: "This field cannot be blank",
        menuSelection: "This field cannot be blank",
      },
    });
  });
});
