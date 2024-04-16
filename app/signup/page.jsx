"use client";
import SignupForm from "@/components/SignUpForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Signup = () => {
  const session = useSession();

  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default Signup;
