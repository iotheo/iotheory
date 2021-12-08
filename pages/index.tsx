import { NextPage, GetStaticProps } from "next";
import BlogIntro from "../components/BlogIntro";

interface IProps {
  posts: PostContext[];
}

interface PostContext {
  attributes: { [key: string]: any };
  id: number;
}

const HomePage: NextPage<IProps> = (ctx) => {
  const { posts } = ctx;

  console.log("ta pots", posts);
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
          const { id, attributes } = post;

          const releaseDate = attributes.releaseDate || attributes.createdAt;

          return (
            <BlogIntro
              key={id}
              title={attributes.title}
              description={attributes.description}
              releaseDate={new Date(releaseDate)}
              content={attributes.content}
              slug={attributes.slug}
            />
          );
        })}
      </main>
    </>
  );
};

export async function getStaticProps() {
  let res = await fetch("http://localhost:1337/api/posts");

  let { data } = await res.json();

  return {
    props: {
      posts: data,
    },
  };
}

export default HomePage;
