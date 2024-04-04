"use client";
import React, { FormEvent } from "react";
import axios from "axios";
import { signupStates } from "../auth/signup/page";
import Link from "next/link";

export function SignUpForm(props: { onClick: (state: signupStates) => void }) {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onClick(signupStates.SIGNING_UP);
    var formData = new FormData(event.currentTarget);
    const form_values = Object.fromEntries(formData);
    try {
      const response = await axios.post("/api/auth/signup", {
        email: form_values.email,
        password: form_values.password,
      });
      props.onClick(signupStates.SIGNED_UP);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Account
          </button>
        </div>
      </form>
      <div>
        <span className="mr-4">Already have an account?</span>
        <Link href={"/auth/signin"} className="text-blue-600">
          Sign in
        </Link>
      </div>
    </>
  );
}
