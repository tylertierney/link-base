import Layout from "../components/Layout/Layout";
import { useUser } from "../context/authContext";
import clientPromise from "../utils/mongodb";

const AccountPage = ({ userdata }) => {
  console.log(userdata);

  return <Layout>ACCOUNT PAGE</Layout>;
};

export default AccountPage;

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = await client.db();

  const userdata = await db
    .collection("users")
    .find({ id: context.params })
    .toArray();

  return {
    props: {
      userdata: JSON.parse(JSON.stringify(userdata)),
    },
  };
}
