import connectDB from "@/config/database";
import Property from "@/models/Property";
export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const objectSearchParams = Object.fromEntries(searchParams);
  const searchPattern = new RegExp(objectSearchParams.search, "i");
  const query = {
    $or: [
      { name: searchPattern },
      { description: searchPattern },
      { "location.street": searchPattern },
      { "location.city": searchPattern },
      { "location.state": searchPattern },
      { "location.zipcode": searchPattern },
    ],
  };
  if (objectSearchParams.type !== "All" && objectSearchParams.type) {
    query.type = objectSearchParams.type;
  }
  try {
    await connectDB();
    const properties = await Property.find(query);
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
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
