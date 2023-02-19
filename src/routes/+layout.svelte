<script lang="ts">
	import '@picocss/pico';
	import Footer from '$lib/components/Footer.svelte';
	import Signin from '$lib/components/Signin.svelte';
</script>

<svelte:head>
	<title>Sveltekit</title>
</svelte:head>

<div class="container">
	<Signin />
	<main>
		<slot />
	</main>
	<Footer />
</div>
