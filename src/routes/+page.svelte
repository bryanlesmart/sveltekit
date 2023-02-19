<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ articles } = data);

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

<button on:click={g} aria-busy={loading}>{gr} Click me</button>
<div class="grid">
	<div>
		{#if articles.length === 0}
			<h1>Create Articles</h1>
			<p>Create your own articles join us</p>
		{/if}
		<hr />

		<h1>Articles Feed</h1>
		{#each articles as { title, content, id, user, userId }}
			<h2>{title}</h2>
			<article>
				<header>{title} @{user.name}</header>
				<p>
					{content}
				</p>
			</article>
		{/each}
	</div>
</div>
