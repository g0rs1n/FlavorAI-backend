
# 📦 Getting Started

## Prerequisites
- **Node.js (v18 or later)**
- **npm (comes with Node.js) or yarn**
- **PostgreSQL database running**

## 1. Clone the repository:

```
git clone https://github.com/g0rs1n/FlavorAI-backend.git
cd FlavorAI-backend
```

## 2. Install dependencies:

- ### Using npm:

```
npm install
```
- ### Using yarn:

```
yarn
```

## 3. Create `.env` file:

- ### Create a `.env` file in the root directory of your project with the following content:

```
# Replace with the full URL of your PostgreSQL database
DATABASE_URL=your_postgresql_database_url

# Frontend origin for CORS (your frontend app URL)
CORS_ORIGIN=http://localhost:3000

# Port on which the backend server will run
PORT=5001

# Secret key for signing JWT tokens (set a strong, random value)
JWT_SECRET=your-secure-jwt-secret

# Environment mode: "development"
NODE_ENV = "development" 
```

## 4. Run database migrations:

```
# Apply database migrations and generate Prisma Client

# Using npm:
npx prisma migrate dev

# Using yarn (works the same):
yarn prisma migrate dev
```

## 5. Start the development server:

- ### Using npm:

```
npm run start:dev
```
- ### Using yarn:

```
yarn start:dev
```
