"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useFormLogin from "@/hooks/form/useFormLogin";

export default function Login() {
  const { onSubmit, register, isLoading, errors, loginError } = useFormLogin();

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            URL Short Admin Panel
          </h1>
          <form className="space-y-4 mt-6" onSubmit={onSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="Email Address"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              error={errors.password?.message}
              {...register("password")}
            />
            <div>
              <Button isLoading={isLoading}>Login</Button>
            </div>
          </form>
        </div>
      </div>

      {loginError && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{loginError}</span>
          </div>
        </div>
      )}
    </>
  );
}
