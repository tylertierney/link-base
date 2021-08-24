import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useUser } from "../context/authContext";

const Feed = () => {
  const { user, authReady } = useUser();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/posts",
        user && {
          headers: {
            Authorization: `Bearer ${user.token.access_token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to view this content.");
          }
          return res.json();
        })
        .then((data) => {
          setPosts(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setPosts(null);
        });
    }
  }, [user, authReady]);

  return (
    <Layout>
      <div>Feed Page</div>
    </Layout>
  );
};

export default Feed;
