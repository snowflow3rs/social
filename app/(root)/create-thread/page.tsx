import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.action";
import PostThreads from "@/components/form/PostThreads";

const CreateThread = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfor = await fetchUser(user.id);

  if (!userInfor?.onboarded) redirect("/onboarding");
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThreads userId={userInfor._id} />
    </>
  );
};

export default CreateThread;
