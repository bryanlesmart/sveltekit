<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;

	$: ({ article } = data);
</script>

<form action="?/updateArticle" method="POST" use:enhance>
	<h3>Editing: {article?.title}</h3>
	<label for="title">Title</label>

	<input
		type="text"
		name="title"
		id="title"
		aria-invalid={form?.errors?.fieldErrors ? true : false}
	/>
	{#if form?.errors?.fieldErrors.data}
		<span aria-invalid="true" class="label-text-alt text-error"
			>{form?.errors?.fieldErrors.data[0]}</span
		>
	{/if}
	<textarea
		aria-invalid={form?.errors?.fieldErrors ? true : false}
		name="content"
		id="content"
		cols="30"
		rows="10"
	/>
	{#if form?.errors?.fieldErrors.data}
		<span aria-invalid="true" class="label-text-alt text-error"
			>{form?.errors?.fieldErrors.data[1]}</span
		>
	{/if}

	<button type="submit">Update Article</button>
</form>
