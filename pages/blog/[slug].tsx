import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Markdown from "react-markdown";

interface IProps {
  post: {
    title: string;
    content?: string;
    data?: {
      [key: string]: any;
    };
    metaTitle: string;
  };
  err: {
    statusCode?: Number;
  };
}

const BlogPost: NextPage<IProps> = ({ post }) => {
  const { content, data } = post;

  return (
    <>
      <Head>
        <title>iotheo - {post.metaTitle || post.title}</title>
      </Head>
      <main>
        <article>
          <header>
            <h1>{post.title}</h1>
          </header>
          <main>
            <Markdown source={content} escapeHtml={false} />
          </main>
        </article>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const response = await fetch(
    `http://localhost:1337/api/posts?filters[slug][$eq]=${slug}`
  );

  const { data, meta } = await response.json();

  // This is technically going to be always the first index
  const [post] = data;

  return {
    props: {
      post: post.attributes,
      err: {},
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:1337/api/posts");

  const { data, meta } = await response.json();

  return {
    paths: data.map((path: any) => ({
      params: {
        slug: path.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export default BlogPost;
