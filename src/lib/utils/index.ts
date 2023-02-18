import { fail } from '@sveltejs/kit';
import { TRPCError } from '@trpc/server';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { ZodError } from 'zod';

export function handleActionErrors(e: unknown, formData: unknown = {}) {
	if (e instanceof TRPCError) {
		if (e.cause instanceof ZodError) {
			return fail(400, {
				data: structuredClone(formData),
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

/** 
 * Prisma zod-form-data , create your schema the use zod-form-data https://www.npmjs.com/package/zod-form-data?activeTab=readme
 * Validation helpers for zod specifically for parsing FormData or URLSearchParams.
 * const body = articleSchema.parse(await event.request.formData());
    await prisma.article.create({
			// 	data: {
			// 		...body
			// 	}
			// });
	*/
