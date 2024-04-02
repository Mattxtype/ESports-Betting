import { SignupCard } from "@/components/auth/signup_card";
import { NavBar } from "@/components/navbar/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <div>
      <SignupCard/>
      </div>
    </main>
  );
}
