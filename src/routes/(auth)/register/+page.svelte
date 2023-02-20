<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<pre>{JSON.stringify(form, null, 2)}</pre>

<form action="?/register" method="post">
	<label for="name">
		Name
		<input type="text" name="name" id="name" />
	</label>
	<label for="name">
		Email
		<input type="email" name="email" id="email" />
	</label>
	<label for="name">
		Password
		<input type="password" name="password" id="password" />
	</label>
	<label for="name">
		Confirm Password
		<input type="password" name="passwordConfirm" id="passwordConfirm" />
	</label>
	<button type="submit">Register</button>
</form>

<hr />
OR

<button on:click={() => signIn('google')}>Sign In with Google</button>
<button on:click={() => signIn('discord')}>Sign In with GitHub</button>
