PROJECT DESCRIPTION:
This a web application made in Node.js and Express as a school project.
The app allows users to create accounts and order femboy images.

FEATURES:
- registering on the app
- logging into the app (only validates the login data, the app doesn't actually have authorization and permission system)
- posting femboy images orders
- viewing the list of existing femboy images orders
- using filters and sorting on the femboy images orders list page
- viewing details of a selected femboy images order
- editing any femboy images order

INSTALLATION:
1. Clone the repository or download and extract it.
2. Make sure you have Node.js installed on your computer (https://nodejs.org/en)
3. Open your computer's Command Line and go to the project directory (the folder where this README file is)
4. Run "npm install"
5. Set up the database by following the instructions in "docker.txt" file
6. Run "npm start"
7. Open your web browser and go to http://localhost:3000

TECHNOLOGIES:
- Javascript
- Node.js
- Express.js
- MySQL
- EJS
- bcrypt

AUTHOR: Igor Maciejewski


-----------------------------


ENDPOINTS:

1. Orders
  
  - GET /  
    returns the home page
  
  - GET /new  
    returns a form page allowing to add a new order
  
  - GET /orders
    - returns a page with a list of all orders
    - Allows the following filters/sorting params in GET URL query:  
    fileType: string (max 3 characters), imagesNumber: number (integer), sortingField: string, sortingOrder: string
    - allowed query params values:
      - sortingField: "fileType", "imagesNumber"
      - sortingOrder: "asc", "desc"
    
  
  - GET /orders/:orderId  
    returns the details page of an order
  
  - GET /orders/:orderId/edit  
    returns a form page allowing to edit an existing order
  
  - POST /orders
    - posts a new order
    - Expected JSON payload:  
    description: string, fileType: string (max 3 characters), imagesNumber: number (integer)
  
  - POST /orders/:orderId
    - edits an existing order
    - Expected JSON payload:  
    description: string, fileType: string (max 3 characters), imagesNumber: number (integer)

2. Users
  
  - GET /register  
    returns the registration page
  
  - GET /login  
    returns the login page
  
  - POST /register
    - adds a new account
    - Expected JSON payload:  
      login: string, password: string, passwordRepeat: string
  
  - POST /login
    - a prototype of loging into an account. Checks the login and password correctness, but doesn't actually return cookies
    - Exprected JSON payload:
      login: string, password: string


