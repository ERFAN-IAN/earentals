import ProfileIdentity from "@/components/ProfileIdentity";
import Bookmarks from "@/components/Bookmarks";
import Listings from "@/components/Listings";
import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const page = async () => {
  const { user: session } = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  return (
    <div className=" overflow-hidden">
      <main className="w-full flex justify-center">
        <div className="grid gap-y-8  sm:gap-y-12 w-full">
          <section className="w-full">
            <h1 className="text-2xl font-bold mb-4">Profile Details:</h1>
            <ProfileIdentity session={session} />
          </section>
          <section>
            <h2 className="font-bold text-2xl mb-4">Your Listings: </h2>

            <Listings />
          </section>
        </div>
      </main>
    </div>
  );
};

export default page;
