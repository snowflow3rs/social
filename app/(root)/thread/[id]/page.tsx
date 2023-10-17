import ThreadCard from "@/components/cards/ThreadCard";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@/lib/actions/thread.action";

import Comment from "@/components/form/Comment";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();

  if (!user) return null;
  const userInfor = await fetchUser(user.id);
  if (!userInfor?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);
  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          imgThread={thread.image}
          currentUserId={user?.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createAt={thread.createAt}
          comments={thread.children}
        />
      </div>
      <div className="mt-7 ">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfor?.image}
          currentUserId={JSON.stringify(userInfor._id)}
        />
      </div>
      <div className="m-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            imgThread={childItem.image}
            currentUserId={childItem?.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createAt={childItem.createAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default page;