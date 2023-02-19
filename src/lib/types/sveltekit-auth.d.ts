import { type DefaultSession } from '@auth/sveltekit/node_modules/@auth/core/types';

// TODO: update when they fix this:
// https://github.com/nextauthjs/next-auth/issues/6640#issuecomment-1426801813
declare module '@auth/sveltekit/node_modules/@auth/core/types' {
	interface Session {
		user?: {
			id: string;
		} & DefaultSession['user'];
	}
}
