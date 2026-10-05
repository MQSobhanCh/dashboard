import PageHeader from "../../components/global/PageHeader";
import { useAuthStore } from "../../stores/auth.store";

const Profile = () => {

  const { user } = useAuthStore();

  return (
    <>
      <PageHeader text="User Profile" />

      <div className="flex gap-4 mt-4">
        <figure className="w-35 h-35 flex justify-center rounded-lg p-2 bg-neutral-800">
          <img src={user?.image} alt={user?.firstName + ' ' + user?.lastName} />
        </figure>

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{user?.firstName + ' ' + user?.lastName}</h1>
          <h2 className="text-2xl">{user?.email}</h2>
          <h3 className="text-2xl">{user?.gender}</h3>
        </div>
      </div>
    </>
  )
}

export default Profile
