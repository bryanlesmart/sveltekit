import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	// # should i use AUTH JS OR NOT JUST TRPC , PRISMA AND ZOD BUT Im using the database by auth prisma adapter?? ,?
};
