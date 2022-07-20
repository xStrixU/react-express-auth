import { prisma } from '../shared/lib/prisma';

export const findByLogin = async (login: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
    include: {
      roles: true,
    },
  });
};
