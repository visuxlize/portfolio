import { router } from "../trpc";
import { todosRouter } from "./todos";
import { usersRouter } from "./users";
import { stripeRouter } from "./stripe";

export const appRouter = router({
  todos: todosRouter,
  users: usersRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
