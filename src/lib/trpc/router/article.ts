import { zfd } from '../../utils/zfd';
import { createTRPCRouter, publicProcedure } from './../t';
// import { ArticleSchema } from '$lib/schema/generate';
import { z } from 'zod';

export const articleSchema = zfd.formData({
	title: zfd.text(),
	content: zfd.text()
});

export const articleRouter = createTRPCRouter({
	createArticle: publicProcedure
		.input(articleSchema)
		.mutation(async ({ ctx: { prisma }, input }) => {
			return await prisma.article.create({
				data: {
					title: input.title,
					content: input.content
				}
			});
		}),
	getAll: publicProcedure.query(async ({ ctx: { prisma } }) => {
		return await prisma.article.findMany();
	}),
	deleteById: publicProcedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.mutation(async ({ input: { id }, ctx: { prisma } }) => {
			return await prisma.article.delete({
				where: {
					id
				}
			});
		})
});
