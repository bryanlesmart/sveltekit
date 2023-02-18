import { publicProcedure } from '../t';
import { createTRPCRouter } from '../t';

export const exampleRouter = createTRPCRouter({
	greeting: publicProcedure.query(() => {
		return 'hello from TRPC';
	})
});
