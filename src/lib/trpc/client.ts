import type { AppRouter } from './router';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';

/**
 * import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
 * let browserClient: ReturnType<typeof createTRPCClient<AppRouter>>;
 * export function trpc(init?: TRPCClientInit) {
		const isBrowser = typeof window !== 'undefined';
		if (isBrowser && browserClient) return browserClient;
		const client = createTRPCClient<AppRouter>({ init });
		if (isBrowser) browserClient = client;
		return client;
	}
 * this previous client.ts from https://icflorescu.github.io/trpc-sveltekit/getting-started 
 */

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return '';
	return `http://localhost:5173`;
};

export function trpc() {
	const client = createTRPCProxyClient<AppRouter>({
		links: [
			loggerLink(),
			httpBatchLink({
				url: `${getBaseUrl()}/trpc`
			})
		]
	});
	return client;
}
/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
