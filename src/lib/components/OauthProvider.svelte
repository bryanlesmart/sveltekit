<script>
	import { signIn } from '@auth/sveltekit/client';
</script>

<button on:click={() => signIn('google')}>Sign In with Google</button>
<button on:click={() => signIn('discord')}>Sign In with GitHub</button>
