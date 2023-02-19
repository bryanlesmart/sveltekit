import { handleActionErrors } from '$lib/utils';
import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const articleId = event.params.aid;
	return {
		article: router.createCaller(await createContext(event)).article.getArticle({ id: articleId })
	};
};

export const actions: Actions = {
	updateArticle: async (event) => {
		const body = Object.fromEntries(await event.request.formData());
		try {
			await router
				.createCaller(await createContext(event))
				.article.updateArticle({ id: event.params.aid, data: body });
		} catch (e) {
			return handleActionErrors(e, body);
		}

		throw redirect(303, '/dashboard/article');
	}
};
