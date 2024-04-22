import getSessionUser from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
      return Response(JSON.stringify({ message: "permission denied" }), {
        status: 401,
      });
    }
    const user = await User.find({ _id: sessionUser.userID });
    if (!user || user.length === 0) {
      return new Response(JSON.stringify({ message: "doesnt exist" }), {
        status: 404,
      });
    }
    const bookmarkedProperties = await Property.find({
      _id: { $in: user[0].bookmarks },
    });
    return new Response(JSON.stringify(bookmarkedProperties), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
};
