import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import ErrorMessage from './ErrorMessage';

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
  const [errors, setErrors] = useState([]);

  const handleDelete = async (id) => {
    try {
      const { data } = await deleteBookmark({ variables: { id } });

      if (data.deleteBookmark.errors.length === 0) {
        refetch();
        setErrors([]);
      } else {
        setErrors(data.deleteBookmark.errors);
      }
    } catch (error) {
      setErrors(['An error occurred: ' + error.message]);
    }
  };

  const sortedBookmarks = bookmarks
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <ErrorMessage errors={errors} />

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
    </div>
  );
};

export default BookmarkList;
