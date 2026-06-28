# AI Analytics Dashboard Backend

A FastAPI backend for a new AI Analytics Dashboard that allows users to upload datasets, generate dashboards, and interact with their data using AI.

--- 

## Features

* 🔐 Supabase JWT Authentication
* 📁 CSV & Excel File Upload
* 📊 Automatic Dashboard & KPI Generation
* 📈 Dynamic Chart Recommendations
* 🤖 AI Chat using Groq
* 🗄 SQLite (default) or PostgreSQL
* ⚡ FastAPI + SQLAlchemy + Pandas

---

## Tech Stack

* **Framework:** FastAPI
* **Language:** Python 3.12
* **Database:** SQLite / PostgreSQL
* **Authentication:** Supabase
* **ORM:** SQLAlchemy
* **Validation:** Pydantic
* **Data Processing:** Pandas
* **AI:** Groq API

---

## Project Structure

```text
backend/
│
├── app/
│   ├── core/
│   ├── modules/
│   │   ├── auth/
│   │   ├── datasets/
│   │   ├── dashboard/
│   │   └── chat/
│   ├── shared/
│   └── main.py
│
├── uploads/
├── requirements.txt
├── .env.example
└── README.md
```

Each module follows a simple structure:

```text
router.py      → API endpoints
service.py     → Business logic
schemas.py     → Request/Response models
```

---

## Installation

### 1. Clone the project

```bash
cd backend
```

### 2. Create a virtual environment

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

Example:

```env
DEBUG=True

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

DATABASE_URL=sqlite:///./analytics.db

GROQ_API_KEY=your-groq-api-key

UPLOAD_DIRECTORY=./uploads
```

> JWT verification uses Supabase JWKS, so `SUPABASE_JWT_SECRET` is not required.

---

## Run the Application

Development

```bash
uvicorn app.main:app --reload
```

Production

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Open Swagger UI:

```
http://localhost:8000/docs
```

---

## API Endpoints

### Authentication

| Method | Endpoint   | Description      |
| ------ | ---------- | ---------------- |
| GET    | `/auth/me` | Get current user |

### Datasets

| Method | Endpoint                       | Description     |
| ------ | ------------------------------ | --------------- |
| POST   | `/datasets/upload`             | Upload dataset  |
| GET    | `/datasets`                    | List datasets   |
| GET    | `/datasets/{dataset_id}/table` | Preview dataset |
| DELETE | `/datasets/{dataset_id}`       | Delete dataset  |

### Dashboard

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/dashboard/{dataset_id}` | Generate dashboard |

### Chat

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/chat`              | Chat with dataset |
| GET    | `/chat/{dataset_id}` | Chat history      |

---

## Architecture

The project follows a **Modular Monolith** architecture.

```
Router
   ↓
Service
   ↓
Database / Shared Utilities
```

Each module is independent and contains its own routes, business logic, and schemas.

---

## Security

* Supabase JWT Authentication
* User-specific dataset access
* File type validation
* File size limit
* SQLAlchemy ORM protection

---

## License

This project is for educational and personal use.

---

## Author

**AI Analytics Dashboard Backend**
