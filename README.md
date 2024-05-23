# React App with Vite, TypeScript, and Azure AD Authentication

This project is a React application bootstrapped with Vite and written in TypeScript. It uses libraries like MUI and Bootstrap for styling. It demonstrates how to implement Azure Active Directory (Azure AD) for authentication and conditional rendering of components based on user roles. Additionally, the APIs in the application are protected and accessible only by admin users.

## Features

- **Azure AD Authentication**: Secure authentication using Azure AD.
- **Role-Based Access Control**: Conditional rendering of components based on user roles.
- **Admin Protected APIs**: APIs accessible only by admin users.
- **Modern Development Setup**: Powered by Vite for fast development and TypeScript for type safety.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (>=18.x)
- npm (>=6.x)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kirtanmodi/react-app-azure
    cd react-app-azure
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Create a `.env` file in the root of the project and add your Azure AD configuration:

    ```env
    VITE_APP_APP_VERSION=1.0.0
    VITE_APP_NAME=React-app

    # DEV
    VITE_APP_FUNC_API_URL=<Your Function API URL>
    VITE_APP_APP_CLIENT_ID=<Your Azure AD Client ID>
    VITE_APP_AZURE_TENANT_ID=<Your Azure Tenant ID>
    VITE_APP_REDIRECT_URI=<Your Redirect URI>
    VITE_APP_FUNC_EXPOSED_API=<Your Exposed API>
    ```

### Running the App

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

Here's an overview of the project's structure:

```
├── public
│   └── index.html
├── src
│   ├── __redux
│   │   └── ...
│   ├── _metronic
│   │   └── ...
│   ├── app
│   │   ├── api
│   │   │   └── ...
│   │   ├── components
│   │   │   └── ...
│   │   ├── constants
│   │   │   └── ...
│   │   ├── modules
│   │   │   └── ...
│   │   ├── pages
│   │   │   └── ...
│   │   ├── routing
│   │   │   └── ...
│   │   └── ...
│   ├── App.tsx
│   ├── store.ts
│   ├── main.tsx
│   ├── msal-config.tsx
│   └── vite-env.d.ts
├── .env
├── .eslintrc.cjs
├── .eslintignore
├── .gitignore
├── deploy.mjs
├── index.ts
```

## API Integration

All APIs are deployed on Azure Functions and are protected to be accessible only by admin users.

## Contribution Guidelines

### How to Contribute

- Fork the repository.
- Create a branch for the feature that you are adding.
- Create a pull request with your branch.

