import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  currentUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { dark } from "@clerk/themes";
import { SearchBar } from "./SearchBar";
import { fetchSearchUser } from "@/lib/actions/user.action";

const NavBar = async () => {
  const data = await JSON.parse(JSON.stringify(await currentUser()));

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden ">Blog</p>
      </Link>
      <div>
        <SearchBar routeType="search" tabIndex={100} data={data} />
      </div>
      <div className="flex items-center gap-1">
        <div className="block md:hidden ">
          {/* using library clerk for sign out */}
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src="/assets/logout.svg" alt="" width={24} height={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        ></OrganizationSwitcher>
      </div>
    </nav>
  );
};

export default NavBar;
