import { ZodError } from 'zod';
import { validateData } from '$lib/schema/helpers';
import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { ArticleSchema } from '$lib/schema/generate';

export const load: PageServerLoad = async ({ params }) => {
	const getArticle = async () => {
		const article = await prisma.article.findUnique({
			where: {
				id: params.aid
			}
		});
		if (!article) {
			throw error(404, 'Article not found');
		}
		return article;
	};

	return {
		article: getArticle()
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
		} catch (err) {
			console.error(err);
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return { data: formData, errors };
			}
		}

		throw redirect(303, '/');
	}
};
