import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useMemo } from "react";

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
  const [error, setError] = useState();

  const parsedURL = useMemo(() => {
    try {
      return new URL(url);
    } catch (e) {}
  }, [url]);

  const cleanedURL = useMemo(() => {
    return parsedURL?.hostname.replace("www.", "");
  }, [parsedURL]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (parsedURL) {
      const res = await fetch(`/api/scrape?url=${parsedURL.toString()}`);
      const data = await res.json();
      setUsingGa(data?.ga);
      if (data?.error) {
        setError(true);
      }
    }
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://isgoogleanalyticsillegal.com/"
          >
            Google Analytics
          </a>
        </h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            placeholder="https://..."
            type="text"
            onChange={(e) => {
              setUsingGa(undefined);
              setUrl(e.target.value);
            }}
            value={url}
          />
          <button type="submit">
            <SubmitIcon style={{ width: 24, height: 24 }} />
          </button>
        </form>

        <div className={styles.answer}>
          {usingGa === true && (
            <p>
              {cleanedURL} <b>is using</b>
              <br />
              Google Analytics
            </p>
          )}

          {console.log(parsedURL)}

          {usingGa === false && (
            <p>
              {cleanedURL} <b>is not using</b>
              <br />
              Google Analytics
            </p>
          )}

          {usingGa !== undefined && (
            <a
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=${cleanedURL}%20${
                    usingGa ? "is" : "isn't"
                  }%20using%20Google%20Analytics.%20Shared%20via%20gachecker.info`
                );
              }}
            >
              Tweet the result
            </a>
          )}

          {error === true && usingGa === undefined && (
            <p>Ouch! There has been an error.</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://giacomocerquone.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made in 🇮🇹 with ❤️ by g.cerquone
        </a>
      </footer>
    </div>
  );
}
