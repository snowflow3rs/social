"use client";
import React from "react";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
const SignOut = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <div className="mt-10 px-6">
      <SignedIn>
        <SignOutButton
          signOutCallback={() => {
            router.push("/sign-in");
          }}
        >
          <div className="flex cursor-pointer gap-4 p-4">
            <Image src="/assets/logout.svg" alt="" width={24} height={24} />
            <p className="text-light-2 max-lg:hidden">Logout</p>
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default SignOut;
