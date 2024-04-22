"use client";
import { createContext, useState } from "react";
import { useContext } from "react";
const context = createContext();
const Contextwrapper = ({ children }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  return (
    <context.Provider
      value={{ isDeleteModalOpen, setIsDeleteModalOpen, deleteID, setDeleteID }}
    >
      {children}
    </context.Provider>
  );
};
export const useGlobalContext = () => useContext(context);
export default Contextwrapper;
