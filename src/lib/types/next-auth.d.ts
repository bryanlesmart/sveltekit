import {  type DefaultSession } from 'next-auth';

/**
 *   Right now can't overwrite the types for User to add id, username etc,
 *   and also i don't how??
 */
declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession['user'];
	}
}
