import { NextPage, GetStaticProps } from "next";
import matter from "gray-matter";
import BlogIntro from "../components/BlogIntro";

interface IProps {
  posts: PostContext[];
}

interface PostContext {
  frontMatter: any;
  slug: string;
}

const HomePage: NextPage<IProps> = (ctx) => {
  const { posts } = ctx;

  return (
    <>
      <style jsx>
        {`
          :root {
            --footer-height: 6rem;
          }
        `}
      </style>
      <main>
        {posts.map((post) => {
          const { frontMatter, slug } = post;
          const { data } = frontMatter;

          return (
            <BlogIntro
              key={slug}
              title={data.title}
              description={data.description}
              releaseDate={new Date(data.releaseDate)}
              content={frontMatter.content}
              slug={slug}
            />
          );
        })}
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postsPaths = await require
    .context("../posts/", false, /\.md$/)
    .keys()
    .map((path) => path.slice(2));

  const posts: PostContext[] = await Promise.all(
    postsPaths.map(async (path) => ({
      frontMatter: await import(`../posts/${path}`).then((data) =>
        // silly serialize fix https://github.com/vercel/next.js/issues/11993
        JSON.parse(JSON.stringify(matter(data.default)))
      ),
      slug: path.slice(0, -3),
    }))
  );

  // Sort by most recent posts
  posts.sort(
    (a, b) => b.frontMatter.data.releaseDate - a.frontMatter.data.releaseDate
  );

  return {
    props: {
      posts,
    },
  };
};

export default HomePage;
