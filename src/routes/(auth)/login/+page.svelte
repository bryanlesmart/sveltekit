<script lang="ts">
	import OauthProvider from '$lib/components/OauthProvider.svelte';
</script>

<br />
<h1>Login</h1>
<small># should i use AUTH JS OR NOT? </small>
<form action="/?login" method="post">
	<label for="name">
		Email
		<input type="email" name="email" id="email" />
	</label>
	<label for="name">
		Password
		<input type="password" name="password" id="password" />
	</label>
	<button type="submit">Login</button>
</form>

or Use this?
<hr />
<OauthProvider />
