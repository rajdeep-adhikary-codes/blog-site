# Blog site Backend Server Setup

This guide provides steps to set up and run the backend server for this project.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A `.env` file and `dbConfig.json` file configured with your database and environment variables.

## Setup Instructions

1. **Clone this repository:**
   git clone <repository-url>

2. **Navigate to the backend directory:**
   cd backend

3. **Copy the .env file:**
   Place your .env file at the root of the backend directory. Ensure it contains the required environment variables.


4. **Add the database configuration file:**
   Place your dbConfig.json file inside the config folder in the backend directory.


5. **Install dependencies:**
   npm install


6. **Start the server:**
   npm start


7. **Additional Information**
   The server will run on the port specified in your .env file, or default to port 3000 if unspecified.
   Check the logs for successful database connections and server start status.



#########################################################################################################################


# Blog site frontend Setup

This guide provides steps to set up and run the React frontend for the Blog Application.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Ensure the backend server is set up and running, as it provides the API endpoints for this app.

## Setup Instructions

1. **Clone this repository:**
   git clone <repository-url>


2. **Navigate to the frontend directory:**
   cd frontend


3. **Install dependencies:**
   npm install


4. **Start the development server:**
   npm start
   The app will run on http://localhost:3000 by default.
   Ensure the backend server is running, and API endpoints are accessible for full functionality.


   
5. **Additional Notes**
   Configuration: Update any necessary environment variables (e.g., API URLs) in the .env file at the root of the frontend folder.
   Build for Production: To build the app for production, use:
   
   npm run build

   This will create an optimized build in the build folder, ready to be deployed.





