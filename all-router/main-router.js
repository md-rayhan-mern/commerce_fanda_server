import { Router } from "express";
import user_route from "./user-router/user-router.js";

const main = Router();
const moduleRoutes = [
  {
    path: "/v1",
    route: user_route,
  },
];
moduleRoutes.forEach((route) => main.use(route.path, route.route));
export default main;
