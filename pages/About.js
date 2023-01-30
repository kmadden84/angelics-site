import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { fetchEntry } from '../utils/fetchEntry';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Head from "next/head";
import { fetchEntries } from '../utils/fetchEntries';

export default function About() {

  const [bioPost, setBioPost] = useState(null);
  const [aboutImg, setAboutImg] = useState(null)



  function fetchPost(post) {
    fetchEntry(post).then((entry) => {
      const rawRichTextField = entry.fields.biography;
      return documentToHtmlString(rawRichTextField);
    })
      .then((renderedHtml) => {
        setBioPost(renderedHtml)
      })
  }
  useEffect(() => {
    if (aboutImg === null) {
      fetchEntries('avatarAboutPage').then(img => setAboutImg(img))
    }
  }, [aboutImg])

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
      <div className={`${styles.container} about`}>
        {/* <div className="avatar-photo" style={{ backgroundImage: `url("https:${aboutImg?.[0]?.fields?.aboutPic?.fields?.file?.url.toString()}")` }}></div> */}



        <main className="about-page">
          <img src={`https:${aboutImg?.[0]?.fields?.aboutPic?.fields?.file?.url.toString()}`} className="about-pic" />
          <div dangerouslySetInnerHTML={{ __html: bioPost }} />
        </main>

      </div>
    </>
  )
}


