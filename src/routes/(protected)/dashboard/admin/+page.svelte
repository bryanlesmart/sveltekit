<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);
</script>

{#if data.session}
	<h1>This is admin page {data.session?.user?.name}</h1>
{:else}
	<h1>Access Denied | Admin</h1>
	<p>
		<a href="/"> You must be signed in to view this page </a>
	</p>
{/if}
