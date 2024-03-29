import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const isHomePage = (path) => path === "/";

export default function App({ Component, pageProps }) {
  const path = useRouter().pathname;

  return (
    <>
      <Head>
        <title>iotheo</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <style jsx global>
        {`
          html {
            font-size: 62.5%;
            overflow-y: scroll;
          }

          body {
            margin: 0;
            background-color: hsl(228, 5%, 22%);
            color: hsl(248, 35%, 95%);
            font-family: "Merriweather", serif;
          }

          footer {
            margin-top: 7rem;
          }

          #__next {
            max-width: 768px;
            margin: 0 auto;
            padding: 4.2rem 2.1rem;
          }

          a {
            color: hsl(248, 35%, 95%);
          }

          a:hover {
            text-decoration: none;
          }

          h1 {
            font-size: 3.6rem;
            font-weight: 900;
            margin-top: 0;
          }

          article h1 {
            font-size: 4rem;
          }

          h2 {
            margin-top: 4rem;
            font-size: 2.6rem;
          }

          p {
            font-size: 1.6rem;
            margin: 0;
            margin-bottom: 2.8rem;
          }

          small {
            font-size: 1.2rem;
          }

          .logo {
            text-decoration: none;
          }

          .logo:hover {
            color: hsl(248, 35%, 83%);
            transition: all 80ms;
          }

          .intro {
            max-width: 320px;
          }
        `}
      </style>
      <header>
        <h1>
          <Link href="/">
            <a className="logo">iotheo</a>
          </Link>
        </h1>
        {isHomePage(path) && (
          <>
            <p className="intro">
              Portofolio by John Theodorakopoulos. Software engineer,
              minimalist.
            </p>
          </>
        )}
      </header>
      <Component {...pageProps} />
      <footer>All rights reserved kappa, this is MIT license.</footer>
    </>
  );
}
