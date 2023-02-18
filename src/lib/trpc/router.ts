import { articleRouter } from './router/article';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { exampleRouter } from './router/example';
import { createTRPCRouter } from './t';

export const router = createTRPCRouter({
	example: exampleRouter,
	article: articleRouter
});

export type AppRouter = typeof router;

export type AppRouterInputs = inferRouterInputs<AppRouter>;
export type AppRouterOutputs = inferRouterOutputs<AppRouter>;
