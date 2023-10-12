import AccountProfile from "@/components/form/AccountProfile";
import { currentUser } from "@clerk/nextjs";
const onBoarding: React.FC = async () => {
  const user = await currentUser();

  const userInfor = {};

  const userData = {
    id: user?.id,
    objectId: userInfor?._id,
    username: userInfor?.username || user?.username,
    name: userInfor?.name || user?.name,
    bio: userInfor?.bio || "",
    image: userInfor?.image || user?.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 ">
      <h1 className="head-text">OnBoarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} />
      </section>
    </main>
  );
};

export default onBoarding;
