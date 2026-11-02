import { Router } from "express";
<<<<<<< HEAD
import user_route from "./user-router/user-router.js";
=======
import {userRouter} from "./user-router/user-router.js";

>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
import { productRouter } from "./product-routes/product.route.js";
import { faqRouter } from "./faq/faqRoutes.js";

const main = Router();
const moduleRoutes = [
  {
<<<<<<< HEAD
    path: "/api/v1",
    route: user_route,
=======
    path: "/api/v1/user",
    route: userRouter,
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
  },
  {
    path: "/api/v1/product",
    route: productRouter,
<<<<<<< HEAD
=======

>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
  },
  {
    path: "/api/v1/product",
    route: faqRouter,
  },
<<<<<<< HEAD
=======

>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
];
moduleRoutes.forEach((route) => main.use(route.path, route.route));
export default main;
