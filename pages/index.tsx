import { NextPage } from 'next';
import matter, { GrayMatterFile } from 'gray-matter';

interface IProps {
  posts: GrayMatterFile<string>[],
}


const HomePage: NextPage<IProps> = ctx => {
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
        {posts.map(post => <div>{post.data.title}</div>)}
      </main>
      <footer>
        © 20[0-9]{2} John Theodorakopoulos All Rights and Lefts reserved.
      </footer>

    </>
  )
};

HomePage.getInitialProps = async () => {
  const postsPaths = await require.context('../posts/', false, /\.md$/).keys();

  const postsContext: string[] = await Promise.all(
    postsPaths.map(post =>
      import(`../posts/${post.slice(2)}`).then(context => context.default)
    )
  )

  const posts: GrayMatterFile<string>[] = postsContext.map(post => matter(post));

  return {
    posts,
  };
}

export default HomePage;
