import User from "./model";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

// Custom database
const USERS: User[] = [];
// Secret for JWT signing
const SECRET: string = process.env.SECRET || "";

// Data mockup
const alice = new User("Alice", "alice@test.com");
alice.setPassword("Al1c3");
alice.addRole("admin");
USERS.push(alice);

// User Resolver
export default {
  // Base Queries
  Query: {
    // Find the user based on logged in user email
    me: (_: any, __: any, context: any) => USERS.find((user) => user.email == context.user.email),

    // Return all users
    users: () => USERS,
  },

  // Base Mutations
  Mutation: {
    // Create a new user
    signup: (_: any, args: any) => {
      let user = new User(args.name, args.email);
      user.setPassword(args.password);

      // Add user to the database
      USERS.push(user);
      return true;
    },

    // Verify if credentials are ok and create a JWT token
    signin: (_: any, args: any) => {
      // Find user in the database
      let user = USERS.find((user) => user.email == args.email);
      if (!user || !user.validatePassword(args.password))
        throw new UserInputError("Unknown credentials");

      let token = jwt.sign(user.getTokenPayload(), SECRET, { expiresIn: "1h" });

      return { user, token };
    },
  },

  // Custom field Queries
  User: {
    // Return roles in an array format for easy readability
    roles: (user: User) => user.roles.split(","),
  },
};
