import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	await event.parent();
	return {};
}) satisfies PageServerLoad;
