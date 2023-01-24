import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { fetchEntry } from '../utils/fetchEntry';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Head from "next/head";
import { fetchEntries } from '../utils/fetchEntries';

export default function Cv() {

  const [cvData, setCvData] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [cvImg, setCvImg] = useState(null)

  function fetchPost(post) {
    const data = fetchEntry(post).then((entry) => {
      console.log("ENTRY", entry)

      const rawRichTextField = entry.fields.cv;
      setBlogData(entry.fields)
      return documentToHtmlString(rawRichTextField);
    })
      .then((renderedHtml) => {
        setCvData(renderedHtml)
      })
  }


  useEffect(() => {
    if (!cvData) fetchPost('38DCiVbgqruqi3hbnAvcPy')
  }, [cvData])

  useEffect(() => {
    if (cvImg === null) {
      fetchEntries('avatarAbout').then(img => setCvImg(img))
    }
  }, [cvImg])

  return (
    <div className={styles.container}>
      <Head>
        <title>Curriculum Vitae</title>
        <meta name="description" content="Angelica Rockford's CV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.subpage}>


        <div dangerouslySetInnerHTML={{ __html: cvData }} />
        <div className="avatar-photo" style={{ backgroundImage: `url("https:${cvImg?.[0]?.fields?.photo?.fields?.file?.url?.toString()}")` }}>

        </div>

      </main>

    </div>
  )
}


