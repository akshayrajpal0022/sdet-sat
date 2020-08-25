# SDET SAT

### Product Catalogue
This is an online products catalogue which maintains a list of products and categories. 

#### Features
  - User sign in
  - CRUD operations to categories
  - CRUD operations to products
  
*Note: Authentication required for create and update operations.*

#### Requirement
  - node.js v12.16.3
  - mongoose
  - gulp

### Folder Structure
  - app : source code written in coffeescript
    - config : all configurations
    - controllers : all controllers
    - core : core modules of architecture
    - lib : custom libraries
    - middlewares : custom middlewares
    - models : all models
    - routes : all defined routes
    - www : main project exec
  - doc : api doc

### Instalation
  - clone git repository
  - npm install
  
### Usage

- development
  -- gulp (please check gulpfile.js for tasks)
- production 
  -- npm start OR pm2
  
### API Tests
  - to run api test cases run below command in main directory  
    - npm test
  
### API Documentation

*Api documentation can be found at localhost:3000/doc*