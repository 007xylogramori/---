import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import { signup } from "../services/authenticationServices";

const SignupPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const passwordRef = useRef(null);
  const { mutate, reset, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Registered Successfully ! Please Login to conitnue");
      navigate("/auth/login");
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    const username = usernameRef.current?.value.trim();
    const fullName = fullNameRef.current?.value.trim();

    if (!email || !password || !fullName ||!username) {
      toast.error("Empty Fields");
      return;
    }
    mutate({email,password,username,fullName});
    reset();
  };
  return (
    <div className="flex min-h-full h-screen    items-center flex-col justify-center px-6   lg:px-8">
      <div className="p-8 border flex flex-col shadow-md min-w-[400px] ">
        <div className="text-xl font-semibold">
          
          
            Create New Account
          
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegisterUser} className="space-y-2" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6  text-gray-900"
              >
                Email address
              </label>
              <div className="">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6  text-gray-900"
              >
                Username
              </label>
              <div className="">
                <input
                ref={usernameRef}
                  type="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="FullName"
                className="block text-sm/6  text-gray-900"
              >
                Full Name{" "}
              </label>
              <div className="">
                <input
                  ref={fullNameRef}
                  type="FullName"
                  name="FullName"
                  id="FullName"
                  autoComplete="FullName"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6  text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading?"Signing Up ...":"Sign in"}
              </button>
            </div>
          </form>

          <p className=" text-center text-sm/6 text-gray-500">
            Already a member ?
            <NavLink
              to="/auth/login"
              className=" text-indigo-600 hover:text-indigo-500"
              end
            >
              {" "}
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
