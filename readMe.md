# expenseTracker

**How to run****


Download this repo as a ZIP from GitHub (Code → Download ZIP), then unzip it.
Open the unzipped folder in VS Code.
Open a terminal in VS Code and install dependencies:

bash
cd backend
npm install

cd ../frontend
npm install

Add a .env file in the backend folder with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Run it:
bash

# backend (in one terminal)
cd backend
npm start

# frontend (open a second terminal tab)
cd frontend
npm start

Open **http://localhost:3000** in your browser.
