import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import React from "react";

const Home = async () => {
  const resultPost = await fetchPosts(1, 20);
  const user = await currentUser();
  if (!user) return null;
  // const userInfor = await fetchUser(user.id)
  // if (!userInfor?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text text-left">home</h1>
      <section className=" mt-9 flex flex-col gap-10">
        {resultPost.posts.length === 0 ? (
          <p>no thread found</p>
        ) : (
          <>
            {resultPost.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createAt={post.createAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
