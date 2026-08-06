#!/bin/sh
set -e

echo "Applying database migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx prisma db seed

echo "Migrations and seed completed successfully."
echo "Starting application..."

exec "$@"