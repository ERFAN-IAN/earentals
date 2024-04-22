import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ profile }) {
      await connectDB();
      const user = await User.findOne({ email: profile.email });
      if (!user) {
        User.create({
          email: profile.email,
          username: profile.name,
          image: profile.picture,
          role: "user",
        });
      }
      return true;
    },
    async session({ session, token }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      session.user.role = user.role;
      token.role = user.role;
      return session;
    },
  },
};
export default authOptions;
