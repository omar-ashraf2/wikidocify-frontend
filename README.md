# React App Setup and Run Instructions

This document provides instructions to set up and run the React application locally, including configuration for connecting to a backend API.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher recommended)
- **npm** (usually comes with Node.js)
- A code editor like **VS Code** (optional but recommended)
- Git (optional, if cloning the repository)
- A backend server running on `http://localhost:8080` (ensure it is configured to allow CORS from `http://localhost:3000`)

## Steps to Run the React App

1. **Clone the Repository** (if applicable)  
   If the project is hosted in a Git repository, clone it to your local machine:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Configure Environment Variables**  
   Create a `.env` file in the `frontend` directory (if not already present) and ensure it contains the following:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   ```
   This sets the base URL for API requests to the backend running on `http://localhost:8080`.

3. **Install Dependencies**  
   Navigate to the `frontend` directory (if not already there) and install the required dependencies using npm:
   ```bash
   cd frontend
   npm install
   ```

4. **Run the Backend Server**  
   Ensure the backend server is running on `http://localhost:8080`. The backend must be configured to allow CORS requests from `http://localhost:3000` (the frontend's address). Refer to your backend documentation for CORS setup instructions.

5. **Run the Development Server**  
   Start the frontend development server to run the React app locally:
   ```bash
   npm run dev
   ```
   This will start the app in development mode on `http://localhost:3000`. Open your browser and navigate to `http://localhost:3000` to view the app.

6. **Build the App for Production** (Optional)  
   To create an optimized production build:
   ```bash
   npm run build
   ```
   The build output will be in the `dist` folder.

7. **Preview the Production Build** (Optional)  
   To preview the production build locally:
   ```bash
   npm run preview
   ```
   This will serve the production build locally, typically at `http://localhost:4173`.

## Additional Notes
- Ensure you have a stable internet connection during `npm install` to download dependencies.
- The frontend runs on port `3000` by default, and the backend must be running on port `8080` with the API endpoint at `http://localhost:8080/api/v1`.
- Verify that the backend CORS configuration allows requests from `http://localhost:3000` to avoid CORS-related errors.
- If you encounter issues, check the Node.js version (`node -v`) and npm version (`npm -v`) to ensure compatibility.
- For further customization, refer to the project's `package.json` file for additional scripts or configurations.

## Troubleshooting
- **Error: "command not found: npm"**  
  Ensure Node.js and npm are installed. Download Node.js from [nodejs.org](https://nodejs.org).
- **CORS Errors**  
  If you see CORS errors in the browser console, ensure the backend is running on `http://localhost:8080` and has CORS enabled for `http://localhost:3000`.
- **Port already in use**  
  If port `3000` is occupied, you can specify a different port by setting the `PORT` environment variable:
  ```bash
  PORT=3001 npm run dev
  ```
  Update the backend CORS configuration to allow the new port if changed.

For more help, consult the [React documentation](https://react.dev/) or the [Vite documentation](https://vitejs.dev/) (if the project uses Vite as the build tool).
