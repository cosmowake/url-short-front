"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { setCredentials } from "@/features/auth/authSlice";
import Cookies from "js-cookie";
import { usePostLoginMutation } from "@/api/authApiSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";

export type LoginForm = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const useFormLogin = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = usePostLoginMutation();
  const [loginError, setLoginError] = useState("");

  //TODO remove defaultValues
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (request) => {
    const { data } = await login(request);
    if (data.status === "Error") {
      setTimeout(() => setLoginError(""), 4000);
      setLoginError(data?.error);
      return;
    }

    dispatch(setCredentials({ token: data.token }));
    Cookies.set("token", data.token, { expires: 7 });
    window.location.href = "/admin";
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    loginError,
  };
};

export default useFormLogin;
