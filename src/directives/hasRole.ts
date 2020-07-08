import { AuthenticationError } from "apollo-server";

export default {
  hasRole(next: any, src: any, args: any, context: any) {
    console.log("Checking if user has role...");
    const user = context.user;
    const expectedRole: string = args.role;

    if (!user) throw new AuthenticationError("You are not logged id!");
    const roles: string[] = user.roles.split(",");

    if (!roles.includes(expectedRole)) throw new AuthenticationError("You are not authorized!");
    return next();
  },
};
