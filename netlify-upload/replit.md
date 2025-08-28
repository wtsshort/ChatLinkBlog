# WTSSHORT - WhatsApp Link Generator

## Overview

WTSSHORT is a full-stack web application that provides a WhatsApp link generator service with analytics tracking. Users can create custom WhatsApp links with pre-filled messages, track click analytics, and manage blog content. The application features a modern React frontend with TypeScript, an Express.js backend, and PostgreSQL database integration through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Routing**: Wouter for client-side routing (lightweight React router alternative)
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod schema validation
- **Internationalization**: Custom i18n implementation supporting English and Arabic with RTL support

### Backend Architecture
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas for request/response validation
- **Storage Pattern**: Repository pattern with interface-based storage abstraction
- **Development**: In-memory storage fallback for development, production uses PostgreSQL

### Database Design
- **Primary Tables**:
  - `whatsapp_links`: Stores generated WhatsApp links with click tracking
  - `blog_posts`: Content management for blog articles with status and view tracking
- **Key Features**: UUID primary keys, automatic timestamps, click/view counters
- **Schema Validation**: Drizzle-Zod integration for type-safe database operations

### Authentication & Authorization
- Currently implements a simple session-based approach
- No complex authentication system - designed for public link generation with optional tracking

### Development Workflow
- **Hot Reload**: Vite development server with HMR
- **Type Safety**: Full TypeScript coverage across client, server, and shared code
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Code Organization**: Monorepo structure with shared types and schemas

### Performance Considerations
- **Caching**: TanStack Query provides automatic request caching and background updates
- **Code Splitting**: Vite handles automatic code splitting for optimal bundle sizes
- **Static Assets**: Vite optimizes and serves static assets efficiently

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database service
- **Connection Pooling**: @neondatabase/serverless for efficient database connections

### UI/UX Libraries
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography
- **TailwindCSS**: Utility-first CSS framework for styling

### Development Tools
- **TypeScript**: Static type checking across the entire stack
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing for Tailwind and autoprefixer

### Runtime Dependencies
- **Express.js**: Web server framework
- **React 18**: Frontend framework with modern features
- **TanStack Query**: Data fetching and state management
- **React Hook Form**: Form handling with validation
- **Wouter**: Lightweight client-side routing

### Database & ORM
- **Drizzle ORM**: Type-safe database operations
- **Drizzle Kit**: Database migration and schema management tools
- **pg**: PostgreSQL client for Node.js

### Validation & Utilities
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting
- **clsx**: Utility for constructing className strings conditionally