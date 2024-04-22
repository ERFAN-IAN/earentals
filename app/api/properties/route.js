import connectDB from "@/config/database";
import Property from "@/models/Property";
import fs from "fs";
import cloudinary from "@/config/cloudinary";
import getSessionUser from "@/utils/getSessionUser";
export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const objectSearchParams = Object.fromEntries(searchParams);
  try {
    await connectDB();
    const properties = await Property.find(
      searchParams ? objectSearchParams : {}
    );
    if (!properties || properties.length === 0) {
      return new Response(
        JSON.stringify({ message: "there aren't any listings" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userID) {
      return Response("Something went wrong", { status: 500 });
    }

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images");
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
    const { _id: newPropertyID } = await Property.create(tempObject);

    let uedimages;
    let i = 0;
    const imagePromises = [];
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
    const tempImageObject = [];
    uedimages.map((item) => {
      return tempImageObject.push({
        public_id: item.public_id,
        signature: item.signature,
        secure_url: item.secure_url,
      });
    });
    tempObject.images = tempImageObject;
    const { _id } = await Property.findOneAndReplace(
      { _id: newPropertyID },
      tempObject
    );
    return new Response(
      JSON.stringify({
        id: _id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "something went wrong",
        error: error,
      }),
      { status: 500 }
    );
  }
};
