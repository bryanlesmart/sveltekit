import type { PageServerLoad, Actions } from './$types';
import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';
import { fail, redirect } from '@sveltejs/kit';
import { handleActionErrors } from '$lib/utils';

export const load = (async (event) => {
	await event.parent();
	return {
		articles: router.createCaller(await createContext(event)).article.getAll()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	deleteArticle: async (event) => {
		const id = event.url.searchParams.get('id');
		if (!id) return fail(400, { message: 'Invalid request' });

		try {
			await router.createCaller(await createContext(event)).article.deleteById({ id });
		} catch (e) {
			return handleActionErrors(e);
		}
		throw redirect(303, '/dashboard/article');
	},

	createArticle: async (event) => {
		const body = Object.fromEntries(await event.request.formData());

		try {
			await router.createCaller(await createContext(event)).article.createArticle(body);
		} catch (e) {
			return handleActionErrors(e, body);
		}
		throw redirect(303, '/dashboard/article');
	}
};
