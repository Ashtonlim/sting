# MERN Client Server App

1. MySQL
2. Express
3. React
4. Node.js

# 1. Assignment 1

# Login system

The TMS application uses a stateless authentication implementation.

Advantages:

1. Easier to scale by distributing client requests over multiple instances.
2. Lower server overhead as no data stored server side (stateless).
3. Good to integrate w 3rd party apps.

Disadvantages:

1. Lesser control over user session (cannot terminate session anytime).
2. More complex to implement.

### Notes

ooad | microservices arch desgin
peering - point to point peering

1. iam
   req and proj pitfalls
   data modelling
   reusability components

2. workflow sys
   req and proj pitfalls
   data modelling
   ux and testing

3. restful api
   security
   method signature

4. containerization
   build and run app container img docker engine / kubernetes

<!-- Review again if non trivial to implement. -->

<!-- JWTs and refresh tokens are used to handle auth.

2 important facts of JWTs and the consequence that results in a trickier implementation:

1. They shouldn’t get stolen and (bad actor can imitate authed user)
   a. Need to protect against XSS (cross site scripting - JS injection) and CSRF (cross site request forgery - cookies sent to malicious actor) attacks.
2. They need to have short expiry times (required more resources to hack in time).
   a. Would mean each session lasts as long as JWT expiry. (However there is a workaround)

### Resources

1. https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#security-considerations
2. https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.md
3. https://blog.logrocket.com/jwt-authentication-best-practices/

The JWT implmentation is based on the resources above. -->
