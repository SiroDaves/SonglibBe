# SongLib Backend

This repository contains the backend for the **SongLib** application, a platform that allows users to manage, store, and access their song collections. The backend is deployed at [songlib.vercel.app](https://songlib.vercel.app), providing API endpoints to power the SongLib frontend and handle various operations related to songs.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with this project, you'll need Node.js installed. You can clone the repository and install the necessary dependencies by following these steps:

```bash
git clone https://github.com/SiroDaves/SonglibBe.git
```

```bash
cd SonglibBe
```

```bash
npm install
```

## Project Structure

The repository follows a typical Node.js backend structure, with models, routes, and API logic neatly organized into their respective directories.

```
SongLibBe/
├── api/                 # API-related logic and handlers
├── models/              # Database models for songs, users, etc.
├── routes/              # Route definitions for API endpoints
├── index.js             # Main entry point for the server
├── package.json         # Project dependencies and scripts
├── .env.example         # Example environment variables file
└── vercel.json          # Vercel deployment configuration
```

### Key Files and Directories

- **`api/`**: Contains the core logic for interacting with songs and handling API requests.
- **`models/`**: Defines the database schema for the entities used in SongLib (e.g., songs, users).
- **`routes/`**: Defines the endpoints for interacting with the API, including song CRUD operations.
- **`index.js`**: The main file that initializes the server and connects the routes and database.
- **`vercel.json`**: Contains the configuration for deploying the backend to Vercel.

## API Endpoints

Here’s a breakdown of some of the key API routes available in the backend:

| Method | Endpoint          | Description                           |
|--------|-------------------|---------------------------------------|
| GET    | `/api/songs`       | Retrieve a list of all songs          |
| POST   | `/api/songs`       | Add a new song to the collection      |
| GET    | `/api/songs/:id`   | Retrieve details of a specific song   |
| PUT    | `/api/songs/:id`   | Update an existing song               |
| DELETE | `/api/songs/:id`   | Remove a song from the collection     |

The backend is designed to work with JSON data, so ensure that requests are sent in JSON format.

## Environment Variables

The backend requires specific environment variables to run. These variables should be stored in a `.env` file at the root of your project. An example `.env.example` file is provided in this repository.

Here are the required environment variables:

- **`DATABASE_URL`**: Connection string for your database.
- **`PORT`**: The port on which the server will run.

Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

## Dependencies

The project uses the following major dependencies:

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Vercel**: For easy and seamless deployment of the backend.

For the full list of dependencies, check the `package.json` file.

## Running Locally

Once the dependencies are installed and environment variables are set up, you can run the backend locally using:

```bash
npm run dev
```

This will start the server in development mode, and it should be accessible at `http://localhost:4000`.
