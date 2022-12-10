import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { fetchEntry } from '../utils/fetchEntry';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Head from "next/head";

export default function About() {

  const [bioPost, setBioPost] = useState(null);
  const [blogData, setBlogData] = useState(null);

  function fetchPost(post) {
    const data = fetchEntry(post).then((entry) => {
      console.log("ENTRY", entry)
      const rawRichTextField = entry.fields.biography;
      setBlogData(entry.fields)
      return documentToHtmlString(rawRichTextField);
    })
      .then((renderedHtml) => {
        setBioPost(renderedHtml)
      })
  }


  useEffect(() => {
    if (!bioPost) fetchPost('3V9QExbnU4cXSQe58ZEXqC')
  }, [bioPost])


  return (
    <>
      <Head>
        <title>About Angelica Rockford</title>
        <meta name="description" content="Angelica Rockford's website and portfolio.  Blogs about anti aging and information on staying young" />
        <meta name="keywords" content="Angelica Rockford, staying yonung, anti-aging, health, fitness, portfolio, blog, cv" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>

        <main className={styles.subpage}>

          <div dangerouslySetInnerHTML={{ __html: bioPost }} />
        </main>

      </div>
    </>
  )
}


