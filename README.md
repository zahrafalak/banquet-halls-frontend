# Sky Banquet Halls — Frontend

A responsive React application for browsing and booking banquet halls. Users can view available halls, browse menu packages, and submit booking requests.

**Live site:** https://banquet-halls-frontend.vercel.app

---

## Tech Stack

- **Framework:** React
- **Styling:** Bootstrap + SCSS
- **HTTP Client:** Axios
- **Hosting:** Vercel

---

## Features

- Browse available banquet halls with photos, capacity, and pricing
- View curated menu packages with detailed contents
- Submit booking requests with full form validation
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

3. Create a `.env` file in the root:
```
REACT_APP_API_URL=http://localhost:8080
```

4. Start the dev server
```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## Deployment

This frontend is deployed on **Vercel** with automatic deploys on every push to `main`.

The `REACT_APP_API_URL` environment variable is set in the Vercel dashboard to point to the live Railway backend.

---

## Form Validation

The booking form includes both frontend and backend validation:

- All fields are required
- Name fields accept letters and spaces only
- Email must be a valid format
- Event date must be in `YYYY-MM-DD` format and in the future
- A hall and menu package must be selected
- Validation runs on blur (as you leave each field) and on submit

---

## Project Structure

```
banquet-halls-frontend/
├── public/             # Static assets
└── src/
    ├── components/     # React components
    │   └── BookingForm/
    ├── contexts/       # React context (halls, menu packages)
    │   ├── HallsContext.js
    │   └── MenuContext.js
    └── App.js          # Root component
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API |

---

## Related

- **Backend repo:** https://github.com/zahrafalak/banquet-halls-backend
- **Live API:** https://banquet-halls-backend-production.up.railway.app
