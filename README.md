# Todo Application

A modern, full-stack Todo application that allows users to seamlessly manage their daily tasks with real-time updates and persistent storage.

## 🚀 Tech Stack

The Todo App was built with the following stack

- React + vite: Used for a fast, optimized development environment and a component-based UI.

- Supabase: Serves as the backend-as-a-service, providing a PostgreSQL database and an API to perform CRUD operations.

- Tailwind CSS: Utilized for utility-first styling, ensuring a responsive and modern user interface.

- TanStack Query: Handles server-state management, including data fetching (useQuery), asynchronous updates (useMutation), and intelligent cache invalidation.

-ESLint and Prettier: for proper formating of codebase and to maintaini good code quality.

## ✨ Todo App Functionality

- Create: Add new todo items to the database.

- Read: Fetch and display a real-time list of all todos.

- Update: Edit existing todos directly in the UI with instant cache refreshing.

- Delete: Remove tasks from the list permanently.

- Loading & Error States: Graceful handling of network requests for a better user experience.

## 🛠️ Installation and Setup

- Clone the repo

```bash
git clone [https://github.com/Ayomiposy/Todo-App.git]
```

- Install Dependencies

```bash
 bun install
```

- Environment Variables

create a `.env` file in the root directory and add your Supaabse credentials

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- Run the app

```bash
bun run dev
```

## 👤 Author

Ayomiposi Joshua George.
