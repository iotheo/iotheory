import { NextPage } from 'next';
import matter from 'gray-matter';
import Markdown from 'react-markdown';

interface IProps {
  post: {
    content: string,
    data: {
      [key: string]: any
    }
  },
}

const BlogPost: NextPage<IProps> = ({ post }) => {
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

BlogPost.getInitialProps = async (ctx) => {
  const { slug } = ctx.query;

  const postFile = await import(`../../posts/${slug}.md`);
  const post = await matter(postFile.default);

  return {
    post,
  }
}

export default BlogPost;