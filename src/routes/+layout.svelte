<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="container">
	<hgroup>
		<h1>
			<a href="/"> SvelteKit & Prisma 🔥</a>
		</h1>
		{#if $page.data.session?.user}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span>
			<button on:click={() => signOut()} class="button">Sign out</button>
		{:else}
			<button on:click={() => signIn('google')}>Sign In with Google</button>
			<button on:click={() => signIn('discord')}>Sign In with GitHub</button>
		{/if}

		<h2>Let's build a basic CRUD application with SvelteKit & Prisma.</h2>
	</hgroup>
	<slot />
</div>
