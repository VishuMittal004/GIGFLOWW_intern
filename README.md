# GIGFLOWW

GIGFLOWW is a modern web application built with Next.js, and Tailwind CSS. This project serves as a versatile starter for developing feature-rich applications, potentially focused on bartering services or similar functionalities.

## Features

*   **Next.js 15**: Leverages the latest features of the Next.js framework for server-side rendering, static site generation, and more.
*   **React 18**: Built with the latest version of React for a component-based UI.
*   **TypeScript**: For static typing and improved developer experience.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **Shadcn/ui & Radix UI**: Uses a suite of accessible and unstyled UI primitives, managed via `components.json`.
*   **Comprehensive Linting & Type Checking**: Ensures code quality and maintainability.
*   **Modern UI/UX**: Incorporates design principles like glass-morphism effects and teal accent colors, as established during development.

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory-name> # e.g., download
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    (or `yarn install` if you prefer Yarn)

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add any necessary environment variables (e.g., Firebase configuration, Genkit API keys).
    Example:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    # ... other Firebase config (projectId, storageBucket, etc.)
    # ... Genkit/Google AI API keys
    ```

## Available Scripts

In the project directory, you can run:

*   **`npm run dev`**:
    Runs the app in development mode with Turbopack on port 9003.
    Open [http://localhost:9003](http://localhost:9003) to view it in the browser.
    The page will reload if you make edits.

*   **`npm run build`**:
    Builds the app for production to the `.next` folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.

*   **`npm run start`**:
    Starts the production server after a build.

*   **`npm run lint`**:
    Lints the project files using Next.js's built-in ESLint configuration.

*   **`npm run typecheck`**:
    Runs the TypeScript compiler to check for type errors.

*   **`npm run genkit:dev`**:
    Starts the Genkit development server (likely for AI features).

*   **`npm run genkit:watch`**:
    Starts the Genkit development server with watch mode.

## Key Technologies

*   **Framework**: Next.js
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **UI Components**: Shadcn/ui, Radix UI
*   **Forms**: React Hook Form, Zod
*   **Deployment**: Potentially Google Cloud App Hosting (see `apphosting.yaml`)

## Project Structure Overview

```
.
├── .next/             # Next.js build output
├── node_modules/      # Project dependencies
├── public/            # Static assets (images, fonts, etc.)
├── src/               # Application source code
│   ├── app/           # Next.js App Router (pages, layouts)
│   ├── components/    # Reusable UI components (often Shadcn/ui)
│   ├── lib/           # Utility functions, helpers (if any)
├── .gitignore
├── apphosting.yaml        # Google Cloud App Hosting configuration
├── components.json        # Shadcn/ui configuration
├── next.config.ts         # Next.js configuration (or next.config.js)
├── package.json           # Project metadata and dependencies
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## License

Copyright (c) 2025 Vipanshu Mittal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## Author

*   **Vipanshu Mittal**
