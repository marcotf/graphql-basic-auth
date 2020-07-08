import * as _ from "lodash";

import isAuthenticated from "./isAuthenticated";
import hasRole from "./hasRole";

const directivesFiles = [isAuthenticated, hasRole];
let directives = {};

directivesFiles.forEach((directive) => _.merge(directives, directive));

console.log("✅ ", directivesFiles.length, "directives loaded");

export default directives;
