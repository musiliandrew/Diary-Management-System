#!/bin/bash
set -e  # Exit on any error

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --noinput || { echo "collectstatic failed"; exit 1; }

echo "Applying migrations..."
python manage.py migrate || { echo "migrate failed"; exit 1; }

echo "Creating superuser..."
python manage.py createsu || { echo "createsu failed, continuing..."; }