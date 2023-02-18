<script lang="ts">
	import '@picocss/pico';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="container">
	<hgroup>
		<h1>
			<a href="/"> SvelteKit & Prisma & TRPC & Zod & AUTH JS🔥 GIT PUSH!!</a>
		</h1>
		{#if $page.data.session?.user}
			<span class="signedInText">
				<small> Signed in as </small><br />
				<img src={$page.data.session.user.image} alt={$page.data.session.user?.name} />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong><br /><br /><br />
			</span>
			<button on:click={() => signOut({ callbackUrl: '/' })} class="button">Sign out</button>
		{:else}
			<button on:click={() => signIn('google')}>Sign In with Google</button>
			<button on:click={() => signIn('discord')}>Sign In with GitHub</button>
		{/if}

		<h2>
			Let's build a basic CRUD application with SvelteKit & Prisma Prisma & TRPC & Zod & AUTH JS🔥
		</h2>
	</hgroup>
	<slot />
</div>
