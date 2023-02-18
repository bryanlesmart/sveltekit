<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;
	$: ({ articles } = data);
</script>

<div class="grid">
	<div>
		<p>FORM THE CLIENT FROM SERVER {data.greeting}</p>

		{#if articles.length === 0}
			<h1>Create Articles</h1>
		{/if}
		{#each articles as { title, content, id }}
			<h2>{title}</h2>

			<article>
				<header>{title}</header>
				<p>
					{content}
				</p>
				<form action="?/deleteArticle&id={id}" method="post">
					<button class="outline secondary">Delete Article</button>
				</form>
				<a href="/{id}" role="button" class="outline constrast" style="width: 100%;">Edit Article</a
				>
			</article>
		{/each}
	</div>
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
</div>
