# Week 09 - Express Middleware

**Author:** Peter C. Matthews

This repository contains my coursework submission for Week 09 of the [Master Coding](https://wearecodenation.com/2022/04/25/master-coding/) course at *CodeNation*.

## Brief

**Overview:**

Create a full REST API with a database layer, user authentication, JWT authorisation, and salted hashing of passwords.

### Requirements:

 - [x] A User model with:
    - [x] relevant CRUD routes and controllers.
    - [x] relevant API routes and controllers.
 - [x] All routes must be tested in Thunder Client.

**User CRUD/API Routes:**
| Task | Method | Route | Middleware | Controller Function |
| ---- | ------ | ----- | ---------- | ------------------- |
| Create a new user within the database. | POST | /users/register | hashPass | registerUser |
| Authenticate a user, with the provided credentials. | POST | /users/login | comparePass | loginUser |
| Update a user within the database. All fields are required for update.| PUT | /users/:id | - | updateUser |
| Update a user within the database. Partial updates are allowed. | PATCH | /users/:id | - | patchUser |
| Change an authenticated user's password. | PATCH | /users/change-password | tokenCheck, comparePass | changePassword |
| Delete a user from the database. | DELETE | /users/:id | - | deleteUser |
| Truncate the Users table within the database. USE WITH CAUTION! | DELETE | /users | - | deleteAllUsers |
| Get all users within the database. | GET | /users | - | getAllUsers |
| Get a single user from the database, by the user's id. | GET | /users/:id | - | getUserById |
| Authorise a user, with the provided token. | GET | /users/authcheck | tokenCheck | authoriseUser |

### Stretch Goals:
 - [x] Create a second model for data storage, must be in some way linked to the user database entries.
    - [x] POST a new task for the authenticated user.
    - [x] UPDATE (PUT) a specific task for the authenticated user.
    - [x] UPDATE (PATCH) a specific task for the authenticated user.
    - [x] DELETE a specific task for the authenticated user.
    - [x] DELETE all tasks for the authenticated user.
    - [x] GET all tasks for the authenticated user.
    - [x] GET a specific task for the authenticated user.

### Personal Stretch Goals:
 - [x] Implement a route for authenticated, and authorised users to change their passwords.
 - [x] Implement persistent login, where authorised users are automatically authenticated.
 - [x] Add email validation for registering users
 - [x] Add password validation for registering users
 - [x] Add validation for input fields to ensure they are of the correct type and length before they are processed.

## Implementation

For the user model, I have included the full compliment of CRUD routes, as per the requirements within the project brief; as well as the API routes within the design specifications.

I have also added validation for the various fields in each model, to ensure data integrity for persisted data; email validation, and a minimum password strength for registering users; and a PATCH route that allows users to change their password, passing their old password, and their choice of new password within the request body.

### Fail First, Fail Fast (FFFF)

Within the design of this project, I have employed the FFFF pattern. This is a design pattern in which guard clauses, and bad path returns take precedence over good path returns. This way, the code flow stops, and exits the current function as early as possible, once an error has been detected. This helps in a number of ways. From a performance point-of-view, we haven't wasted cycles trying to use invalid, or non-existent data. But more than this, it allows us to start the graceful degredation process as soon as the error occurs. We can give more accurate feedback to the the user, and get more accurate stack traces, for debug purposes. If we defer a bad path return until the end of a method, then it will fail on the last line of the method, rather than where the failure actually occured.

### Authentication and Authorisation

Authentication is the process of verifying the identity of a user, device or system. It answers the question, "*Who are you?*". In contrast, authorisation is the process of granting or denying access to a specific resource or action based on the identity and privileges of the requester. It answers the question, "*Are you allowed to do that?*". Authentication ensures that users are who they claim to be, while authorisation determines what actions they are permitted to perform based on their roles, permissions or other criteria. 

### Strech Goal: Tasks List

For the stretch goal of this project, I've chosen to implement a Task List. The model for the Tasks includes a title, description, complete flag, and a priority wieghting. The router for the Tasks API contains the full compliment of CRUD methods, and is locked behind an authorisation middleware method. This means that only authenticated, authorised users will be able to use the routes. 

## Retrospective

TODO:  
