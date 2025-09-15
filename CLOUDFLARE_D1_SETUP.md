# Cloudflare D1 Database Integration

This project is now configured for deployment to Cloudflare Pages with D1 database integration.

## Changes Made

### 1. Dependencies Added

- `@prisma/adapter-d1` - Prisma adapter for Cloudflare D1 database
- `@cloudflare/workers-types` - TypeScript types for Cloudflare Workers

### 2. Prisma Schema Updates

- Changed provider from PostgreSQL to SQLite (compatible with D1)
- Removed PostgreSQL-specific features (@db.Text, @db.Decimal, BigInt, Json, Float)
- Updated data types to be SQLite-compatible:
  - `Json` → `String` (for JSON fields)
  - `BigInt` → `Int` (for large numbers)
  - `Float` → `Real` (SQLite's floating point type)
  - `Decimal` → `Real` (for monetary values)
  - Removed `@db.Text` annotations

### 3. Next.js Configuration

- Removed `output: 'standalone'` from `next.config.ts` for Cloudflare Pages compatibility

### 4. Prisma Client Configuration

- Updated `src/lib/prisma.ts` to use D1 adapter in production
- Added production environment detection
- Dynamic import of D1 adapter to avoid issues in development

### 5. TypeScript Configuration

- Added `@cloudflare/workers-types` to types array in `tsconfig.json`

## Environment Variables

### Development (.env)

```
DATABASE_URL="file:./dev.db"
CLOUDINARY_URL=
GOOGLE_DRIVE_WORKER_URL=
```

### Production (Cloudflare)

The D1 database will be automatically available via the `cloudflareEnv.DB` binding in production.

## Deployment Steps

### 1. Create D1 Database

```bash
# Create the D1 database
npx wrangler d1 create banyuanyar-db

# Note the database ID from the output
```

### 2. Configure wrangler.toml

Create a `wrangler.toml` file in the project root:

```toml
name = "banyuanyar-web"
compatibility_date = "2024-01-15"

[[d1_databases]]
binding = "DB"
database_name = "banyuanyar-db"
database_id = "your-database-id-here"
```

### 3. Generate and Apply Migrations

```bash
# Generate migration files
npx prisma migrate dev --name init

# Apply migrations to D1
npx wrangler d1 migrations apply banyuanyar-db --local
npx wrangler d1 migrations apply banyuanyar-db --remote
```

### 4. Deploy to Cloudflare Pages

```bash
# Build the project
npm run build

# Deploy using Wrangler (or connect via Cloudflare dashboard)
npx wrangler pages deploy ./out
```

## Development vs Production

### Development

- Uses local SQLite database (`dev.db`)
- Standard Prisma client without D1 adapter

### Production (Cloudflare)

- Uses D1 database via Cloudflare Workers binding
- Prisma client with D1 adapter
- Automatic environment detection

## Key Benefits

1. **Serverless Ready**: No need for traditional database servers
2. **Global Distribution**: D1 replicates data globally for low latency
3. **Cost Effective**: Pay only for what you use
4. **Integrated**: Works seamlessly with Cloudflare Pages and Workers
5. **Migration Path**: Easy transition from existing PostgreSQL setup

## Notes

- All SQLite/D1 limitations have been addressed in the schema
- JSON fields are stored as strings and should be parsed manually
- Decimal fields use SQLite's REAL type (consider precision requirements)
- The adapter dynamically loads in production to avoid development issues
