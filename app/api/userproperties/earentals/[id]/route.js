import connectDB from "@/config/database";
import Property from "@/models/Property";
import getSessionUser from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
// this is for deleting property images one by one
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
      return new Response(JSON.stringify({ message: "permission denied" }), {
        status: 401,
      });
    }

    const { propertyID } = await request.json();
    const property = await Property.find({ _id: propertyID });
    if (!property || property.length === 0) {
      return new Response(JSON.stringify({ message: "image doesnt exist" }), {
        status: 404,
      });
    }
    if (sessionUser.userID !== property[0].owner.toString()) {
      return new Response(JSON.stringify({ message: "u aint the owner" }), {
        status: 401,
      });
    }
    const images = property[0].images;
    if (!images.find((item) => item.public_id === `earentals/${params.id}`)) {
      return new Response(
        JSON.stringify({ message: "this image doesnt exist" }),
        { status: 404 }
      );
    }
    const remainingImages = images.filter(
      (item) => item.public_id !== `earentals/${params.id}`
    );
    await Property.findOneAndUpdate(
      { _id: propertyID },
      { images: remainingImages }
    );
    const imagePromises = [];
    const result = await cloudinary.uploader.destroy(`earentals/${params.id}`);
    imagePromises.push(result);
    await Promise.all(imagePromises);

    return new Response(JSON.stringify({ message: "correct" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "wrong" }), { status: 500 });
  }
};
