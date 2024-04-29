export const validateTextInput = (e, errors, setError) => {
  const { id, value } = e.target;
  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Copy current errors to avoid direct state mutation
  const newErrors = { ...errors };

  if (value.trim() === "") {
    newErrors[id] = "This field cannot be blank";
  } else {
    delete newErrors[id]; // Clear existing errors if the input is corrected
  }

  if (
    (id === "inputFirstName" || id === "inputLastName") &&
    !nameRegex.test(value)
  ) {
    newErrors[id] = "Please enter a valid name";
  } else if (id === "exampleForm.ControlInput1" && !emailRegex.test(value)) {
    newErrors[id] = "Please enter a valid email address";
  } else if (id === "inputEventDate") {
    if (!dateRegex.test(value)) {
      newErrors[id] = "Please enter the date in YYYY-MM-DD format";
    } else {
      const inputDate = new Date(value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (inputDate < currentDate) {
        newErrors[id] = "Please enter a future date";
      } else {
        delete newErrors[id]; // Clear error if date is correct
      }
    }
  }

  setError(newErrors);
};

export const validateDropdownSelection = (e, errors, setError) => {
  const { id, value } = e.target;

  const newErrors = { ...errors }; // Copy current errors to avoid direct state mutation

  if (value === "") {
    newErrors[id] = "Please make a selection";
  } else {
    delete newErrors[id]; // Clear existing errors if the input is corrected
  }

  setError(newErrors);
};

export const validateAllFormFields = (formRef) => {
  const requiredFields = [
    "inputFirstName",
    "inputLastName",
    "exampleForm.ControlInput1",
    "inputEventDate",
    "hallSelection",
    "menuSelection",
  ];

  let formIsValid = true;
  const errors = {};

  requiredFields.forEach((fieldId) => {
    const input = formRef.current.elements[fieldId];
    if (!input.value.trim()) {
      errors[fieldId] = "This field cannot be blank";
      formIsValid = false;
    }
  });

  return { formIsValid, errors };
};
