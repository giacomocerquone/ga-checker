import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/scrape?url=${url}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Google Analytics Checker</title>
        <meta
          name="description"
          content="Check if a website is tracking you with Google Analytics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Check if it's using <br />
          <a href="https://isgoogleanalyticsillegal.com/">Google Analytics</a>
        </h1>

        <form className={styles.form} onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <button type="submit">go</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
