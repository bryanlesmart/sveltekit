import { handleActionErrors } from '$lib/utils';
import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';
import { ZodError } from 'zod';
import { validateData } from '$lib/schema/helpers';
import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { ArticleSchema } from '$lib/schema/generate';

export const load: PageServerLoad = async (event) => {
	/**
	 * Its working however typescript complaining
	 * Argument of type '{ articleId: string; }' is not assignable to parameter of type '{ id: string; }'.
  Object literal may only specify known properties, and 'articleId' does not exist in type '{ id: string; }'.
	 */

	const articleId = event.params.aid;
	return {
		article: router.createCaller(await createContext(event)).article.getArticle({ articleId })
	};
};

export const actions: Actions = {
	updateArticle: async ({ request, params }) => {
		const { formData, errors } = await validateData(await request.formData(), ArticleSchema);

		if (errors) {
			console.log(errors);
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
		try {
			await prisma.article.update({
				where: {
					id: params.aid
				},
				data: {
					...formData
				}
			});
		} catch (e) {
			return handleActionErrors(e, body)
		}

		throw redirect(303, '/');
	}
};
