import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { fetchEntry } from '../../utils/fetchEntry';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';



export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default function Slug(props) {

  const router = useRouter();


  const [blogPost, setBlogPost] = useState(null);
  const [blogData, setBlogData] = useState(null);

  function fetchPost(post) {
    const data = fetchEntry(post).then((entry) => {
      const rawRichTextField = entry.fields.body;
      setBlogData(entry.fields)
      return documentToHtmlString(rawRichTextField);
    })
      .then((renderedHtml) => {
        setBlogPost(renderedHtml)
      })
  }




  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     if (router?.query?.postId) fetchPost(router?.query?.slug)
  //   };

  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, []);


  useEffect(() => {
    if (!blogData || !blogPost) fetchPost(router?.query?.postId)
    console.log(blogData)
    console.log(router)
  }, [blogData, blogPost, router?.query?.postId])

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p>{children}</p>
      ),
    },
  };


  return (

    <>
      {/* <Header /> */}
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <p>{blogPost?.fields?.date}</p>
          <p>{blogPost?.fields?.author}</p>
          <p>{blogPost?.fields?.title}</p>
          <article>
            {blogData?.blogImage?.fields?.file?.url ? <div style={{ width: '25%', float: 'left', paddingRight: '20px' }}><img src={blogData?.blogImage?.fields?.file?.url} style={{ maxWidth: '100%' }} /></div> : null}

            <div dangerouslySetInnerHTML={{ __html: blogPost }} />
          </article>
        </main>

      </div>
    </>
  )
}
