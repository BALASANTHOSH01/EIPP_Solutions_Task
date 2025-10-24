import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { fetchUsers, deleteUser } from "../store/userSlice";

export const useUserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setDeleteId(id);
      await dispatch(deleteUser(id));
      setDeleteId(null);
    }
  };

  const refreshUsers = () => {
    dispatch(fetchUsers());
  };

  return {
    users,
    loading,
    error,
    deleteId,
    handleDelete,
    refreshUsers,
  };
};
