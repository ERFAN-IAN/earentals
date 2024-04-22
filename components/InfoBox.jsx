import Link from "next/link";
import Btn from "./Btn";
const InfoBox = ({
  title,
  des,
  link,
  linkLabel,
  bgColor,
  btnColor,
  titleColor,
}) => {
  return (
    <article
      className={`${bgColor} shadow-xl p-4 flex flex-col gap-y-4 rounded-lg w-full  mx-auto card ${titleColor}`}
    >
      <h4 className="text-2xl font-bold">{title}</h4>
      <p>{des}</p>
      <Btn link={link} linkLabel={linkLabel} btnColor={btnColor} />
    </article>
  );
};

export default InfoBox;
