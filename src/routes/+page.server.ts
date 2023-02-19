import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { handleActionErrors } from '$lib/utils';

export const load: PageServerLoad = async (event) => {
	return {
		articles: router.createCaller(await createContext(event)).article.getAll(),
		greeting: router.createCaller(await createContext(event)).example.greeting()
	};
};

export const actions: Actions = {
	deleteArticle: async (event) => {
		const id = event.url.searchParams.get('id');
		if (!id) return fail(400, { message: 'Invalid request' });

		try {
			await router.createCaller(await createContext(event)).article.deleteById({ id });
		} catch (e) {
			return handleActionErrors(e);
		}
	},

	createArticle: async (event) => {
		const body = Object.fromEntries(await event.request.formData());

		try {
			await router.createCaller(await createContext(event)).article.createArticle(body);
		} catch (e) {
			return handleActionErrors(e, body);
		}
	}
};
