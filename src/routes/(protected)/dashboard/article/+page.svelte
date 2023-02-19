<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	$: ({ articles } = data);
</script>

<h3>
	Article Table @ {data.session?.user?.name}
</h3>
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

<table>
	<thead>
		<tr>
			<th scope="col">#</th>
			<th scope="col">Title</th>
			<th scope="col">Content</th>
			<th scope="col">Created At</th>
			<th scope="col">Update At</th>
			<th scope="col">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#if articles.length === 0}
			<h1>Create</h1>
		{:else}
			{#each articles as { title, content, id, userId, createAt, updatedAT }, idx}
				{#if userId === data.session?.user?.id}
					<tr>
						<th scope="row">{idx + 1}</th>
						<td>{title}</td>
						<td> {content}</td>
						<td>{createAt.toDateString()}</td>
						<td>{updatedAT.toDateString()}</td>
						<td>
							<form action="?/deleteArticle&id={id}" method="post">
								<button class="outline secondary">Delete Article</button>
							</form>
							<a
								href="/dashboard/article/{id}"
								role="button"
								class="outline constrast"
								style="width: 100%;">Edit Article</a
							>
						</td>
					</tr>
				{/if}
			{/each}
		{/if}
	</tbody>
</table>
