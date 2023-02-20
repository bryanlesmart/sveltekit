import { CreateUserSchema } from './../../schema/schema';
import { createTRPCRouter, publicProcedure } from './../t';
import { hash } from 'argon2';

export const userRouter = createTRPCRouter({
	registerUser: publicProcedure
		.input(CreateUserSchema)
		.mutation(async ({ input, ctx: { prisma } }) => {
			const { email, password, name } = input;
			const hashedPassword = await hash(password);
			const result = await prisma.user.create({
				data: {
					email,
					name,
					password: hashedPassword
				}
			});
			return {
				status: 201,
				message: 'Account created successfully',
				result: result.email
			};
		})
});
