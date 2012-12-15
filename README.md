secret_santa_app
================

API

/createAccount
- POST
- Params:
    Name - String
    Password - String
    Email - String

/deleteAccount
- POST
- Params:
    Name - String
    Password - String

/addPerson
- POST
- Params:
    accountName - String
    personName - String
    email - String

/deletePerson
- POST
- Params:
    accountName - String
    password - String
    personName - String
    email - String

/showAccounts
- GET

/match
- POST
- Params:
    accountName - String
    password - String
