import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { fetchEntries } from "../utils/fetchEntries";
import "bootstrap/dist/css/bootstrap.min.css";

export async function getStaticProps() {
  const entries = await fetchEntries();

  return {
    props: {
      data: entries,
    },
  };
}

export default function Blogs({ data }) {
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
      <div className={`${styles.container} blog-page`}>
        <Head>
          <title>Blog Page</title>
          <meta name="description" content="Blogs by Angelica Rockford" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h2 className={styles.title}>All Blogs</h2>
          <div className="blog-container blog-page">
            {data?.map((item, index) => {
              if (item.fields.date) return (
                <div className="blog-page-card">
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
          </div>
        </main>

      </div>
    </>
  );
}
