import { NextPage } from 'next';
// import matter from 'gray-matter';

interface IProps {

}

const HomePage: NextPage<IProps> = ctx => {
  console.log(ctx)
  return (
    <div>Hello world</div>
  )
};

HomePage.getInitialProps = async () => {
  const postsPaths = await require.context('../posts/', false, /\.md$/).keys();

  const posts = Promise.all(
    postsPaths.map(post =>
      import(`../posts/${post.slice(2)}`).then(r => r.default)
    )
  )

  return posts
    .then(r => r)
    .catch(err => console.error(err, 'Unable to parse files'))
}

export default HomePage;
