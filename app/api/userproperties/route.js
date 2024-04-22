import connectDB from "@/config/database";
import Property from "@/models/Property";
import getSessionUser from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";
export const GET = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
      return new Response(JSON.stringify({ message: "permission denied" }), {
        status: 401,
      });
    }
    const userProperties = await Property.find({ owner: sessionUser.userID });
    if (!userProperties || userProperties.length === 0) {
      return new Response(
        JSON.stringify({ message: "user doesn't have any listings" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(userProperties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "something went wrong", error: error }),
      {
        status: 500,
      }
    );
  }
};
