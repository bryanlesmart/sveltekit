<script lang="ts">
	import '@picocss/pico';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	import { trpc } from '$lib/trpc/client';
	let gr = '';
	let loading = false;
	/**
	 * let ar = trpc().article.getAll.query();
	 * Its not error or stop the server but
	 * Avoid calling `fetch` eagerly during server side rendering — put your `fetch` calls inside `onMount` or a `load` function instead
	 */
	const g = async () => {
		loading = true;
		gr = await trpc().example.greeting.query();
		console.log('greet:', gr);
		loading = false;
	};
</script>

<svelte:head>
	<title>Sveltekit</title>
</svelte:head>

<div class="container">
	<Navbar />
	<main class="container">
		<slot />
	</main>
	<div class="grid">
		<div>
			TRPC
			<button on:click={g} aria-busy={loading}>{gr} Click me</button>
		</div>
	</div>
	<Footer />
</div>
