# API Design With Node.js

This is an API built with Node.js, Prisma and PostgreSQL for an application, where users can create products, create updates for products and create multiple update points for their updates. Of course, products, updates and update points can all be edited and deleted. A user can only create, update or delete updates and update points if the associated product is created by them.

The code in this project is based on the [API Design in Node.js](https://frontendmasters.com/courses/api-design-nodejs-v4/) course by Scott Moss from [Frontend Masters](https://frontendmasters.com/).

## Set up locally

1. Clone the git repository.
2. Run `npm i`
3. Create a `.env` file.

```env
DATABASE_URL=""
JWT_SECRET=""
```

4. Run `npx prisma migrate dev --name init`

## How to use

`npm run dev`: start the application in a development environment.
`npm test`: run all test suites.
`npm run build`: build the project with `tsc`, excluding the test files.
`npm start`: start the application in a production environment.

The API can be tested using any API dev suites (Postman, Hopscotch, Thunder Client, etc.).

- Create a user.

`POST http://localhost:3000/user`

```json
{
    "username": testuser,
    "password": somepassword
}
```

- For all routes starting with /api, a valid JWT bearer token must be used. The /user and /signin routes return valid tokens.
