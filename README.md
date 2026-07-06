# Bright Future Education Foundation Kenya - Backend API

A NestJS-based backend API for managing the Bright Future Education Foundation Kenya platform.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <your-repository-url>
cd bfef-sprint1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your actual database credentials:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_secure_password
DATABASE_NAME=your_database_name
DATABASE_SSL=false

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Set up your PostgreSQL database and run the schema and seed files:
```bash
# Run the schema file in your PostgreSQL database
psql -U your_username -d your_database -f 01_sprint1_schema.sql

# Run the seed file (optional)
psql -U your_username -d your_database -f 02_sprint1_seed.sql
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000` (or the port specified in your `.env` file).

## Project Structure

```
src/
├── common/           # Shared utilities, filters, interceptors
├── config/           # Configuration files
├── modules/          # Feature modules
│   ├── contact-messages/
│   ├── members/
│   └── pages/
└── main.ts          # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_HOST` | PostgreSQL host | `localhost` |
| `DATABASE_PORT` | PostgreSQL port | `5432` |
| `DATABASE_USERNAME` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | *required* |
| `DATABASE_NAME` | Database name | `brightFuture` |
| `DATABASE_SSL` | Enable SSL for database | `false` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## Security Notes

- **Never commit your `.env` file** - it contains sensitive credentials
- The `.env.example` file shows the required environment variables without sensitive values
- Database credentials are loaded from environment variables, not hardcoded in the source code