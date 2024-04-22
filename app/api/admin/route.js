// import getSessionUser from "@/utils/getSessionUser";
// import connectDB from "@/config/database";
// import Property from "@/models/Property";
// export const GET = async () => {
//   try {
//     const session = await getSessionUser();
//     console.log(session);
//     if (!session || !session.userID) {
//       return new Response(JSON.stringify({ message: "not allowed" }), {
//         status: 401,
//       });
//     }
//     if (session.user.role !== "admin") {
//       return new Response(JSON.stringify({ message: "not admin" }), {
//         status: 401,
//       });
//     }
//     await connectDB();
//     const properties = await Property.find({});
//     const publishedProperties = properties.filter((item) => {
//       return item.is_published === true;
//     });
//     const unPublishedProperties = properties.filter((item) => {
//       return item.is_published === false;
//     });

//     return new Response(
//       JSON.stringify({ publishedProperties, unPublishedProperties }),
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "wrong" }), { status: 500 });
//   }
// };
