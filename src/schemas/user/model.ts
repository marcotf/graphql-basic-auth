import crypto from "crypto";

export default class User {
  name: string;
  email: string;

  roles: string = "user";
  salt: string = "";
  pass: string = "";

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  // Add a role to the list with an unique type constraint
  addRole(role: string) {
    let roles: Set<string> = new Set(this.roles.split(","));
    roles.add(role);
    this.roles = [...roles].join(",");
  }

  // Return only needed variables to create JWT token
  getTokenPayload() {
    return {
      name: this.name,
      email: this.email,
      roles: this.roles,
    };
  }

  // Set password in a secure way
  setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.pass = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  }

  // Verify if given password match stored password
  validatePassword(password: string): Boolean {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.pass === hash;
  }
}
