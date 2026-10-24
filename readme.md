# E-Commerce Project

This project is a full-stack e-commerce application built to demonstrate how a modern storefront can be connected to a Spring Boot backend.

i created a simple online shopping experience where users can browse products, search by keyword, view product categories, add items to a cart, and manage products from the front-end interface.

## Project Overview

The project consists of two main parts:

- `Ecom-Frontend/` — React + Vite front-end for the storefront UI
- `springRepo/` — Spring Boot + JPA backend that exposes product APIs and stores data

## What I Built

### Front-end Features
- Responsive navigation bar with home, category links, product search, cart access, and theme toggle
- Product listing page with cards and pricing
- Search by name, brand, category, or description
- Category-based browsing
- Product details page
- Add product form with product information and image upload support
- Edit and delete product actions
- Shopping cart with quantity tracking
- Persistent cart and theme settings using browser storage

### Back-end Features
- Spring Boot REST API for product management
- Product entity with fields such as name, brand, category, price, quantity, description, and image data
- JPA repository layer for database operations
- Search API to find products by keyword
- CRUD-style endpoints for listing, fetching, updating, and deleting products
- H2 database for local development and testing

## Tech Stack

### Front-end
- React
- Vite
- Bootstrap
- React Router
- Axios

### Back-end
- Java
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- H2 Database
- Lombok

## Project Structure

```text
spring-react/
├── Ecom-Frontend/          # React storefront
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── springRepo/             # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── mvnw
│
└── readme.md               # Project overview
```

## How to Run

### 1) Start the backend
Open the `springRepo` folder and run:

```bash
./mvnw spring-boot:run
```

The backend is configured to run with the API base URL:

```text
http://localhost:8085/api
```

### 2) Start the front-end
Open the `Ecom-Frontend` folder and run:

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Summary

This project demonstrates a working full-stack e-commerce app built from scratch, combining a modern React front-end with a Java Spring Boot backend. It showcases how a storefront can manage product data, provide search and category filtering, handle shopping cart functionality, and connect to a database-backed API for a realistic application flow.
