<script lang="ts">
    import {page} from '$app/stores'
	import { signIn } from '@auth/sveltekit/client';
	import Navbar from './Navbar.svelte';
    
</script>

<h1><a href="/"> SvelteKit & Prisma & TRPC & Zod & AUTH JS🔥</a></h1>
	<hgroup>
		<div class="grid">
			{#if $page.data.session?.user}
				<Navbar />
			{:else}
				<div>
					<button on:click={() => signIn('google')}>Sign In with Google</button>
					<button on:click={() => signIn('discord')}>Sign In with GitHub</button>
				</div>
			{/if}
		</div>
	</hgroup>