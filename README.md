<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Claim Management System

A comprehensive NestJS-based claim management system for handling legal cases, clients, documents, and communications.

## Description

This is a robust claim management application built with NestJS framework that provides a complete solution for law firms and legal practitioners to manage their cases, clients, documents, and communications efficiently.

## Features

### Core Modules
- **User Management**: Authentication, authorization, and role-based access control
- **Case Management**: Create, update, and track legal cases
- **Client Management**: Manage client information and relationships
- **Document Management**: Upload, store, and manage case documents with AWS S3 integration
- **Communication**: Handle messages, emails, and call logs
- **Activity Logging**: Track all system activities for audit purposes

### Advanced Features
- **Time Loss Tracking**: Monitor and calculate time-related losses
- **Fee Management**: Handle billing and fee structures
- **Protest & Appeals**: Manage case protests and appeals
- **Excel Integration**: Import/export data via Excel files
- **AWS Integration**: Secure file storage with S3
- **Real-time Notifications**: Stay updated with case activities

## Technology Stack

- **Backend**: NestJS (Node.js Framework)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt for password hashing
- **File Storage**: AWS S3 with multer
- **Validation**: class-validator and class-transformer
- **Logging**: Morgan for HTTP request logging
- **Testing**: Jest for unit and e2e testing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- AWS S3 bucket (for file storage)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd claim-management

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/claim-management

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# Application
PORT=3000
NODE_ENV=development
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm run test:watch
```

## Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Build the project
npm run build
```

## Deployment

```bash
# Build the application
npm run build

# Run in production mode
npm run start:prod
```

## License

This project is proprietary software. All rights reserved.
