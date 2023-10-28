import AccountProfile from "@/components/form/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Copy paste most of the code as it is from the /onboarding

async function Page() {
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
    <>
      <h1 className="head-text">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>

      <section className="mt-12">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </>
  );
}

export default Page;
