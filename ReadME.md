
# Notes App

This project is a full-stack application that uses a React frontend and an Express backend. The application is a note-taking app where users can create, read, update, and delete notes.

## Frontend

The frontend of the application is built using React. It uses Vite as a build tool, as mentioned in the client/README.md file. The application also uses the **@vitejs/plugin-react-swc** plugin for fast refresh during development.

The application uses Tailwind CSS for styling, as seen in the **/client/tailwind.config.js** and **/client/src/index.css** files. It also uses Flowbite, a utility-first CSS framework.

The application uses React Router for routing, as seen in the **/client/src/main.jsx** file. It also uses the Context API for state management, specifically for authentication state, as seen in the **/client/src/context/AuthContext.jsx** file.

The application communicates with the backend using Axios, as seen in the **/client/src/pages/Login.jsx** file.

## Backend

The backend of the application is built using Express. It uses Sequelize as an ORM for interacting with a MySQL database. The database models are defined in the **/server/models** directory.

The backend uses Passport for authentication, specifically using the Bearer strategy for token-based authentication and the Google strategy for Google OAuth, as seen in the **/server/index.js** file.

The backend provides several API endpoints for user authentication and note management, as seen in the **/server/apiRoutes/routes.js** file.

## Running the Project

To run the frontend of the application, navigate to the client directory and run the following command:

``npm run dev``

To run the backend of the application, navigate to the server directory and run the following command:

``npm run dev``

## Environment Variables

The backend uses several environment variables, which are loaded using the dotenv package. These include the Google OAuth client ID and secret, the JWT secret, and the database credentials.

## Linting

The project uses ESLint for linting, with a configuration file located at **/client/.eslintrc.cjs.**