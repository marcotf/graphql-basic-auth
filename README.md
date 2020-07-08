# graphql-basic-auth

A GraphQL API with JWT auth example. Using `apollo-graphql` and `graphql-tools` for directives management.

## Installation

```bash
$ npm run install
$ # For production
$ npm run build && npm start
$ # For development
$ npm run dev
```

## Usage

After launching the server, go to `http://localhost:3000` to get the GraphQL Playground.

You can login with the already created account `alice@test.com:Al1c3` or can create your own account by signing up !

Know that only Alice has role `admin` in order to use the `users` query.

## Todo

- [x] Signing up / Signing in
- [ ] Unit testing
- [ ] Setting role to user when admin
