"use client";
import React from "react";
import { sidebarLinks } from "@/constant";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface Props {
  data: number;
}
const ItemBar = (data: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const amount = data.data;

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6">
      {sidebarLinks.map((link) => {
        const isActived =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        if (link.route === "/profile") {
          link.route = `${link.route}/${userId}`;
        }

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`leftsidebar_link ${isActived && "bg-primary-500"}`}
          >
            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
            <p className="text-light-1 max-lg:hidden"> {link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ItemBar;
