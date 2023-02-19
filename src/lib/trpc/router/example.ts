import { createTRPCRouter, publicProcedure } from '../t';

export const exampleRouter = createTRPCRouter({
	greeting: publicProcedure.query(() => {
		return 'hello from TRPC';
	})
});
