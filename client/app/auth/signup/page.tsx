"use client";
import React, { FormEvent, useReducer, useState } from "react";
import { NavBar } from "@/components/navbar/navbar";
import Link from "next/link";
import { SignUpForm } from "@/app/forms/signup_form";
import { redirect } from "next/navigation";

export enum signupStates {
  NOT_SIGNED_UP,
  SIGNING_UP,
  SIGNED_UP,
}

export default function SignupCard() {
 const[signupState, setSignupState] = useState(signupStates.NOT_SIGNED_UP);

 const userSignsUpCallback = (state: signupStates) => {
    setSignupState(state);
};

var formDisplay = <SignUpForm onClick={userSignsUpCallback}></SignUpForm>

if(signupState === signupStates.SIGNING_UP){
    formDisplay = <span className="text-center text-lg font-semibold">signing up...</span>;
}
if(signupState === signupStates.SIGNED_UP){
    formDisplay = <div className="text-center text-lg font-semibold"><span>Sucessfully signed up! </span><Link href='/' className="text-blue-600">Continue</Link></div>
}

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {formDisplay}
        </div>
      </div>
    </>
  );
}
