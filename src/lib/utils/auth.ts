import type { SvelteKitAuthConfig } from '@auth/sveltekit';
import DiscordProvider from '@auth/core/providers/discord';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '$lib/server/prisma';
import { env } from './env.mjs';

export const authOptions: SvelteKitAuthConfig = {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	adapter: PrismaAdapter(prisma),
	providers: [
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		DiscordProvider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET
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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore use
	],

	callbacks: {
		session({ session, user }) {
			if (session.user) {
				//check the types folder [sveltekit-auth.d.t] to overwrite the DefaultSession type
				session.user.id = user.id;
				// eslint-disable-next-line no-self-assign
				session.user.name = session.user.name;
			}

			return session;
		}
	}
};
