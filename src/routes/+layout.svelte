<script lang="ts">
	import '@picocss/pico';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Sveltekit</title>
</svelte:head>

<div class="container">
	<h1><a href="/"> SvelteKit & Prisma & TRPC & Zod & AUTH JS🔥</a></h1>
	<hgroup>
		<div class="grid">
			{#if $page.data.session?.user}
				<div class="grid">
					<div>
						<small> Signed in as </small><br />
						<strong>{$page.data.session.user?.name ?? 'User'}</strong><br /><br /><br />
						<span class="signedInText">
							<img src={$page.data.session.user.image} alt={$page.data.session.user?.name} />
						</span>
					</div>
					<div class="grid">
						<div>
							<div>
								<ul class="grid">
									<li><a href="/">Home</a></li>
									<li><a href="/dashboard">Dashboard</a></li>
									<li><a href="/dashboard/admin">Admin</a></li>
								</ul>
								<button on:click={() => signOut({ callbackUrl: '/' })} class="button"
									>Sign out</button
								>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div>
					<button on:click={() => signIn('google')}>Sign In with Google</button>
					<button on:click={() => signIn('discord')}>Sign In with GitHub</button>
				</div>
			{/if}
		</div>
	</hgroup>
	<slot />
	<footer>
		<div class="grid">
			<div>
				Let's build a basic CRUD application with SvelteKit & Prisma Prisma & TRPC & Zod & AUTH JS🔥
			</div>
		</div>
	</footer>
</div>
