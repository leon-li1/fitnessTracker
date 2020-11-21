import type { User } from 'firebase';

export const mapUserData = async (user: User) => {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
  }
}
