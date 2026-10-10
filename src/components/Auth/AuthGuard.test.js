import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthContext from "../../contexts/AuthContext";
import AuthGuard from "./AuthGuard";

// The real Auth0 SDK needs browser APIs the test environment doesn't have, and these tests
// supply the sign-in state themselves, so replace it with an empty stand-in
jest.mock("@auth0/auth0-react", () => ({ useAuth0: jest.fn() }));

// Render the guard with a chosen sign-in state instead of a real Auth0 session
const renderGuard = (authValue) =>
  render(
    <AuthContext.Provider value={{ loginWithRedirect: jest.fn(), ...authValue }}>
      <AuthGuard>
        <p>My bookings page</p>
      </AuthGuard>
    </AuthContext.Provider>
  );

describe("AuthGuard", () => {
  it("shows a loading message while Auth0 checks the session", () => {
    renderGuard({ isAuthenticated: false, isLoading: true });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("My bookings page")).not.toBeInTheDocument();
  });

  it("asks a signed-out user to log in and hides the protected page", () => {
    renderGuard({ isAuthenticated: false, isLoading: false });

    expect(screen.getByText("Please log in to access this page")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
    expect(screen.queryByText("My bookings page")).not.toBeInTheDocument();
  });

  it("starts the Auth0 login when the signed-out user clicks Log In", () => {
    const loginWithRedirect = jest.fn();
    renderGuard({ isAuthenticated: false, isLoading: false, loginWithRedirect });

    userEvent.click(screen.getByRole("button", { name: "Log In" }));

    expect(loginWithRedirect).toHaveBeenCalled();
  });

  it("a signed in user can see the page", () => {
    renderGuard({ isAuthenticated: true, isLoading: false }); // if the user is authenticated at sign in, show them the page

    expect(screen.getByText("My bookings page")).toBeInTheDocument();
  });
});
