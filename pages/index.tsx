import { NextPage } from 'next';
import matter from 'gray-matter';
import BlogIntro from '../components/BlogIntro';
interface IProps {
  posts: PostContext[],
}

interface PostContext {
  frontMatter: any,
  slug: string,
}

const HomePage: NextPage<IProps> = (ctx) => {
  const { posts } = ctx;

  return (
    <>
      <style jsx global>{`
        :root {
          --footer-height: 6rem;
        }

        html {
          font-size: 62.5%;
        }

        h1, h2, h3, p {
          margin: 0;
        }

        #__next > * + * {
          margin-top: 2.5rem;
        }

        body {
          position: relative;
          width: 90vw;
          margin: 0 auto;
          min-height: 100vh;
        }

        header h1,h2 {
          font-size: 2.8rem;
        }

        header small {
          font-size: 1.2rem;
          color: #ccc;
          font-weight: 300;
        }

        main {
          padding-bottom: var(--footer-height);
        }

        main p {
          font-size: 1.6rem;
        }

        footer {
          position: absolute;
          bottom: 0;
          height: var(--footer-height);
          background: red;
          font-size: 2rem;
        }
      `}
      </style>
      <header>
        <h1>
          iotheo
        </h1>
        {/* <ul>
          <li>
            Blog
          </li>
        </ul> */}
      </header>
      <main>
        {posts.map(post => {
          const { frontMatter, slug } = post;
          const { data } = frontMatter;

          return (
            <BlogIntro
              key={slug}
              title={data.title}
              description={data.description}
              releaseDate={new Date(data.releaseDate)}
              duration={data.duration}
              slug={slug}
            />
          );
        })}
      </main>
      <footer>
        John Theodorakopoulos
      </footer>
    </>
  );
};

HomePage.getInitialProps = async () => {
  const postsPaths = await require.context('../posts/', false, /\.md$/)
    .keys()
    .map(path => path.slice(2))

    const posts: PostContext[] = await Promise.all(
      postsPaths
      .map(async path => ({
        frontMatter: await import(`../posts/${path}`).then(data => matter(data.default)),
        slug: path.slice(0, -3),
      }))
      );

    // Sort by most recent posts
    posts.sort((a, b) => b.frontMatter.data.releaseDate - a.frontMatter.data.releaseDate);

  return {
    posts,
  };
};

export default HomePage;
