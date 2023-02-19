import { TRPCError } from '@trpc/server';
import { prisma } from '$lib/server/prisma';
import type { RequestEvent } from '@sveltejs/kit';
import { initTRPC, type inferAsyncReturnType } from '@trpc/server';

/**
 * The ?. operator is known as the optional chaining operator and is used to avoid throwing an error if the function does not exist or is undefined.
 */

export async function createContext(event: RequestEvent) {
	const session = await event.locals.getSession?.();
	return {
		prisma,
		session
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<typeof createContext>().create();

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const auth = t.middleware(async ({ next, ctx }) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			session: { ...ctx.session, user: ctx.session.user }
		}
	});
});

export const protectedProcedure = t.procedure.use(auth);
