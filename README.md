# Sky Banquet Halls — Frontend

A responsive React single-page application for browsing and booking banquet halls. Visitors can view halls and menu packages; logged-in users can request bookings and track them; admins can confirm or cancel requests.

**Live site:** https://banquet-halls-frontend.vercel.app

[![CI](https://github.com/zahrafalak/banquet-halls-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/zahrafalak/banquet-halls-frontend/actions/workflows/ci.yml)

---

## Tech Stack

- **Framework:** React (Create React App), React Router, Context API
- **Authentication:** Auth0 (`@auth0/auth0-react`)
- **Styling:** Bootstrap + SCSS
- **HTTP Client:** Axios
- **Testing:** Jest + React Testing Library
- **CI:** GitHub Actions
- **Hosting:** Vercel

---

## Features

- Browse available banquet halls with photos, capacity, and pricing
- View curated menu packages with detailed contents
- Log in with Auth0; the booking, My Bookings and admin pages are protected by a sign-in guard
- Submit booking requests with full form validation; the date picker disables past dates and dates already confirmed
- **My Bookings:** see your own booking requests and their status
- **Admin dashboard** (admin role only): view all booking requests and confirm or cancel them
- Every API call to a protected route sends the Auth0 access token as a bearer token
- Responsive design for tablet and desktop

---

## Local Development

### Prerequisites
- Node.js v18+
- Backend API running (see [backend repo](https://github.com/zahrafalak/banquet-halls-backend))

### Setup

1. Clone the repo
```bash
git clone https://github.com/zahrafalak/banquet-halls-frontend.git
cd banquet-halls-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root (never commit it):
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_AUDIENCE=your-auth0-api-identifier
```

4. Start the dev server
```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## Testing and CI

```bash
npm test
```

- **Booking form** (`src/components/BookingForm/BookingForm.test.js`): an invalid email shows an error as you leave the field; submitting an empty form shows every error and sends nothing.
- **Form validation rules** (`src/utils/formValidations.test.js`): blank fields, names (including O'Brien and Zoë), email, today vs tomorrow, dropdown selection, and the whole-form check.
- **Event dates** (`src/utils/dates.test.js`): dates are read and shown as the same calendar day the user picked.
- **Sign-in guard** (`src/components/Auth/AuthGuard.test.js`): shows a loading message while Auth0 checks the session, asks signed-out users to log in and hides the page, starts the Auth0 login on click, and shows the page to signed-in users.

GitHub Actions (`.github/workflows/ci.yml`) runs `npm ci`, the tests and the production build on every push and pull request. With `CI=true`, lint warnings fail the build. Vercel also builds a preview of every pull request.

---

## Deployment

This frontend is deployed on **Vercel** with automatic deploys on every push to `main`, and a preview deployment for every pull request.

The environment variables are set in the Vercel dashboard; `REACT_APP_API_URL` points to the live Railway backend.

---

## Form Validation

The booking form validates on the client with the same rules as the API (`src/utils/formValidations.js`), and the API validates again on the server:

- All fields are required
- Names accept letters (any language), spaces, apostrophes and hyphens, e.g. O'Brien, Zoë
- Email must be a valid format
- The event date must be after today; the date picker also disables past dates and dates already confirmed
- A hall and menu package must be selected
- Each field is checked as you leave it (or change it), and the whole form is checked on submit; nothing is sent while any field is invalid
- If the API still rejects a request, its validation message is shown

Event dates travel as `YYYY-MM-DD` strings and are read in local time (`src/utils/dates.js`), so a booking never shows a day early.

---

## Project Structure

```
banquet-halls-frontend/
├── .github/workflows/  # CI workflow (GitHub Actions)
├── public/             # Static assets
└── src/
    ├── components/     # React components (Admin, Auth, BookingForm, MyBookings, ...)
    ├── contexts/       # React context (auth, bookings, halls, menu packages)
    ├── pages/          # Route pages (Home, Halls, Menu, Booking, My Bookings, Admin)
    ├── utils/          # Form validation helpers (+ tests)
    └── App.js          # Routes, Auth0 provider and sign-in guard
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API |
| `REACT_APP_AUTH0_DOMAIN` | Auth0 tenant domain |
| `REACT_APP_AUTH0_CLIENT_ID` | Auth0 application client ID |
| `REACT_APP_AUTH0_AUDIENCE` | Auth0 API identifier (the audience of the access token) |

---

## Related

- **Backend repo:** https://github.com/zahrafalak/banquet-halls-backend
- **Live API:** https://banquet-halls-backend-production.up.railway.app/api/v1/halls

---

## How AI was used

I built the original app during my BrainStation diploma. In 2026 I added Auth0 login, and used Claude Code as a co-developer to build the My Bookings view and the admin dashboard, fix two Vercel build failures at their root, and add the tests and CI workflow. I reviewed every change, ran it in the browser, and kept secrets and AI-tool configuration out of the repository.
