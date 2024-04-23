import { headers } from "next/headers";
const page = async () => {
  const response = await fetch(`http://localhost:3000/api/admin`, {
    method: "GET",
    headers: headers(),
  });
  const tj = await response.json();
  const a = 0;
  console.log(tj);
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-2">
        <article>s</article>
        <article>s</article>
      </div>
    </div>
  );
};

export default page;
