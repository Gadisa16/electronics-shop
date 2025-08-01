# E-commerce Application

This repository contains a full-stack e-commerce application with a React front-end and an Express back-end. The application supports user authentication, product browsing, shopping cart functionality, and order management.

## Features

- User authentication (sign up, sign in, sign out)
- Product browsing by category
- Shopping cart functionality
- Order management
- Payment processing with Stripe

## Project Structure

The project is structured into two main directories: `backend` and `front-end`.

```
├── backend/        # Express.js backend
│   ├── .env        # Environment variables
│   ├── .gitignore  # Specifies intentionally untracked files that Git should ignore
│   ├── index.js    # Main entry point for the backend server
│   ├── package.json# Lists project dependencies and scripts
│
├── front-end/      # React frontend
│   ├── .env        # Environment variables
│   ├── .eslintrc.cjs # Configuration for ESLint
│   ├── .firebaserc  # Firebase project configuration file
│   ├── .gitignore  # Specifies intentionally untracked files that Git should ignore
│   ├── firebase.json# Firebase hosting configuration file
│   ├── index.html  # Main HTML file
│   ├── package.json# Lists project dependencies and scripts
│   ├── public/     # Static assets
│   ├── src/        # React source code
│   │   ├── API/      # API interaction files
│   │   ├── Components/ # Reusable React components
│   │   ├── Pages/    # React pages/views
│   │   ├── Utility/  # Utility functions
│   │   ├── App.jsx   # Main application component
│   │   ├── main.jsx  # Entry point for React
│   │   ├── Router.jsx# React Router configuration
│   ├── vite.config.js# Configuration for Vite build tool
│
├── .gitignore      # Specifies intentionally untracked files that Git should ignore
```


## Technologies
- react, Vite, Javascript, CSS, express,
- Firebase, stripe


## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Gadisa16/electronics-shop.git
cd e-commerce-app