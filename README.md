  PdfToDocsConverter
  
  A simple web application to convert **PDF to DOCX** and **DOCX to PDF**.  
  This project contains two main parts:
  - **Frontend**: React application (`docx-to-pdf-frontend`)
  - **Backend**: Node.js/Express server (`backend`)
  
  ---
  
  ## Folder Structure
  
  PdfToDocsConverter/
  ├── backend/ # Backend server
  ├── docx-to-pdf-frontend/ # Frontend React app
  └── README.md
  
  yaml
  Copy code
  
  ---
  
  ## Prerequisites
  
  Make sure you have installed:
  
  - [Node.js](https://nodejs.org/) (v18+ recommended)
  - npm (comes with Node.js)
  - Git
  
  ---
  
  ## Setup Instructions
  
  ### 1️⃣ Clone the repository
  
  ```bash
  git clone https://github.com/Akashsharma81/PdfToDocsConverter.git
  cd PdfToDocsConverter
  2️⃣ Setup Backend
  bash
  Copy code
  cd backend
  npm install       # Install backend dependencies
  npm start         # Start backend server (default port: 5000)
  Note: Configure .env file if required.
  
  3️⃣ Setup Frontend
  Open a new terminal and run:
  
  bash
  Copy code
  cd docx-to-pdf-frontend
  npm install       # Install frontend dependencies
  npm start         # Start React app (default port: 3000)
