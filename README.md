# Ride-Sharing Application 🚗

A ride-sharing application built to connect drivers and riders efficiently. This project includes features like ride requests, driver-rider matching, real-time updates using WebSockets, and a user-friendly interface for managing rides and requests.

---

## Features

- **Authentication**: Secure user registration and login system using JWT.
- **Role Flexibility**: Users can switch between being a driver or a rider.
- **Ride Requests**: Riders can create ride requests with location and destination details.
- **Driver Matching**: Drivers can view nearby ride requests and accept them.
- **Real-Time Updates**: Real-time ride status updates using WebSockets.
- **Profile Management**: Users can update their personal information and vehicle details.
- **Responsive UI**: Optimized for both mobile and web platforms.

---

## Tech Stack

### Frontend
- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: Context API
- **Styling**: TailwindCSS
- **Icons**: Ionicons

### Backend
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Real-Time**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express middleware and Mongoose validators

### Deployment
- **Frontend**: Expo
- **Backend**: Node.js with Express
- **Database**: MongoDB Atlas

---

## Getting Started

### Prerequisites
- **Node.js**: v14+
- **MongoDB**: Local or Atlas instance
- **Expo CLI**: For running the React Native app

### Installation
1. Clone the repository
2. start mongoDB instance locally
3. create .env files for client and server with your data
4. cd on-my-way/server
   npm i
   npm run start
5. cd on-my-way/client
   npm i
   npm run start
