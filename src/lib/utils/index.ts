import { fail } from '@sveltejs/kit';
import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { ZodError } from 'zod';

export function handleActionErrors(e: unknown, body: unknown = {}) {
	if (e instanceof TRPCError) {
		if (e.cause instanceof ZodError) {
			return fail(400, {
				data: structuredClone(body),
				errors: e.cause.flatten()
			});
		}
		return fail(getHTTPStatusCodeFromError(e), {
			message: 'An unexpected error occurred. Please try again later.'
		});
	}
	return fail(500, {
		message: 'An unexpected error occurred. Please try again later.'
	});
}
