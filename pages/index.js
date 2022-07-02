import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const SubmitIcon = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      <path
        fill="#fff"
        d="m190.5 66.9 22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
      />
    </svg>
  );
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [usingGa, setUsingGa] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/scrape?url=${url}`)
      .then((res) => res.json())
      .then((data) => {
        setUsingGa(data?.ga);
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
          Check if it&apos;s using <br />
          <a href="https://isgoogleanalyticsillegal.com/">Google Analytics</a>
        </h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            placeholder="https://..."
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <button type="submit">
            <SubmitIcon style={{ width: 24, height: 24 }} />
          </button>
        </form>

        <div className={styles.answer}>
          {usingGa === true && (
            <>
              <h2>YES!</h2>
              <iframe
                src="https://giphy.com/embed/W9WSk4tEU1aJW"
                width="480"
                height="270"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              />
            </>
          )}

          {usingGa === false && (
            <>
              <h2>NO!</h2>
              <iframe
                src="https://giphy.com/embed/15aGGXfSlat2dP6ohs"
                width="480"
                height="272"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              />
            </>
          )}
        </div>
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
