import BookmarkList from './components/BookmarkList';
import AddBookmark from './components/AddBookmark';
import ErrorMessage from './components/ErrorMessage';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKMARKS = gql`
  query GetBookmarks {
    bookmarks {
      id
      title
      url
      createdAt
    }
  }
`;

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKMARKS);

  return (
    <div className="container container-sm mt-4 p-4 shadow-sm rounded">
      <h1 className="my-4">Bookmark App</h1>
      <ErrorMessage errors={error ? [error.message] : []} />
      <AddBookmark refetch={refetch} />
      <BookmarkList bookmarks={data?.bookmarks || []} refetch={refetch} />
    </div>
  );
};

export default App;
