import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import Error from 'next/error';
import { NOT_FOUND } from 'http-status-codes';

interface IProps {
  post: {
    content?: string,
    data?: {
      [key: string]: any
    }
  },
  err: {
    statusCode?: Number,
  }
}

const BlogPost: NextPage<IProps> = ({ post, err }) => {
  if (err.statusCode) {
    return <Error statusCode={NOT_FOUND}/>
  }

  const { content, data } = post;

  return (
    <article>
      <header>
      <h1>
        {data.title}
      </h1>
      </header>
      <main>
        <Markdown source={content} escapeHtml={false}/>
      </main>
    </article>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const postFile = await import(`../../posts/${slug}.md`);
  const post = await matter(postFile.default);

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)), // https://github.com/vercel/next.js/issues/11993
      err: {},
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await require.context('../../posts/', false, /\.md$/)
    .keys()
    .map(path => path.slice(2, -3))

  return {
    paths: paths.map(path => ({
      params: {
        slug: path
      }
    })),
    fallback: false,
  }
}

export default BlogPost;