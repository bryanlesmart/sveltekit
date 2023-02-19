import { articleRouter } from './router/article';

import { exampleRouter } from './router/example';
import { createTRPCRouter } from './t';

export const router = createTRPCRouter({
	example: exampleRouter,
	article: articleRouter
});

export type AppRouter = typeof router;
