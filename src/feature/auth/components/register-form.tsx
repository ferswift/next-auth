"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  type RegisterFormData,
  registerSchema,
} from "../schema/register-schema";
import { authClient } from "@/feature/lib/auth-client";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log(result);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-6 shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Criar conta</h1>

          <p className="mt-1 text-sm text-gray-500">
            Preencha seus dados para criar sua conta.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nome
          </label>

          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />

          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />

          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Senha
          </label>

          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />

          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
};
