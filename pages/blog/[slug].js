import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { fetchEntry } from '../../utils/fetchEntry';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import formatDate from '../../utils/formatDate';

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default function Slug(props) {

  const router = useRouter();


  const [blogPost, setBlogPost] = useState(null);
  const [blogData, setBlogData] = useState(null)

  function fetchPost(post) {
    const data = fetchEntry(post).then((entry) => {
      setBlogData(entry)
      const rawRichTextField = entry.fields.body;
      return rawRichTextField;
    })
      .then((renderedHtml) => {
        setBlogPost(renderedHtml)
      })
  }


  useEffect(() => {
    if (!blogPost || !blogData) fetchPost(router?.query?.postId)
  }, [blogPost, router?.query?.postId])

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="center-text">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="center-text h2">{children}</h2>
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <img
            src={`https://${node?.data?.target?.fields?.file?.url}` ?? `https://${blogPost?.blogImage?.fields?.file?.url}`}
            height={node?.data?.target?.fields?.file?.details?.image?.height}
            width={node?.data?.target?.fields?.file?.details?.image?.width}
            alt={node?.data?.target?.fields?.description}
            className="center-image"
          />
        );
      },
    },
  };


  return (

    <>
      {/* <Header /> */}
      <div className={styles.container}>
        <Head>
          <title>Blog Post</title>
          <meta name="description" content="Angelica Rockford Blog Posting" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <p>Author: {blogData?.fields?.author}</p>
          <h2 style={{ fontWeight: 'bold' }}>{blogData?.fields?.title}</h2>
          <p>Date published: {formatDate(blogData?.fields?.date)}</p>

          <article>
            {/* {blogPost?.blogImage?.fields?.file?.url ? <div style={{ width: '25%', float: 'left', paddingRight: '20px' }}><img src={blogPost?.blogImage?.fields?.file?.url} style={{ maxWidth: '100%' }} /></div> : null} */}
            {documentToReactComponents(blogPost, options)}
            {/* <div dangerouslySetInnerHTML={{ __html: blogPost }} /> */}
          </article>
        </main>

      </div>
    </>
  )
}
