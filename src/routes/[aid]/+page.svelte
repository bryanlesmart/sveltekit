<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let data: PageData;
	export let form: ActionData;
	let val: boolean = false;
	$: ({ article } = data);
	if (form?.errors) {
		val = true;
	}
</script>

<form action="?/updateArticle" method="POST">
	<h3>Editing: {article.title}</h3>
	<label for="title"> Title </label>
	<input aria-invalid={val} type="text" id="title" name="title" value={article.title} />
	{#if form?.errors?.title}
		<span class="label-text-alt text-error">{form?.errors?.title}</span>
	{/if}
	<label for="title"> Content </label>
	<textarea aria-invalid={val} id="content" name="content" rows={5} value={article.content} />
	{#if form?.errors?.content}
		<span class="label-text-alt text-error">{form?.errors?.content}</span>
	{/if}
	<button type="submit">Update Article</button>
</form>
