import type { PrismaClient } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {
		// }
		// interface PageData {}
		// interface Platform {}
	}
	// eslint-disable-next-line no-var
	var __prisma: PrismaClient;
}

export {};

/**
 * import { type DefaultUser, type DefaultSession } from 'next-auth';
 *
 * Right now can't overwrite the types for User to add id, username etc,
 * and also i don't how?? 
 * 
 * reference of this is T3.stack { next js , prisma, trpc, tailwindcss, and zod}
 * https://authjs.dev/reference/sveltekit and create-t3-app
 * declare module 'next-auth' {
		
		 // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
		 
		interface Session {
			user?: {
				id: string;
				username: string;
			} & DefaultSession['user'];
		}

		interface User extends DefaultUser {
			username: string;
		}
	}
 */
