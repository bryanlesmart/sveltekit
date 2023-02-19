import { zfd } from "$lib/utils/zfd";

export const articleSchema = zfd.formData({
	title: zfd.text(),
	content: zfd.text()
});

export const articleUpdateSchema = zfd.formData({
	id: zfd.text(),
	data: zfd.formData({
		title: zfd.text(),
		content: zfd.text()
	})
});