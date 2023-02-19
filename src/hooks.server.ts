import type { Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/t';
import { authOptions } from '$lib/utils/auth';
import { sequence } from '@sveltejs/kit/hooks';

const customHandle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export const handle = sequence(
	customHandle,
	createTRPCHandle({ router, createContext }),
	SvelteKitAuth(authOptions)
);
