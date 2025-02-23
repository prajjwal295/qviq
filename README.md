# User Management API

This project is a simple User Management API built with Express.js, Mongoose, with Firebase Authentication and Integration . It supports various user operations such as creating, retrieving, updating.

## Installation

1 . Install Dependencies

```bash
npm install
npm cookie-parser
npm cors
npm dotenv
npm express
npm jsonwebtoken
npm mongoose
```

2 . Set up environment variables:
Create a .env file in the root directory and add the following environment variables:

```bash
Port =
DATABASE_URL = ""
JWT_SECRET = ""
```

3 . Start the server:

```bash
npm run dev
```

## Firebase Setup

### 1. Install Firebase SDK:

```bash
npm install firebase
```

### 2. Initialize Firebase in Your Project

```bash
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 3 . Configure Authentication

### 1. Email/Password Authentication

In the Firebase Console, go to the "Authentication" section.

Click on the "Sign-in method" tab
.
Enable "Email/Password" and save changes.

### 2. Google Authentication

In the Firebase Console, go to the "Authentication" section.

Click on the "Sign-in method" tab.

Enable "Google" and configure the settings as required (you might need to provide a project support email).

## API Endpoints

### 1 . Create User

URL: `http://localhost:${PORT}/api/v1/userRoute/signin`,

Method: POST

### 2 . Login User

URL: `http://localhost:${PORT}/api/v1/userRoute/Login`,

Method: POST

### 3 . Signup With Google

URL: `http://localhost:4000/api/v1/auth/signupWithGoogle`,

Method: POST

### 4 . Get User Details

URL: `http://localhost:4000/api/v1/auth/getUserDetails/${userId}`

Method: GET

Description: Retrieve details of a specific user by their ID.

### 5 . Update User Details

URL: `http://localhost:4000/api/v1/auth/updateProfile`

Method: PUT

Description: Update user details (requires authentication)

### 6 . Delete User

URL: `http://localhost:4000/api/v1/auth/deleteUser`

Method: Delete

Description: Deletes user.

## QR Generation

### 1. Install `qrcode.react`

To generate QR codes, install the qrcode.react library:

```bash
npm install qrcode.react
```

### 2 . Create a QR Code Component

```bash

import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QR = (value) => {
  console.log(value);
  return (
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCodeSVG value={"User Get URL"} />,
      </div>
  );
};

export default QR;

```
