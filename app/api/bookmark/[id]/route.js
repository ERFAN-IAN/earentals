import getSessionUser from "@/utils/getSessionUser";
import connectDB from "@/config/database";
import User from "@/models/User";
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
    const userBookmars = [...user[0].bookmarks];
    if (userBookmars.find((item) => item.toString() === params.id)) {
      return new Response(JSON.stringify({ is_bookmarked: true }), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ is_bookmarked: false }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
};
