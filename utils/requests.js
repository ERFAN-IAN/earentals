import { queryClient } from "@/components/ReactQuery";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";
const NEXT_PUBLIC_API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null;
export const fetchProperties = async (para) => {
  if (!NEXT_PUBLIC_API_DOMAIN) {
    return [];
  }
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/properties`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const fetchUserProperties = () => {
  return {
    queryKey: ["userproperty"],
    queryFn: async () => {
      const response = await fetch(`${NEXT_PUBLIC_API_DOMAIN}/userproperties`);
      const jj = await response.json();
      return jj;
    },
  };
};

export const fetchSingleProperty = (id) => {
  return {
    queryKey: ["property", `${id}`],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${NEXT_PUBLIC_API_DOMAIN}/properties/${id}`
        );
        const rj = await response.json();
        return rj;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  };
};

export const deleteSingleProperty = (id) => {
  return {
    mutationFn: async () => {
      await fetch(`${NEXT_PUBLIC_API_DOMAIN}/properties/${id}`, {
        method: "delete",
      });
    },
    onSuccess: () => {
      // queryKey: ["userproperty", "property"]
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "userproperty" ||
          (query.queryKey[0] === "property" && query.queryKey[1] === `${id}`),
      });
      toast.success("removed!");
    },
  };
};

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price.toFixed(0));
  return dollarsAmount;
};
