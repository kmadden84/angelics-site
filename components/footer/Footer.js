import React, { useEffect, useState } from 'react'
import styles from "../../styles/Home.module.css";
import { fetchSocial } from '../../utils/fetchSocial';



export default function Footer() {

  const [links, setLinks] = useState(null)


  useEffect(() => {
    if (!links) fetchSocial().then(res => setLinks(res));
    console.log("links", links)
  }, [links])

  return (
    <footer className={styles.footer}>

      <span className={styles.logo}>
        Copyright © Angelica Rockford {new Date().getFullYear()}
      </span>

      <div class="social-links">
        {
          links?.items?.map(socialink => (

            <a className="social-link" href={`${socialink?.fields?.socialLink}`} target="_blank"> <img src={`${socialink?.fields?.socialImage?.fields?.file?.url}`} width="45" height="45" alt={`${socialink?.fields?.socialName}`} /></a>

          ))

        }
      </div>


    </footer >
  )
}
