import { zfd } from '../../utils/zfd';
import { createTRPCRouter, publicProcedure, protectedProcedure } from './../t';
// import { ArticleSchema } from '$lib/schema/generate';
import { z } from 'zod';

export const articleSchema = zfd.formData({
	title: zfd.text(),
	content: zfd.text()
});

export const articleRouter = createTRPCRouter({
	createArticle: protectedProcedure
		.input(articleSchema)
		.mutation(async ({ ctx: { prisma, session }, input }) => {
			return await prisma.article.create({
				data: {
					title: input.title,
					content: input.content,
					userId: session.user.id as string // i get because idk why can't overwrite/add go to app.d.ts
				}
			});
		}),
	getAll: publicProcedure.query(async ({ ctx: { prisma } }) => {
		return await prisma.article.findMany({
			include: {
				user: true
			}
		});
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
		}),
	getArticle: protectedProcedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.mutation(async ({ input: { id }, ctx: { prisma } }) => {
			return await prisma.article.findUnique({
				where: {
					id
				}
			});
		})
});
