<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { page } from '$app/stores';
	export let data: PageData;
	export let form: ActionData;

	$: ({ articles } = data);
</script>

<div class="grid">
	<div>
		{#if articles.length === 0}
			<h1>Create Articles</h1>
			<p>Create your own articles join us</p>
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
				aria-invalid={form?.errors?.fieldErrors.title ? true : false}
			/>
			{#if form?.errors}
				<span aria-invalid="true" class="label-text-alt text-error"
					>{form?.errors?.fieldErrors.title ?? ''}</span
				>
			{/if}
			<textarea
				aria-invalid={form?.errors?.fieldErrors.content ? true : false}
				name="content"
				id="content"
				cols="30"
				rows="10"
			/>
			{#if form?.errors?.fieldErrors}
				<span aria-invalid="true" class="label-text-alt text-error"
					>{form?.errors?.fieldErrors.content ?? ''}</span
				>
			{/if}
			<button type="submit">Add article</button>
		</form>
	{/if}
</div>
