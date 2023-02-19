import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return {
		articles: router.createCaller(await createContext(event)).article.getAll(),
		greeting: router.createCaller(await createContext(event)).example.greeting()
	};
};
