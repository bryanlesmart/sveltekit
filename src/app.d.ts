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
 * Right now can't overwrite the types for User to add 1d, username etc,
 * and also i don't how?? 
 * 
 * 
 * 
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
