import { FaRegBookmark } from "react-icons/fa";
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "./ReactQuery";
const ShareAndBookmark = ({ title, id }) => {
  const session = useSession();

  const { isLoading: bookmarkLoading, data } = useQuery({
    queryKey: ["is_bookmarked", `${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/bookmark/${id}`);
      const tojson = await response.json();
      setIsBookmarked(tojson.is_bookmarked);
      return tojson;
    },
  });
  const [isBookmarked, setIsBookmarked] = useState(data?.is_bookmarked);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleBookmarks = async () => {
    if (!session.data) {
      toast.error("Please login to bookmark!");
      return;
    }
    try {
      setIsSubmitting(true);
      const ressponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`,
        {
          method: "PATCH",
          cache: "no-store",
        }
      );
      const data = await ressponse.json();
      setIsBookmarked(data.is_bookmarked);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "bookmarkedList" ||
          (query.queryKey[0] === "is_bookmarked" &&
            query.queryKey[1] === `${id}`),
      });
      // queryClient.invalidateQueries({ queryKey: ["bookmarkedList"] });
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  const currentUrl = window.location.href;
  return (
    <section>
      <div className="flex flex-col items-center">
        {bookmarkLoading ? (
          <div className="flex w-full justify-center items-center">
            <span className="loading loading-infinity loading-lg mt-8 lg:mt-2"></span>
          </div>
        ) : (
          <button
            className={`customBtn w-full  ${
              isBookmarked ? `bg-red-400` : `bg-secondary`
            } text-black mt-8 lg:mt-0 focus:text-black disabled:text-black disabled:bg-slate-400`}
            onClick={handleBookmarks}
            disabled={isSubmitting}
          >
            <FaRegBookmark />
            <span>
              {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
            </span>
          </button>
        )}

        <div className="mt-4">
          <h4 className="text-xl font-semibold">Share This Property:</h4>
        </div>
        <div className="flex gap-x-2 mt-4">
          <LinkedinShareButton title={title} url={currentUrl}>
            <LinkedinIcon size={40} round={true} cursor={"pointer"} />
          </LinkedinShareButton>
          <TelegramShareButton title={title} url={currentUrl}>
            <TelegramIcon size={40} round={true} cursor={"pointer"} />
          </TelegramShareButton>

          <TwitterShareButton title={title} url={currentUrl}>
            <TwitterIcon size={40} round={true} cursor={"pointer"} />
          </TwitterShareButton>

          <EmailShareButton>
            <EmailIcon size={40} round={true} cursor={"pointer"} />
          </EmailShareButton>
        </div>
      </div>
    </section>
  );
};

export default ShareAndBookmark;
