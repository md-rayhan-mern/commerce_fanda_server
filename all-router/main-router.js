import { Router } from "express";
import user_route from "./user-router/user-router.js";
import {productRouter} from "./product-routes/product.route.js"

const main = Router();
const moduleRoutes = [
  {
    path: "/api/v1",
    route: user_route,
  },
  {
    path: "/api/v1/product",
    route: productRouter,
  }
];
moduleRoutes.forEach((route) => main.use(route.path, route.route));
export default main;
