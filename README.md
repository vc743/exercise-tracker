# Exercise Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application that helps users track their workouts. Users can create, view, edit, and delete workout entries with details like exercise title, load (weight), and number of repetitions.

## Features

- Create new workout entries
- View all workouts
- Edit existing workouts (working on it 🛠️)
- Delete workouts
- Real-time updates
- Responsive design for both desktop and mobile devices
- Error handling

## Tech Stack

### Frontend
- React.js
- Context API for state management
- CSS3 with responsive design
- Material Icons
- date-fns for date formatting

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exercise-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get a single workout
- `POST /api/workouts` - Create a new workout
- `PATCH /api/workouts/:id` - Update a workout
- `DELETE /api/workouts/:id` - Delete a workout

## Acknowledgments

- Inspired by the need for a simple and effective workout tracking solution 