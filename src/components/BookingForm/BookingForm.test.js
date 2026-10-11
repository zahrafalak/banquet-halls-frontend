import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import HallsContext from "../../contexts/HallsContext";
import MenuContext from "../../contexts/MenuContext";
import BookingForm from "./BookingForm";

// The real Auth0 SDK and date picker need a browser session and the API; these tests don't
jest.mock("@auth0/auth0-react", () => ({ useAuth0: jest.fn() }));
jest.mock("axios", () => ({ post: jest.fn(), get: jest.fn() }));
jest.mock("./DatePicker", () => () => <div>date picker</div>);

const renderForm = () =>
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: null, getToken: jest.fn() }}>
        <HallsContext.Provider value={{ hallsData: [{ hall_id: 1, name: "Emerald Banquet Hall", price: "5000.00" }] }}>
          <MenuContext.Provider value={{ menuPackages: [{ package_id: 2, title: "Classic Elegance", price_per_head: "75.00" }] }}>
            <BookingForm />
          </MenuContext.Provider>
        </HallsContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );

describe("BookingForm", () => {
  it("shows an email error as soon as the user leaves an invalid email field", async () => {
    renderForm();

    userEvent.type(screen.getByLabelText("Email address"), "ayesha.example.com");
    userEvent.tab();

    // React applies the state update asynchronously, so wait for the message to appear
    expect(await screen.findByText("Please enter a valid email address")).toBeInTheDocument();
  });

  it("shows every error and doesn't send anything when submitted empty", async () => {
    renderForm();

    userEvent.click(screen.getByRole("button", { name: "Submit Booking Request" }));

    expect(await screen.findAllByText("This field cannot be blank")).toHaveLength(3);
    expect(screen.getByText("Please pick a date")).toBeInTheDocument();
    expect(screen.getAllByText("Please make a selection")).toHaveLength(2);
    expect(axios.post).not.toHaveBeenCalled();
  });
});
