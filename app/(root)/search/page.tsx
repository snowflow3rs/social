import React from "react";

import { currentUser } from "@clerk/nextjs";
import { fetchSearchUser, fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import ProfileHead from "@/components/shared/ProfileHead";
import { profileTabs } from "@/constant";
import UserCard from "@/components/cards/UserCard";
const page = async () => {
  const user = await currentUser();

  if (!user) return null;
  const userInfor = await fetchUser(user.id);
  if (!userInfor?.onboarded) redirect("/onboarding");

  const result = await fetchSearchUser({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 20,
    sortBy: "desc",
  });
  return (
    <section>
      <h1 className=" head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col  gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                name={user.name}
                imgUrl={user.image}
                userType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
