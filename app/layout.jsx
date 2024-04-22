import "../assets/styles/globalCSS.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { cookies } from "next/headers";
import ReactQuery from "@/components/ReactQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import DeleteModal from "@/components/DeleteModal";
import Contextwrapper from "@/context/context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const metadata = {
  title: "EA Rentals",
};
const layout = ({ children }) => {
  const theme = cookies().get("theme")?.value;
  return (
    <AuthProvider>
      <ReactQuery>
        <html data-theme={theme}>
          <body className="flex flex-col items-center">
            <Contextwrapper>
              <nav className="flex justify-center">
                <Navbar />
                <DeleteModal />
              </nav>
              <div className="layoutclamp pb-20">{children}</div>
              <ToastContainer />
            </Contextwrapper>
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </html>
      </ReactQuery>
    </AuthProvider>
  );
};

export default layout;
