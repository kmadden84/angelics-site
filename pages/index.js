import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { createClient } from "contentful";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchEntries } from "../utils/fetchEntries";
import "bootstrap/dist/css/bootstrap.min.css";

export async function getStaticProps() {
  const entries = await fetchEntries();

  return {
    props: {
      data: entries,
    },
    revalidate: 300, // In seconds

  };
}

export default function Home({ data }) {
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
  console.log("blog data", data)

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
          {/* 
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
        </main>
      </div>
    </>
  );
}
