<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	export let data: PageData;
	export let form: ActionData;

	$: ({ articles } = data);

	let greet = 'loading';
	let loading = false;

	const loadData = async () => {
		loading = true;
		let greetingArray = Object.values(await trpc().example.greeting.query());
		greet = greetingArray.join('');
		loading = false;
		/**
		 * when you click it this is the error
		 *  TRPCClientError: event.locals.getSession is not a function
		 * idk why?
		 */
	};

	/**
	 * https://icflorescu.github.io/trpc-sveltekit
	 * don't to this const greet = trpc().example.greeting.query();
	 * Make sure you insert in function
	 * Error: Calling createTRPCClient() on the server requires passing a valid LoadEvent argument
	 */
</script>

<div class="grid">
	<div>
		<a
			href="#load"
			role="button"
			class="btn btn-accent"
			aria-busy={loading}
			on:click|preventDefault={loadData}>Load</a
		>
		<h1 class="text-green-500">{greet}</h1>
		<p>{JSON.stringify(greet, null, 2)} FROM SERVER {data.greeting}</p>

		{#if articles.length === 0}
			<h1>Create Articles</h1>
		{/if}
		{#each articles as { title, content, id, user, userId }}
			<h2>{title}</h2>

			<article>
				<header>{title} @{user.name}</header>
				<p>
					{content}
				</p>
				{#if userId === $page.data.session?.user?.id}
					<form action="?/deleteArticle&id={id}" method="post">
						<button class="outline secondary">Delete Article</button>
					</form>
					<a href="/{id}" role="button" class="outline constrast" style="width: 100%;"
						>Edit Article</a
					>
				{/if}
			</article>
		{/each}
	</div>
	{#if $page.data.session?.user}
		<form method="post" action="?/createArticle" use:enhance>
			<h3>New Article</h3>
			<label for="title">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				aria-invalid={form?.errors?.fieldErrors ? true : false}
			/>
			{#if form?.errors?.fieldErrors}
				<span aria-invalid="true" class="label-text-alt text-error"
					>{form?.errors?.fieldErrors.title}</span
				>
			{/if}
			<textarea
				aria-invalid={form?.errors?.fieldErrors ? true : false}
				name="content"
				id="content"
				cols="30"
				rows="10"
			/>
			{#if form?.errors?.fieldErrors}
				<span aria-invalid="true" class="label-text-alt text-error"
					>{form?.errors?.fieldErrors.content}</span
				>
			{/if}
			<button type="submit">Add article</button>
		</form>
	{/if}
</div>
