import { NextPage } from 'next';
import Error from 'next/error';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
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

BlogPost.getInitialProps = async ({ res, query }) => {
  const { slug } = query;

  const postFile = await import(`../../posts/${slug}.md`)
    .catch(() => {
      if (res) {
        res.statusCode = NOT_FOUND;
      }
    });


  if (res?.statusCode === NOT_FOUND) {
    return {
      post: {},
      err: {
        statusCode: NOT_FOUND,
      }
    }
  }

  const post = await matter(postFile.default);

  return {
    post,
    err: {},
  }
}

export default BlogPost;