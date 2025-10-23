import useAuth from "../../../hooks/useAuth";


const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">
        <span className="mr-3">Hi, Welcome</span>
        {
          user?.displayName ? user.displayName : 'Back'
        }
      </h2>
    </div>
  );
};

export default UserHome;