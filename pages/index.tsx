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
      <header>
        <div>
          iotheo
        </div>
        <ul>
          <li>
            Blog
          </li>
        </ul>
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
