import { NextPage, GetStaticProps } from "next";
import BlogIntro from "../components/BlogIntro";

interface IProps {
  posts: PostContext[] | null;
  err: Error | null;
}

interface PostContext {
  attributes: { [key: string]: any };
  id: number;
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
        {posts?.map((post) => {
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

export async function getStaticProps(): Promise<{
  props: {
    posts: PostContext[] | null;
    err: Error | null;
  };
}> {
  try {
    const res = await fetch(`${process.env.API_HOST}/api/posts`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    const { data } = await res.json();

    return {
      props: {
        posts: data,
        err: null,
      },
    };
  } catch (err) {
    return {
      props: {
        posts: null,
        err: JSON.parse(JSON.stringify(err)),
      },
    };
  }
}

export default HomePage;
