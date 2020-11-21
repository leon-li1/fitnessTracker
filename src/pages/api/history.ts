import { prisma } from '../../utils/db';
import { NextApiHandler } from 'next';
import { getUser } from '../../utils/getUser';

const getHistory: NextApiHandler = async (req, res) => {
  try {
    const user = await getUser(req, res);
    return res.json({
      user,
    });
  } catch(err) {
    return res.json({
      error: 'true',
    });
  }
}

export default getHistory;
