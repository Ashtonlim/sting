# MERN Client Server App

1. MySQL
2. Express
3. React
4. Node.js

# 1. Assignment 1

# Login system

The TMS application uses a stateless authentication implementation. JWTs and refresh tokens are used to handle auth.

Advantages:

1. Easier to scale by distributing client requests over multiple instances.
2. Lower server overhead as no data stored server side (stateless).
3. Good to integrate w 3rd party apps.

Disadvantages:

1. Lesser control over user session (cannot terminate session anytime).
2. More complex to implement.
