"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type LoginFormData, loginSchema } from "../schema/login-schema";
import { authClient } from "@/feature/lib/auth-client";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  /*
  formData
  "o que o usuário digitou"

  data
  "o que o Better Auth respondeu"
  */

  const onSubmit = async (formData: LoginFormData) => {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error(error);
      return;
    }

    push("/dashboard");

    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-6 shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Entrar</h1>

          <p className="mt-1 text-sm text-gray-500">
            Entre na sua conta para continuar.
          </p>
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
          Entrar
        </button>
      </form>
    </div>
  );
};
