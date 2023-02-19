import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import DiscordProvider from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';

import { sequence } from '@sveltejs/kit/hooks';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/t';
import { env } from '$lib/utils/env..mjs';

const customHandle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

const authOptions: SvelteKitAuthConfig = {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	adapter: PrismaAdapter(prisma),
	providers: [
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		DiscordProvider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		}),
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore use
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			//to get the account selection screen each time, add the authorization
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		})
	],
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
				// eslint-disable-next-line no-self-assign
				session.user.name = session.user.name;
			}

			return session;
		}
	}
};

export const handle = sequence(
	customHandle,
	createTRPCHandle({ router, createContext }),
	SvelteKitAuth(authOptions)
);
