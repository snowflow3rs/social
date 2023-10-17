import AccountProfile from "@/components/form/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
const onBoarding: React.FC = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfor = await fetchUser(user.id);
  if (!userInfor?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    objectId: userInfor?._id,
    username: userInfor ? userInfor?.username : user.username,
    name: userInfor ? userInfor?.name : user.firstName ?? "",
    bio: userInfor ? userInfor?.bio : "",
    image: userInfor ? userInfor?.image : user.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 ">
      <h1 className="head-text">OnBoarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default onBoarding;
