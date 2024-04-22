"use client";
import { useGlobalContext } from "@/context/context";
import { useMutation } from "@tanstack/react-query";
import { deleteSingleProperty } from "@/utils/requests";
const DeleteModal = () => {
  const { setIsDeleteModalOpen, isDeleteModalOpen, deleteID } =
    useGlobalContext();
  const { mutate: deleteMutate } = useMutation(deleteSingleProperty(deleteID));
  return (
    <div
      className={
        isDeleteModalOpen
          ? `fixed  flex z-[1] justify-center items-center opacity-100  overflow-hidden inset-0 duration-200`
          : ` fixed  flex z-[-1] justify-center items-center opacity-0 invisible overflow-hidden inset-0 duration-200`
      }
      onClick={(e) => {
        setIsDeleteModalOpen(false);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card shadow-xl bg-gray-400 px-4 py-4 text-black  max-w-[98vw]"
      >
        <h1 className="font-bold">
          Are you sure you want to delete this listing?
        </h1>
        <div className=" flex gap-x-2 mt-8 text-white justify-end">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="rounded-lg bg-secondary text-black py-2 px-4"
          >
            No
          </button>
          <button
            onClick={() => {
              deleteMutate();
              setIsDeleteModalOpen(false);
            }}
            className=" bg-red-600 rounded-lg py-2 px-4"
          >
            yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
