<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.session}
	<h1>Protected page</h1>
	<p>This is a protected content. You can access this content because you are signed in.</p>
	<p>Session expiry: {data.session?.expires}</p>
{:else}
	<h1>Access Denied | Dashboard</h1>
	<p>
		<a href="/"> You must be signed in to view this page </a>
	</p>
{/if}
