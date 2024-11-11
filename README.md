# React Native Auth Boilerplate

A full-stack authentication boilerplate featuring a React Native mobile app built with Expo and an Express.js API server with TypeScript for robust backend functionality.

---

## Project Structure

```plaintext
├── api/                  # Backend Express.js server
│   ├── src/              # Source code
│   ├── drizzle/          # Database migrations
│   └── package.json      # Backend dependencies
├── mobile/               # React Native mobile app
│   ├── app/              # App screens and navigation
│   ├── src/              # Source code
│   ├── assets/           # Images and other assets
│   └── package.json      # Mobile dependencies
└── README.md
```

## Features

- **Express.js backend with TypeScript** for robust server-side handling.
- **React Native mobile app with Expo** for cross-platform mobile experiences.
- **JWT Authentication system** for secure user sessions.
- **Drizzle ORM** for efficient database migrations and handling.

## Getting Started

### Prerequisites

Ensure that you have **Node.js**, **pnpm**, and **Expo CLI** installed.

### API Server Setup

1. **Navigate to the API directory**:

```bash
cd api
```

2. **Install dependencies**:

```bash
pnpm install
```

2. **Set up environment variables**:

```bash
cp .env.example .env
```

3. **Run database migrations**:

```bash
pnpm db:migrate
```

4. **Start the development server**:

```bash
pnpm dev
```

The API server will run on http://localhost:3000.

### Mobile App Setup

1. **Navigate to the mobile directory**:

```bash
cd mobile
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Prebuild the Expo application**:

```bash
npx expo prebuild
```

4. **Run on desired platform**:

- iOS: **`npx expo run:ios`**
- Android: **`npx expo run:android`**

## Scripts

### API

- **`pnpm dev`** - Start development server with hot reload
- **`pnpm build`** - Build for production
- **`pnpm db:generate`** - Generate database migrations
- **`pnpm db:migrate`** - Run database migrations
- **`pnpm db:studio`** - Open database GUI

### Mobile

- **`pnpm start`** - Start Expo development server
- **`pnpm reset-project`** - Reset project
- **`pnpm android`** - Run on Android
- **`pnpm ios`** - Run on iOS
- **`pnpm web`** - Run on web
- **`pnpm test`** - Run tests
- **`pnpm lint`** - Run linter

## Tech Stack

### Backend

- **Express.js**
- **TypeScript**
- **Drizzle ORM**
- **PostgreSQL**
- **JWT** for secure token-based authentication
- **Cookie-based auth** for session handling

### Mobile

- **React Native** with Expo
- **React Query** for data fetching and caching
- **React Hook Form** for form handling
- **Zod** for schema validation
- **Axios** for HTTP requests
