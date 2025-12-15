# Hello-Kot Frontend

Modern React/Next.js frontend application for the Hello-Kot backend API with OAuth2 authentication and CRUD operations.

## Features

- **OAuth2 Authentication**: Login with GitHub using Spring Security OAuth2
- **User Management**: Full CRUD operations for users (Create, Read, Update, Delete)
- **Product Management**: Full CRUD operations for products (Create, Read, Update, Delete)
- **Modern UI**: Built with Next.js 16, React 19, and TailwindCSS v4
- **Responsive Design**: Mobile-friendly and accessible interface
- **Reusable Components**: Generic CRUD table component for easy extension

## Tech Stack

- **Next.js 16.0**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **TailwindCSS 4**: Utility-first CSS framework
- **API Integration**: RESTful API communication with the Kotlin backend

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:8080`
- GitHub OAuth2 credentials configured in the backend

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env.local` file (already created):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
npm start
```

## Application Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with user profile
│   ├── users/             # Users management page
│   │   └── page.tsx
│   ├── products/          # Products management page
│   │   └── page.tsx
│   ├── layout.tsx         # Root layout with navigation
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── CRUDTable.tsx      # Generic CRUD table component
│   └── Navigation.tsx     # Navigation bar with auth
├── lib/                   # Utilities and helpers
│   └── api.ts            # API client for backend communication
├── types/                 # TypeScript type definitions
│   └── index.ts
├── next.config.ts         # Next.js configuration with proxy
└── package.json           # Dependencies and scripts
```

## API Endpoints Used

The frontend communicates with the following backend endpoints:

- `GET /api/user` - Get current authenticated user (OAuth2)
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user
- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

## Authentication Flow

1. User clicks "Login with GitHub" button
2. Redirected to GitHub OAuth2 authorization
3. After successful login, redirected back to the application
4. User profile is fetched from `/api/user` endpoint
5. User can now access protected CRUD operations

## Component Usage

### CRUDTable Component

The `CRUDTable` component is a reusable component for managing any entity with CRUD operations:

```tsx
<CRUDTable
  endpoint="/users"
  entityName="User"
  columns={[
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ]}
  formFields={[
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ]}
/>
```

## Backend Configuration

Ensure the backend allows CORS for the frontend URL. The Spring Boot backend should have:

```kotlin
// In SecurityConfig.kt
.cors { cors -> cors.configurationSource { 
    CorsConfiguration().apply {
        allowedOrigins = listOf("http://localhost:3000")
        allowedMethods = listOf("GET", "POST", "PUT", "DELETE")
        allowCredentials = true
    }
}}
```

## Development Notes

- The application uses Next.js rewrites to proxy API requests to the backend
- OAuth2 session cookies are sent with API requests using `credentials: 'include'`
- The frontend is designed to be easily extensible with new CRUD entities
- All components are built with TypeScript for type safety

## Future Enhancements

- Add pagination for large datasets
- Implement sorting and filtering
- Add form validation with more detailed error messages
- Add loading states and error boundaries
- Implement search functionality
- Add unit and integration tests

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

