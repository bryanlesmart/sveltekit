<script lang="ts">
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<div class="grid">
	{#if $page.data.session?.user}
		<div>
			<small> Signed in as </small><br />
			<strong>{$page.data.session?.user?.name ?? 'User'}</strong><br /><br /><br />
			<span class="signedInText">
				<img src={$page.data.session?.user?.image} alt={$page.data.session?.user?.name} />
			</span>
		</div>
		<div class="grid">
			<div>
				<div>
					<ul class="grid">
						<li><a href="/">Home</a></li>
						<li><a href="/dashboard">Dashboard</a></li>
						<li><a href="/dashboard/article">Article</a></li>
						<li>
							<a href="/" on:click={() => signOut({ callbackUrl: '/' })}>Sign Out</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	{:else}
		<div>
			<br />
			<div>
				<h6>Custom Login</h6>
				<a href="/login">Login</a>
				<a href="/register">Register</a>
			</div>
		</div>
	{/if}
</div>
