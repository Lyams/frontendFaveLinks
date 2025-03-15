import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_BOOKMARK = gql`
  mutation DeleteBookmark($id: ID!) {
    deleteBookmark(input: { id: $id }) {
      bookmark {
        id
        title
        url
      }
      errors
    }
  }
`;

const BookmarkList = ({ bookmarks, refetch }) => {
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK);

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteBookmark({ variables: { id } });

      if (data.deleteBookmark.errors.length === 0) {
        refetch();
      } else {
        console.error('Error deleting bookmark:', data.deleteBookmark.errors);
      }
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const sortedBookmarks = bookmarks
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <ul className="list-group mt-4">
      {sortedBookmarks.map((bookmark) => (
        <li
          key={bookmark.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            data-bs-toggle="tooltip"
            title={bookmark.url}
          >
            {bookmark.title}
          </a>
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="tooltip"
            title="Destroy link"
            onClick={() => handleDelete(bookmark.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default BookmarkList;
