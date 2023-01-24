import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { fetchEntries } from "../utils/fetchEntries";
import "bootstrap/dist/css/bootstrap.min.css";

export async function getServerSideProps() {
  const entries = await fetchEntries('blogs');
  const avatar = await fetchEntries('avatar');
  return {
    props: {
      data: entries,
      avatar: avatar
    }
  };
}

export default function Home({ data, avatar }) {
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');

  }
  return (
    <>
      {/* <Header /> */}
      <div className={styles.container}>
        <Head>
          <title>You Don't Age</title>
          <meta name="description" content="Angelica Rockford's website and portfolio.  Blogs about anti aging and information on staying young" />
          <meta name="keywords" content="Angelica Rockford, staying yonung, anti-aging, health, fitness, portfolio, blog, cv" />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className="avatar-photo" style={{ backgroundImage: `url("https:${avatar?.[0]?.fields?.picture?.fields?.file?.url.toString()}")` }}>

          </div>
          <h1 className={styles.title}>Welcome to Angelica's Blog!</h1>

          {data?.map((item, index) => {
            if (index <= 2 && item.fields.date) return (
              <div className={styles.card}>
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    query: {
                      slug: item.fields.title,
                      postId: item.sys.id,
                    },
                  }}
                >
                  <div> <a> Date: {formatDate(item?.fields?.date)}<br />Title: {item?.fields?.title}<br />Author: {item?.fields?.author}</a></div>
                </Link>
              </div>

            )
          })}
        </main>
      </div>
    </>
  );
}
