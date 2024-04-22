import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import getSessionUser from "@/utils/getSessionUser";
import fs from "fs";
import cloudinary from "@/config/cloudinary";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.find({ _id: params.id });
    if (!property || property.length === 0) {
      return new Response("doesnt exist", { status: 404 });
    }
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getServerSession(authOptions);
    const property = await Property.find({ _id: params.id });
    if (!property || property.length === 0) {
      return new Response(
        JSON.stringify({ message: "listing doesn't exist" }),
        { status: 404 }
      );
    }
    if (sessionUser.user.id !== property[0].owner.toString()) {
      return new Response("u aint the owner", { status: 401 });
    }
    const images = property[0].images;
    const imagePromises = [];
    for (let image of images) {
      const result = await cloudinary.uploader.destroy(image.public_id);
      imagePromises.push(result);
      await Promise.all(imagePromises);
    }
    const databaseResponse = await Property.deleteOne({ _id: params.id });
    return new Response(
      JSON.stringify({
        message: "document deleted",
        // databaseResponse: databaseResponse,
      }),
      {
        status: 200,
      }
    );
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
//edit property
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
      return Response("Something went wrong", { status: 500 });
    }

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    let images = formData.getAll("images");
    if (images[0].name === "") {
      images = [];
    }
    if (images.length > 3) {
      return new Response(
        JSON.stringify({
          error: {
            message: "choose a maximum of 3 images please.",
          },
        }),
        { status: 500 }
      );
    }
    const property = await Property.find({ _id: params.id });
    if (!property || !property.length === 0) {
      return new Response(
        JSON.stringify({ message: "Property doesnt exist" }),
        { status: 404 }
      );
    }
    if (property?.[0]?.images.length + images.length > 3) {
      return new Response(
        JSON.stringify({
          message: "You can't have more than 3 images for a given listing",
        }),
        { status: 401 }
      );
    }
    const formObject = Object.fromEntries(formData);
    const tempObject = {
      owner: sessionUser.userID,
      name: formObject.name,
      type: formObject.type,
      description: formObject.description,
      location: {
        street: formObject["location.street"],
        city: formObject["location.city"],
        state: formObject["location.state"],
        zipcode: formObject["location.zipcode"],
      },
      beds: formObject.beds,
      baths: formObject.baths,
      square_feet: formObject.square_feet,
      amenities: [...amenities],
      rates: {
        weekly: formObject["rates.weekly"],
        monthly: formObject["rates.monthly"],
        nightly: formObject["rates.nightly"],
      },
      seller_info: {
        name: formObject["seller_info.name"],
        email: formObject["seller_info.email"],
        phone: formObject["seller_info.phone"],
      },
      is_featured: false,
      is_published: false,
    };

    let uedimages = [];
    let i = 0;
    const imagePromises = [];
    if (images.length > 0) {
      for (let image of images) {
        if (i >= 3) {
          break;
        }
        const bitmap = fs.readFileSync(image.name);
        const data = new Buffer(bitmap).toString("base64");
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${data}`,
          {
            folder: "earentals",
          }
        );
        imagePromises.push(result);
        const uploadedImages = await Promise.all(imagePromises);
        uedimages = uploadedImages;
        i++;
      }
    }

    const tempImageObject = [...property?.[0]?.images];
    uedimages.map((item) => {
      return tempImageObject.push({
        public_id: item.public_id,
        signature: item.signature,
        secure_url: item.secure_url,
      });
    });
    tempObject.images = tempImageObject;
    const { _id } = await Property.findOneAndReplace(
      { _id: params.id },
      tempObject
    );
    return new Response(
      JSON.stringify({
        message: "Property updated",
        id: params.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ messages: "something went wrong" }), {
      status: 500,
    });
  }
};
export const PATCH = async (request, { params }) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userID) {
    return Response("Something went wrong", { status: 500 });
  }
  try {
    await connectDB();
    const user = await User.find({ _id: sessionUser.userID });
    if (!user || user.length === 0) {
      return new Response("doesnt exist", { status: 404 });
    }
    const userBookmars = [...user[0].bookmarks];
    if (userBookmars.find((item) => item.toString() === params.id)) {
      const filterdBookmarks = userBookmars.filter(
        (item) => item.toString() !== params.id
      );
      await User.findOneAndUpdate(
        { _id: sessionUser.userID },
        { bookmarks: filterdBookmarks }
      );
      return new Response(
        JSON.stringify({ message: "removed bookmark", is_bookmarked: false }),
        { status: 200 }
      );
    }
    userBookmars.push(params.id);
    await User.findOneAndUpdate(
      { _id: sessionUser.userID },
      { bookmarks: userBookmars }
    );

    return new Response(
      JSON.stringify({ message: "bookmark added", is_bookmarked: true }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
