![Cerberus](/client/src/assets/cerberusLogo.jpg "Cerberus Guard")
# Cerberus Guard

Cerberus Guard is a password manager that allows you to securely store and manage passwords for various applications and accounts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Securely store and manage passwords
- User-friendly interface
- Multi-platform support

## Installation

### Client

## Navigate to the `client` directory:

   ```bash
   cd client
   ````

1. Install dependencies:
   ```bash
   `npm install`
   ````
2. Start the development server:
   ```bash
   `npm run dev`
   ````
3. Open your browser and go to http://localhost:3000 to use Cerberus Guard.

### Server

## Navigate to the `server` directory:

   ```bash
   cd server
   ````
1. Install dependencies:
   ```bash
   `npm install`
   ````
2. Create a .env file in the server directory and configure your environment variables:
   ```bash
   PORT=3001
   DATABASE_URL=mysql://username:password@localhost:3306/cerberus
   JWT_SECRET=your-secret-key
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ````
3. Start the server:
   ```bash
   npm run dev
   ````
   Cerberus Guard server will be running at http://localhost:3001.

## Usage

1. Open Cerberus Guard in your browser.
2. Create an account or log in if you already have one.
3. Add and manage your passwords securely.

## Contributing
   Contributions are welcome! Please follow the contribution guidelines.




   


