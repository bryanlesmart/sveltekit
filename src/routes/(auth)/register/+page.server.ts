import { createContext } from '$lib/trpc/t';
import { router } from './../../../lib/trpc/router';
import { handleActionErrors } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.getSession();
	if (session?.user) throw redirect(303, '/');
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	register: async (event) => {
		const body = Object.fromEntries(await event.request.formData());

		try {
			const user = await router.createCaller(await createContext(event)).user.registerUser(body);
			console.log('USER', user);
		} catch (e) {
			console.log('ERROR', e);
			return handleActionErrors(e, body);
		}
		throw redirect(302, '/login');
	}
};
