import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

const SECRET: string = process.env.SECRET || "";

export default {
  isAuthenticated(next: any, src: any, args: any, context: any) {
    console.log("Checking if user is authenticated...");
    const token = context.headers.authorization;

    if (!token) throw new AuthenticationError("You must supply a JWT for authorization!");

    context.user = jwt.verify(token.replace("Bearer ", ""), SECRET);
    if (!context.user) throw new AuthenticationError("You are not logged in.");
    return next();
  },
};
