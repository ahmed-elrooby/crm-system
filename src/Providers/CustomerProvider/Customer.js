"use client";
import React, { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const userContext = createContext();
const CustomerProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API;
  const [loadding, setLoadding] = useState(false);
  // ========================= ADMIN ====================
  const handleAddUser = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/Users`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddUser, setOpenAddUser] = useState(false);
  const userQury = useQueryClient();
  const handleAddUserMutation = useMutation({
    mutationFn: handleAddUser,
    onSuccess: (data) => {
      toast.success("تم اضافة المستخدم بنجاح");
      setOpenAddUser(false);
      userQury.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطاء اثناء اضافة المستخدم",
      );
    },
  });
  const handleAddUserFun = (values) => {
    handleAddUserMutation.mutate(values);
  };
  // ===================== GET USERS ==================
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/Users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  // ======================= DELETE USER ======================
  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/Users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleDeleteUserMutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: handleDeleteUser,
    onSuccess: (data) => {
      userQury.invalidateQueries(["user"]);
      toast.success("تم حذف المستخدم بنجاح");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطاء اثناء حذف المستخدم",
      );
    },
  });
  const handleDeleteUserFun = (id) => {
    handleDeleteUserMutation.mutate(id);
  };
  // ======================= UPDATE USER ======================
  const handleUpdateUser = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/Users/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const handleUpdateUserMutation = useMutation({
    mutationFn: handleUpdateUser,
    onSuccess: (data) => {
      toast.success("تم تعديل المستخدم بنجاح");
      setOpenUpdateUser(false);
      userQury.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطاء اثناء تعديل المستخدم",
      );
    },
  });
  const handleUpdateUserFun = ({ id, values }) => {
    handleUpdateUserMutation.mutate({ id, values });
  };
  // ===================== GET CUSTOMERS CATEGORIES ==================
  const getCustomersCategories = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/CustomerCategories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: customersCategories, isLoading: isLoadingCustomersCategories } =
    useQuery({
      queryKey: ["customersCategories"],
      queryFn: getCustomersCategories,
    });
  // ========================= ADD CATEGORY ====================
  const handleAddCategory = async ({ values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(
        `${baseUrl}/CustomerCategories`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const categoryQuery = useQueryClient();
  const handleAddCategoryMutation = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: handleAddCategory,
    onSuccess: (data) => {
      categoryQuery.invalidateQueries(["customersCategories"]);
      toast.success("تم إضافة التصنيف بنجاح");
      setOpenAddCategory(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء إضافة التصنيف",
      );
    },
  });
  const handleAddCategorySubmit = (values) => {
    handleAddCategoryMutation.mutate({ values });
  };
  // ========================= DELETE CATEGORY ====================
  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/CustomerCategories/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDeleteCategoryMutation = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: handleDeleteCategory,
    onSuccess: (data) => {
      categoryQuery.invalidateQueries(["customersCategories"]);
      toast.success("تم حذف التصنيف بنجاح");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء حذف التصنيف",
      );
    },
  });

  const handleDeleteCategorySubmit = (id) => {
    handleDeleteCategoryMutation.mutate(id);
  };
  // ========================= EDIT CATEGORY ====================
  const handleEditCategory = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(
        `${baseUrl}/CustomerCategories/${id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const handleEditCategoryMutation = useMutation({
    mutationKey: ["editCategory"],
    mutationFn: handleEditCategory,
    onSuccess: (data) => {
      categoryQuery.invalidateQueries(["customersCategories"]);
      toast.success("تم تعديل بيانات التصنيف بنجاح");
      setOpenEditCategory(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء تعديل بيانات التصنيف",
      );
    },
  });
  const handleEditCategorySubmit = ({ id, values }) => {
    handleEditCategoryMutation.mutate({ id, values });
  };
  // ========================  Customer =========================
  // ========================= get customers ====================
  const getCustomers = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/Customers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  // ========================= Add Customer ====================
  const [openAddCustomer, setOpenAddCustomer] = useState(false);
  const customerQuery = useQueryClient();
  const handleAddCustomer = async ({ values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/Customers`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const handleAddCustomerMutation = useMutation({
    mutationKey: ["addCustomer"],
    mutationFn: handleAddCustomer,
    onSuccess: (data) => {
      customerQuery.invalidateQueries(["customers"]);
      toast.success("تم إضافة العميل بنجاح");
      setOpenAddCustomer(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء إضافة العميل",
      );
    },
  });
  const handleAddCustomerSubmit = (values) => {
    handleAddCustomerMutation.mutate({ values });
  };
  // ========================  DELETE CUSTOMER =========================
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);
  const handleDeleteCustomer = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/Customers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const handleDeleteCustomerMutation = useMutation({
    mutationKey: ["deleteCustomer"],
    mutationFn: handleDeleteCustomer,
    onSuccess: (data) => {
      customerQuery.invalidateQueries(["customers"]);

      toast.success("تم حذف العميل بنجاح");
      setOpenDeleteCustomer(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء حذف العميل");
    },
  });
  const handleDeleteCustomerSubmit = (id) => {
    handleDeleteCustomerMutation.mutate(id);
  };
  // ========================  EDIT CUSTOMER =========================
  const handleEditCustomer = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/Customers/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const handleEditCustomerMutation = useMutation({
    mutationKey: ["editCustomer"],
    mutationFn: handleEditCustomer,
    onSuccess: (data) => {
      customerQuery.invalidateQueries(["customers"]);
      toast.success("تم تعديل بيانات العميل بنجاح");
      setOpenEditCustomer(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء تعديل بيانات العميل",
      );
    },
  });
  const handleEditCustomerSubmit = ({ id, values }) => {
    handleEditCustomerMutation.mutate({ id, values });
  };
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const handleChangeStatus = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.patch(
        `${baseUrl}/Customers/${id}/status`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const handleChangeStatusMutation = useMutation({
    mutationKey: ["changeStatus"],
    mutationFn: handleChangeStatus,
    onSuccess: (data) => {
      customerQuery.invalidateQueries(["customers"]);
      toast.success("تم تغيير حالة العميل بنجاح");
      setOpenChangeStatus(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطأ أثناء تغيير حالة العميل",
      );
    },
  });
  const handleChangeStatusSubmit = ({ id, values }) => {
    handleChangeStatusMutation.mutate({ id, values });
  };
  // =======================  END CUSTOMER =========================

  // ======================= FLIES CATEGORIES ======================
  // ======================= ADD FLIES CATEGORIES ======================
  const handleAddFilesCategory = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/FileCategories`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddCategoryFile, setOpenAddCategoryFile] = useState(false);
  const fileCategoryQuery = useQueryClient();

  const handleAddFileCategoryMutation = useMutation({
    mutationKey: ["addFileCategory"],
    mutationFn: handleAddFilesCategory,
    onSuccess: (data) => {
      fileCategoryQuery.invalidateQueries(["fileCategory"]);
      toast.success("تم اضافة فئة جديدة بنجاح");
      setOpenAddCategoryFile(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطاء اثناء اضافة فئة جديدة",
      );
    },
  });
  const handleAddFileCategoryFun = (values) => {
    handleAddFileCategoryMutation.mutate(values);
  };
  // ======================= GET FLIES CATEGORIES ======================
  const getFilesCategories = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/FileCategories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: filesCategories, isLoading: isLoadingFilesCategories } =
    useQuery({
      queryKey: ["fileCategory"],
      queryFn: getFilesCategories,
    });
  // ======================= DELETE FLIES CATEGORIES ======================
  const handleDeleteFileCategory = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/FileCategories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleDeleteFileCategoryMutation = useMutation({
    mutationKey: ["deleteFileCategory"],
    mutationFn: handleDeleteFileCategory,
    onSuccess: (data) => {
      fileCategoryQuery.invalidateQueries(["fileCategory"]);
      toast.success("تم حذف فئة بنجاح");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "حدث خطاء اثناء حذف فئة");
    },
  });
  const handleDeleteFileCategorySubmit = (id) => {
    handleDeleteFileCategoryMutation.mutate(id);
  };
  // ======================= INACTIVE FLIES CATEGORIES ======================
  const handleInActiveFileCategory = async (id) => {
    try {
      const { data } = await axios.patch(
        `${baseUrl}/FileCategories/${id}/toggle`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleInActiveFileCategoryMutation = useMutation({
    mutationKey: ["inActiveFileCategory"],
    mutationFn: handleInActiveFileCategory,
    onSuccess: (data) => {
      fileCategoryQuery.invalidateQueries(["fileCategory"]);
      toast.success("تم تغيير حالة فئة بنجاح");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطاء اثناء تغيير حالة فئة",
      );
    },
  });
  const handleInActiveFileCategorySubmit = (id) => {
    handleInActiveFileCategoryMutation.mutate(id);
  };
  // ======================= EDIT CUSTOMERS CATEGORIES ======================
  const handleEditFileCategory = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(
        `${baseUrl}/FileCategories/${id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openEditFileCategory, setOpenEditFileCategory] = useState(false);
  const handleEditFileCategoryMutation = useMutation({
    mutationKey: ["editFileCategory"],
    mutationFn: handleEditFileCategory,
    onSuccess: (data) => {
      fileCategoryQuery.invalidateQueries(["fileCategory"]);
      toast.success("تم تعديل فئة بنجاح");
      setOpenEditFileCategory(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطاء اثناء تعديل فئة",
      );
    },
  });
  const handleEditFileCategorySubmit = ({ id, values }) => {
    handleEditFileCategoryMutation.mutate({ id, values });
  };
  // ======================= CUSTOMERS DOCUMENTS ======================
  const handleAddDocument = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(
        `${baseUrl}/CustomerDocuments/upload`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const documentQuery = useQueryClient();
  const handleAddDocumentMutation = useMutation({
    mutationKey: ["addDocument"],
    mutationFn: handleAddDocument,
    onSuccess: (data) => {
      documentQuery.invalidateQueries(["document"]);
      toast.success("تم تحميل المستند بنجاح");
      setOpenAddDocument(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "حدث خطاء اثناء تعديل فئة",
      );
    },
  });
  const handleAddDocumentSubmit = (values) => {
    handleAddDocumentMutation.mutate(values);
  };

  return (
    <userContext.Provider
      value={{
        // admin
        openAddUser,
        setOpenAddUser,
        handleAddUserFun,
        users,
        isLoadingUsers,
        handleDeleteUserFun,
        openUpdateUser,
        setOpenUpdateUser,
        handleUpdateUserFun,
        // users
        handleAddCustomerSubmit,
        openAddCustomer,
        setOpenAddCustomer,
        loadding,
        customers,
        isLoadingCustomers,

        isLoadingCustomersCategories,
        handleDeleteCustomerSubmit,
        openDeleteCustomer,
        setOpenDeleteCustomer,
        openEditCustomer,
        setOpenEditCustomer,
        handleEditCustomerSubmit,
        openChangeStatus,
        setOpenChangeStatus,
        handleChangeStatusSubmit,
        customersCategories,
        handleAddCategorySubmit,
        openAddCategory,
        setOpenAddCategory,
        handleDeleteCategorySubmit,
        openEditCategory,
        setOpenEditCategory,
        handleEditCategorySubmit,
        handleAddFileCategoryFun,
        openAddCategoryFile,
        setOpenAddCategoryFile,
        isLoadingFilesCategories,
        filesCategories,
        handleDeleteFileCategorySubmit,
        handleInActiveFileCategorySubmit,
        openEditFileCategory,
        setOpenEditFileCategory,
        handleEditFileCategorySubmit,
        openAddDocument,
        setOpenAddDocument,
        handleAddDocumentSubmit,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default CustomerProvider;
