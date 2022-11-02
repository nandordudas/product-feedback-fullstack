CREATE USER adonis with encrypted password 'adonis';
CREATE DATABASE product_feedback;
CREATE DATABASE test;
GRANT ALL PRIVILEGES ON DATABASE product_feedback TO adonis;
GRANT ALL PRIVILEGES ON DATABASE test TO adonis;
