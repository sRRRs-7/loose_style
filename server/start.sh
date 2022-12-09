#!/bin/sh

set -e

echo "run db migration"
source /app/app.env
sql-migrate up -config=sql_migrate.yml

echo "start the app"
exec "$@"
