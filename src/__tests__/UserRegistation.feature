Feature: User Registration

    Scenario: Successful registration with valid credentials
        Given a user with the following credentials:
            | username | email                  | password    |
            | testuser | testuser@example.com   | Pa$$w0rd123 |
        When the user registers with these credentials
        Then the registration succeeed with an "success" message
        And a status code of 201

    Scenario: Failed registration due to invalid email
        Given a user with the following credentials:
            | username | email                   | password    |
            | testuser | testuser(at)example.com | Pa$$w0rd123 |
        When the user tries to register with these credentials
        Then the registration fails with an "Invalid email address." error
        And a status code of 422

    Scenario: Failed registration due to weak password
        Given a user with the following credentials:
            | username | email                 | password |
            | testuser | testuser@example.com  | Pa$$w0rd |
        When the user tries to register with these credentials
        Then the registration fails with a "Password does not meet strength requirements." error
        And a status code of 422

    Scenario: Failed registration due to duplicate username
        Given an existing user with the username "testuser"
        And a user with the following credentials:
            | username | email                 | password    |
            | testuser | testuser2@example.com | Pa$$w0rd123 |
        When the user tries to register with these credentials
        Then the registration fails with a "Username already exists." error
        And a status code of 500

    Scenario: Failed registration due to duplicate email
        Given an existing user with the email "testuser@example.com"
        And a user with the following credentials:
            | username  | email                | password    |
            | testuser2 | testuser@example.com | Pa$$w0rd123 |
        When the user tries to register with these credentials
        Then the registration fails with an "Email already exists." error
        And a status code of 500
