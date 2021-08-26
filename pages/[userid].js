import Layout from "../components/Layout/Layout";
import { useUser } from "../context/authContext";

const AccountPage = () => {
  const { user } = useUser();

  return <Layout>{user.email}</Layout>;
};

export default AccountPage;
