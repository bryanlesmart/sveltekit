import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import DiscordProvider from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';
import {
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/t';

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
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET
		}),
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id; // add id in User types.d.ts just ctr + click the user
				// eslint-disable-next-line no-self-assign
				session.user.name = session.user.name;
			}

			return session;
		}
	}
};

// export const authOptions = SvelteKitAuth({

// });

export const handle = sequence(
	customHandle,
	createTRPCHandle({ router, createContext }),
	SvelteKitAuth(authOptions)
);
