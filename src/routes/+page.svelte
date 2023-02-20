<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ articles } = data);
</script>

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
