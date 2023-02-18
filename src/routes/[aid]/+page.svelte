<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;

	$: ({ article } = data);
</script>

<form action="?/updateArticle" method="POST">
	<h3>Editing: {article?.title}</h3>
	<label for="title"> Title </label>
	<input
		aria-invalid={form?.errors?.fieldErrors ? true : false}
		type="text"
		id="title"
		name="title"
		value={article?.title}
	/>
	{#if form?.errors?.fieldErrors}
		<span aria-invalid="true" class="label-text-alt text-error"
			>{form?.errors?.fieldErrors.title}</span
		>
	{/if}
	<label for="title"> Content </label>
	<textarea
		aria-invalid={form?.errors?.fieldErrors ? true : false}
		id="content"
		name="content"
		rows={5}
		value={article?.content}
	/>
	{#if form?.errors?.fieldErrors}
		<span class="label-text-alt text-error">{form?.errors?.fieldErrors.content}</span>
	{/if}
	<button type="submit">Update Article</button>
</form>
