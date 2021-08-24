import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Layout from "../components/Layout/Layout";

const Home = () => {
  return (
    <>
      <Head>
        <title>Linkbase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
          <p></p>
          <h1>Next.js w/ Firebase Client-Side</h1>
        </Layout>
      </main>
    </>
  );
};

export default Home;
