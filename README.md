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

## API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh JWT token

### Case Management
- `GET /cases` - List all cases
- `POST /cases` - Create new case
- `GET /cases/:id` - Get case details
- `PUT /cases/:id` - Update case
- `DELETE /cases/:id` - Delete case

### Client Management
- `GET /clients` - List all clients
- `POST /clients` - Create new client
- `GET /clients/:id` - Get client details
- `PUT /clients/:id` - Update client information

### Document Management
- `POST /documents/upload` - Upload document to S3
- `GET /documents/:id` - Download document
- `DELETE /documents/:id` - Delete document

## Project Structure

```
src/
├── modules/
│   ├── auth/           # Authentication & authorization
│   ├── user/           # User management
│   ├── case/           # Case management
│   ├── client/         # Client management
│   ├── case-documents/ # Document management
│   ├── case-message/   # Case communications
│   ├── case-mail/      # Email management
│   ├── call-log/       # Call logging
│   ├── activity-log/   # Activity tracking
│   ├── fee/            # Fee management
│   ├── time-loss/      # Time loss calculations
│   ├── excel/          # Excel operations
│   ├── aws/            # AWS S3 integration
│   └── admin/          # Admin functionality
├── common/
│   ├── interfaces/     # Shared interfaces
│   └── middleware/     # Custom middleware
├── database/           # Database configuration
├── utils/              # Utility functions
├── app.module.ts       # Root module
└── main.ts            # Application entry point
```

## Database Schema

The application uses MongoDB with the following main collections:
- **users**: User accounts and authentication
- **cases**: Legal case information
- **clients**: Client details and contacts
- **documents**: File metadata and S3 references
- **activity_logs**: System activity tracking
- **fees**: Billing and fee information

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

### Production Deployment

1. **Build the application**:
```bash
npm run build
```

2. **Set production environment variables**:
```env
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-production-secret
# ... other production variables
```

3. **Run in production mode**:
```bash
npm run start:prod
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### Cloud Deployment Options

- **AWS**: Deploy using ECS, Lambda, or EC2
- **Google Cloud**: Use Cloud Run or App Engine
- **Azure**: Deploy to Container Instances or App Service
- **Heroku**: Simple deployment with Git push

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write unit tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Ensure all tests pass before submitting PR

## Security Considerations

- JWT tokens are used for authentication
- Passwords are hashed using bcrypt
- File uploads are validated and stored securely on S3
- Input validation using class-validator
- Role-based access control for sensitive operations

## Performance

- Database indexing on frequently queried fields
- Efficient pagination for large datasets
- Caching strategies for frequently accessed data
- Optimized file upload/download streams
- Connection pooling for database operations

## Monitoring and Logging

- HTTP request logging with Morgan
- Activity logging for audit trails
- Error tracking and reporting
- Performance monitoring capabilities
- Health check endpoints

## API Rate Limiting

Configure rate limiting to prevent abuse:
```typescript
// In your main.ts or app module
import * as rateLimit from 'express-rate-limit';

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));
```

## License

This project is proprietary software. All rights reserved.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## Changelog

### Version 0.0.1
- Initial release
- Basic CRUD operations for cases and clients
- Authentication and authorization
- Document management with AWS S3
- Activity logging
- Fee management
- Excel import/export functionality
