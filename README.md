## DataMagic Lite

## A Smart AI-Powered Data Visualization Web App

Upload your Excel or CSV file and instantly get beautiful dashboards + chat with AI in English or Urdu.

---

##  Features

* File Upload — Support for Excel (.xlsx) and CSV files
* Auto Dashboard — Automatically generates 6-8 insightful charts
* AI Chatbot — Ask questions in English or Urdu
* Raw Data Table — View complete data with pagination
* Interactive Charts — Built with Recharts
* Export Dashboard — Download dashboard as PNG/PDF
* User Authentication — Secure login using Supabase
* Responsive Design — Works on Desktop and Mobile

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* Recharts
* Supabase Auth

### Backend

* FastAPI
* Pandas
* Python
* Groq / Claude AI
* Supabase Database

---

##  Project Structure

DataMagic-Lite/

├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Upload/
│   │   │   ├── Dashboard/
│   │   │   ├── Charts/
│   │   │   ├── Chat/
│   │   │   └── Table/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Login.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── auth.ts
│   │   │
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── upload.py
│   │   │   ├── dashboard.py
│   │   │   └── chat.py
│   │   │
│   │   ├── services/
│   │   │   ├── data_processor.py
│   │   │   ├── chart_generator.py
│   │   │   └── ai_service.py
│   │   │
│   │   ├── models/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── docs/
│   ├── screenshots/
│   ├── diagrams/
│   └── user-guide.md
│
├── .gitignore
├── README.md
└── LICENSE


---

##  MVP Scope

1. Upload CSV/Excel
2. Auto Dashboard Generation
3. AI Chat (English + Urdu)
4. Raw Data Table
5. Export Dashboard

---

## 🚀 Getting Started

### Frontend

npm install

npm run dev

### Backend

pip install -r requirements.txt

uvicorn app.main:app --reload

---



---

## 📋 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/malikamjid01/datamagic-lite.git
cd datamagic-lite
