import React from 'react'
import styles from "../../styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <span className={styles.logo}>
        Copyright © Angelica Rockford {new Date().getFullYear()}
      </span>

    </footer>
  )
}
