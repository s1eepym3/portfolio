# Database Migration & Seeding Guide

This project uses Prisma with PostgreSQL for the database layer.

## How to Seed the Database
The initial static data migration from `src/data/*.js` has been converted into a seed script located at `prisma/seed.js`.

To run the seed manually:
```bash
node prisma/seed.js
```

### Idempotency
The seed script uses `upsert` for all models based on their unique fields. **Running the script multiple times is completely safe**. It will not create duplicate rows; it will only update existing records or insert new ones if they are missing.

## How to Reset the Database
If you need to completely wipe the database (e.g., to clear out test data or reset the schema entirely from scratch), use the following command:

```bash
npx prisma migrate reset
```

> [!WARNING]
> **Data Loss Warning**: This command will completely drop the database, recreate it, and apply all migrations. **All existing data in the database will be permanently deleted.** Use this only in development or if you are absolutely sure you want a clean slate.
