import { zfd } from '../../utils/zfd';
import { createTRPCRouter, publicProcedure, protectedProcedure } from './../t';
import { z } from 'zod';

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

export const articleRouter = createTRPCRouter({
	createArticle: protectedProcedure
		.input(articleSchema)
		.mutation(async ({ ctx: { prisma, session }, input }) => {
			return await prisma.article.create({
				data: {
					title: input.title,
					content: input.content,
					userId: session.user.id
				}
			});
		}),
	getAll: publicProcedure.query(async ({ ctx: { prisma } }) => {
		return await prisma.article.findMany({
			include: {
				user: true
			},
			orderBy: { createAt: 'desc' }
		});
	}),
	deleteById: protectedProcedure
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
		}),
	updateArticle: protectedProcedure
		.input(articleUpdateSchema)
		.mutation(async ({ input, ctx: { prisma } }) => {
			return await prisma.article.update({
				where: {
					id: input.id
				},
				data: {
					...input.data
				}
			});
		})
});
