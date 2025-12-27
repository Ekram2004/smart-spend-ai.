# 💰 SmartSpend AI: Intelligent Finance Tracker

**SmartSpend AI** is a full-stack personal finance dashboard that leverages Large Language Models (LLMs) to automate the tedious task of transaction categorization. Built with a focus on data integrity and modern AI integration, it provides real-time spending insights through a sleek, data-driven UI.

---

## 🚀 Key Features

* **AI-Powered Categorization:** Uses Google Gemini 1.5 Flash to automatically classify transaction descriptions into categories (Food, Transport, Housing, etc.).
* **Real-time Analytics:** Dynamic spending breakdown using **Recharts** to visualize financial health.
* **ACID-Compliant Storage:** Managed **PostgreSQL** database ensuring data consistency and relational integrity.
* **Modern ORM Layer:** Implemented **Prisma 7** for type-safe database queries and automated migrations.

---

## 🛠️ The Tech Stack

| Layer | Technology | Why I chose it |
| :--- | :--- | :--- |
| **Frontend** | React.js | For a component-based architecture and efficient UI updates. |
| **Backend** | Node.js / Express | To handle asynchronous API requests and AI processing. |
| **Database** | PostgreSQL (Supabase) | Chosen over NoSQL to handle complex relational data and financial accuracy. |
| **ORM** | Prisma 7 | To manage schema migrations and provide a clean API for DB interactions. |
| **AI Engine** | Gemini 1.5 API | Provides high-speed, cost-effective natural language classification. |
| **Styling** | Lucide-React | For clean, professional iconography throughout the dashboard. |

---

## ⚙️ System Architecture

The application follows a standard **RESTful architecture** with an added AI middleware layer:

1.  **Client:** Captures user input (e.g., "Sushi with the team - $50").
2.  **API Layer:** Validates data and routes the description to the **AI Service**.
3.  **AI Service:** Gemini processes the string and returns a structured category ("Food").
4.  **Data Layer:** Prisma saves the enriched transaction to the **PostgreSQL** database.
5.  **Analytics:** The frontend fetches the updated dataset and calculates category aggregates.



---

## 📈 Technical Highlight: Data Transformation

One of the core challenges was converting raw transaction rows into a format suitable for visualization. I implemented a grouping algorithm using the `.reduce()` method to calculate spending totals per category:

$$Total_{Category} = \sum \text{Transaction Amounts in that Category}$$

This allows the UI to render a distribution chart in $O(n)$ time complexity, ensuring performance even as the transaction history grows.

---

## 🏗️ Installation & Setup

### Prerequisites
* Node.js (v18+)
* A Supabase (PostgreSQL) account
* A Gemini AI API Key

### Backend Setup
1.  Navigate to the `/server` folder.
2.  Install dependencies: `npm install`.
3.  Create a `.env` file and add:
    ```env
    DATABASE_URL="your-postgresql-url"
    GEMINI_API_KEY="your-api-key"
    ```
4.  Initialize the database: `npx prisma db push`.
5.  Start the server: `node index.js`.

### Frontend Setup
1.  Navigate to the `/client` folder.
2.  Install dependencies: `npm install`.
3.  Start the app: `npm start`.

---

## 🧑‍💻 Author
**Your Name**
* LinkedIn: [Your LinkedIn Profile]
* Portfolio: [Your Portfolio Link]
