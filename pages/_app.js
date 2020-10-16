import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap" rel="stylesheet"></link>
    </Head>
    <style jsx global>{`
      html {
        font-size: 62.5%;
      }
      body {
        max-width: 768px;
        margin: 0 auto;
        padding: 4.2rem 2.1rem;
        background-color: hsl(228, 5%, 22%);
        color: hsl(248, 35%, 95%);
        font-family: 'Merriweather', serif;
      }
      a {

      }
      h1 {
        font-size: 3.6rem;
        font-weight: 900;
      }
      p {
        font-size: 1.6rem;
      }
    `}
    </style>
    <Component {...pageProps} />
    <footer>
      All rights reserved kappa, this is MIT.
    </footer>
    </>
  )
}