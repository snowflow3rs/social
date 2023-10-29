import React, { useEffect } from "react";
import { sidebarLinks } from "@/constant";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, redirect } from "next/navigation";
import { SignOutButton, SignedIn, currentUser, useAuth } from "@clerk/nextjs";
import { fetchUser, getActivity } from "@/lib/actions/user.action";
import SignOut from "./SignOut";
import ItemBar from "./ItemBar";

const LeftSideBar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);
  const data = activity.length;

  return (
    <section className="custom-scrollbar leftsidebar">
      <ItemBar data={data} />
      <SignOut />
    </section>
  );
};

export default LeftSideBar;
