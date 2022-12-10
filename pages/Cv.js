import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { fetchEntry } from '../utils/fetchEntry';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default function Cv() {

  const [cvData, setCvData] = useState(null);
  const [blogData, setBlogData] = useState(null);

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



  return (
    <div className={styles.container}>

      <main className={styles.subpage}>

        <div dangerouslySetInnerHTML={{ __html: cvData }} />
      </main>

    </div>
  )
}


