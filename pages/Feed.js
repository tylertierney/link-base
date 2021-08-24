import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useUser } from "../context/authContext";

const Feed = () => {
  const { user, authReady } = useUser();

  console.log(user);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/posts",
        user && {
          headers: {
            Authorization: `Bearer ${user.token.acces_token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [user]);

  return (
    <Layout>
      <div>Feed Page</div>
    </Layout>
  );
};

export default Feed;
