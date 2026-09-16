# Exercise Tracker

A full-stack Exercise Tracker built with **React**, **Node.js**, **Express**, and **MongoDB**.

The application allows users to create users, add exercises, and view exercise logs with optional date and limit filters.

## Features

- Create new users
- Get all users
- Get a specific user
- Add exercises for users
- View exercise logs
- Filter exercise logs by date
- Limit the number of exercises returned
- Use the current date when no date is provided
- Store user and exercise data in MongoDB
- REST API built with Express
- React frontend
- Loading and error states
- Responsive user interface
- View API responses as JSON
- React frontend served by Express in production

## Tech Stack

### Frontend

- React
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## How It Works

The application has three main operations:

### 1. Create a User

The user submits a username from the React frontend.

```text
React

  │

  │ POST /api/users

  ▼

createUser

  │

  ├── Read username

  ├── Create user in MongoDB

  └── Return username and user ID

  │

  ▼

JSON Response

  │

  ▼

React UI
```

### 2. Add an Exercise

The user provides a User ID, exercise description, duration, and an optional date.

```text
React

  │

  │ POST /api/users/:_id/exercises

  ▼

addExercise

  │

  ├── Find user by ID

  ├── Read exercise details

  ├── Use current date if date is not provided

  └── Create exercise in MongoDB

  │

  ▼

JSON Response

  │

  ▼

React UI
```

### 3. View Exercise Logs

The user can view the exercise history for a specific user.

```text
GET /api/users/:_id/logs

        │

        ▼

getExerciseLog

        │

        ├── Find user

        ├── Apply optional date filters

        ├── Apply optional limit

        ├── Get exercises from MongoDB

        └── Format exercise log

        │

        ▼

JSON Response

        │

        ▼

React UI
```

## API Endpoints

### Create User

```http
POST /api/users
```

Creates a new user.

### Request Body

```text
username=fcc_test
```

### Example Request

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=fcc_test"
```

### Example Response

```json
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05"
}
```

### Get All Users

```http
GET /api/users
```

Returns all users.

### Example Response

```json
[
  {
    "username": "fcc_test",
    "_id": "5fb5853f734231456ccb3b05"
  },
  {
    "username": "john_doe",
    "_id": "60a7c8d9e123456789abcdef"
  }
]
```

### Get User

```http
GET /api/users/:_id
```

Returns a specific user using their User ID.

### Example

```text
http://localhost:8000/api/users/5fb5853f734231456ccb3b05
```

### Example Response

```json
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05"
}
```

### Add Exercise

```http
POST /api/users/:_id/exercises
```

Adds an exercise to a specific user.

### Request Body

```text
description=Cycling
duration=10
date=2026-09-14
```

The `date` field is optional.

If no date is provided, the current date is used.

### Example Request

```bash
curl -X POST http://localhost:8000/api/users/5fb5853f734231456ccb3b05/exercises \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "description=Cycling&duration=10&date=2026-09-14"
```

### Example Response

```json
{
  "username": "fcc_test",
  "_id": "5fb5853f734231456ccb3b05",
  "description": "Cycling",
  "duration": 10,
  "date": "Mon Sep 14 2026"
}
```

### Get Exercise Log

```http
GET /api/users/:_id/logs
```

Returns the exercise log for a specific user.

### Query Parameters

The following query parameters are optional:

- `from` - Start date in `yyyy-mm-dd` format
- `to` - End date in `yyyy-mm-dd` format
- `limit` - Maximum number of exercises to return

### Example

```text
http://localhost:8000/api/users/5fb5853f734231456ccb3b05/logs
```

### Example With Filters

```text
http://localhost:8000/api/users/5fb5853f734231456ccb3b05/logs?from=2026-09-01&to=2026-09-17&limit=10
```

### Example Response

```json
{
  "username": "fcc_test",
  "count": 2,
  "_id": "5fb5853f734231456ccb3b05",
  "log": [
    {
      "description": "Cycling",
      "duration": 10,
      "date": "Mon Sep 14 2026"
    },
    {
      "description": "Running",
      "duration": 30,
      "date": "Tue Sep 15 2026"
    }
  ]
}
```

## Exercise Log Format

The React application displays exercises in the following format:

```text
Cycling - 10 minutes - Mon Sep 14 2026
Running - 30 minutes - Tue Sep 15 2026
Swimming - 20 minutes - Wed Sep 16 2026
```

## Database Structure

The application uses MongoDB with two collections.

### User

```text
User
├── _id
└── username
```

### Exercise

```text
Exercise
├── _id
├── user
├── description
├── duration
└── date
```

The `user` field in the Exercise collection references the `_id` of a User.

```text
User

  │

  └── _id

       │

       ▼

Exercise

  └── user
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB connection string.

## How to Run

### 1. Clone the Repository

```bash
git clone <your-repository-url>

cd exercise-tracker
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
npm --prefix client install
```

### 4. Configure Environment Variables

Create a `.env` file:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB connection string.

### 5. Run in Development

```bash
npm run dev
```

This starts the Express and Express serves both the React frontend and the API

- Express backend: `http://localhost:8000`

Open the application:

```text
http://localhost:8000
```

### 6. Build for Production

```bash
npm run build
```

This creates the React production build inside:

```text
client/build
```

### 7. Start the Production Server

```bash
npm start
```

In production, Express serves both the React frontend and the API.

Open:

```text
http://localhost:8000
```

## How to Use

### Create a User

1. Open the application.
2. Select **Create User**.
3. Enter a username.
4. Click **Create User**.
5. Copy the generated User ID.

Example:

```text
Username: fcc_test
User ID: 5fb5853f734231456ccb3b05
```

### Add an Exercise

1. Select **Add Exercise**.
2. Enter the User ID.
3. Enter the exercise description.
4. Enter the duration in minutes.
5. Optionally select a date.
6. Click **Add Exercise**.

Example:

```text
Exercise: Cycling
Duration: 10 minutes
Date: Mon Sep 14 2026
```

### View Exercise Logs

1. Select **View Exercise Logs**.
2. Enter the User ID.
3. Optionally select a **From** date.
4. Optionally select a **To** date.
5. Optionally enter a **Limit**.
6. Click **View Log**.

The exercises will be displayed as:

```text
Cycling - 10 minutes - Mon Sep 14 2026
Running - 30 minutes - Tue Sep 15 2026
Swimming - 20 minutes - Wed Sep 16 2026
```

## API JSON Links

The application provides links to view API responses directly in a new browser tab.

### User JSON

```text
/api/users/:_id
```

### Exercise Log JSON

```text
/api/users/:_id/logs
```

## Available Scripts

### Start Production Server

```bash
npm start
```

### Start Backend With Nodemon

```bash
npm run server
```

### Start React Client

```bash
npm run client
```

### Run Frontend and Backend Together

```bash
npm run dev
```

### Build React Application

```bash
npm run build
```

## Error Handling

The application handles errors such as:

- Missing username
- Invalid User ID
- User not found
- Missing exercise information
- Invalid requests
- Server errors

Errors are displayed in the React result section.

Example:

```text
Oops!

User not found
```

## FreeCodeCamp

This project was built as part of the **freeCodeCamp APIs and Microservices** curriculum.

The project implements the required Exercise Tracker API functionality, including:

- Creating users
- Getting all users
- Getting a specific user
- Adding exercises
- Viewing exercise logs
- Date filtering
- Result limits
- Optional exercise dates

## License

This project is licensed under the ISC License.
