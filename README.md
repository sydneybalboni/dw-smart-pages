# Discovery World Smart Pages
### **Made by Adam Swedlund, Mason Beynon, Zoe Kirkman, Reagan Burkemper, Michael Wood, Kathlyn Leanos, and Sydney Balboni**
Made for the 2024 MSOE Hacksgiving Hackathon, this project centers around an AI-Generated Exhibit Explorer designed to enhance visitor engagement and learning experiences at exhibits. By integrating features like multilingual text-to-speech, dynamic reading level adjustments, and interactive trivia questions, the solution promotes accessibility and personalization for diverse audiences. Visitors can collect badges, fostering motivation to explore more and return for future visits. This innovative system offers a mobile-friendly interface with seamless integration and scalability, using cost-effective AI and data storage solutions to deliver an educational, dynamic, and inclusive exhibit experience.

![GIF demo of application](images/dw_smart_pages_demo-ezgif.com-crop.gif)

## Project Setup Instructions

This repository contains both a frontend (Node.js-based) and a backend (Python FastAPI-based). Follow the steps below to set up and run each part of the project.

---

## **Frontend Setup**

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/):
   - Download the latest **LTS version** of Node.js from [Node.js Downloads](https://nodejs.org/).
   - Follow the installation instructions for your operating system.
   - Verify the installation:
     ```bash
     node -v
     npm -v
     ```
     This should display the installed versions of Node.js and npm.

### **Steps to Set Up Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to view the frontend.

---

## **Backend Setup**

### **Prerequisites**
1. Install [Python 3.12](https://www.python.org/):
   - Download the latest **Python 3.12 version** from [Python Downloads](https://www.python.org/downloads/).
   - Ensure to check the box for **Add Python to PATH** during installation.
   - Verify the installation:
     ```bash
     python --version
     ```

2. Install `pipenv` (Python dependency and virtual environment manager):
   ```bash
   pip install pipenv
   ```

### **Steps to Set Up Backend**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies and create a virtual environment with Pipenv:
   ```bash
   pipenv install
   ```

3. Activate the Pipenv virtual environment:
   ```bash
   pipenv shell
   ```

4. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   Alternatively, you can run `pipenv run uvicorn main:app --reload`

5. The backend will run at `http://127.0.0.1:8000`. Interactive API documentation is available at:
   - Swagger UI: `http://127.0.0.1:8000/docs`
   - ReDoc: `http://127.0.0.1:8000/redoc`

---

## **General Notes**
- Ensure both the frontend and backend are running simultaneously for full functionality.
- Make sure to use the respective `cd` commands to switch between the `frontend` and `backend` directories during setup and running.

---

## **Directory Structure**
```
project-root/
├── frontend/       # React-based frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── node_modules/
├── backend/        # FastAPI-based backend
│   ├── app/
│   ├── Pipfile
│   ├── requirements.txt
│   └── main.py
└── README.md
```

---

## **Contact**
If you encounter any issues during setup or running the project, please reach out to the repository maintainer.
