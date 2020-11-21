import { prisma } from './db';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from './auth/firebaseAdmin';
import { User } from '@prisma/client';

type getUser = (req: NextApiRequest, res: NextApiResponse) => Promise<User>;

export const getUser: getUser = async (req, res) => {
  const idToken = await verifyIdToken(req.headers.token as string);
  const email = idToken.email as string;
  let user = await prisma.user.findOne({where:{email}});
  if(!user) {
    user = await prisma.user.create({data:{email, name: "Bob"}});
  }
  return user;
}
