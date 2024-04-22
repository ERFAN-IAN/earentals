import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return;
    }
    return { user: session.user, userID: session.user?.id };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getSessionUser;
