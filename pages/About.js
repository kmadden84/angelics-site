import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { fetchEntry } from '../utils/fetchEntry';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
    console.log(bioPost)
  }, [bioPost])

  // const options = {
  //   renderNode: {
  //     [BLOCKS.PARAGRAPH]: (node, children) => (
  //       <p>{children}</p>
  //     ),
  //   },
  // };

  return (
    <div className={styles.container}>

      <main className={styles.subpage}>

        <div dangerouslySetInnerHTML={{ __html: bioPost }} />
      </main>

    </div>
  )
}


