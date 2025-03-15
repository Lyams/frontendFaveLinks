import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import ErrorMessage from './ErrorMessage';

const ADD_BOOKMARK = gql`
  mutation AddBookmark($title: String!, $url: String!) {
    createBookmark(input: { title: $title, url: $url }) {
      bookmark {
        id
        title
        url
      }
      errors
    }
  }
`;

const AddBookmark = ({ refetch }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [addBookmark, { error }] = useMutation(ADD_BOOKMARK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addBookmark({ variables: { title, url } });
    if (response.data.createBookmark.errors.length === 0) {
      setTitle('');
      setUrl('');
      refetch();
    }
  };

  return (
    <div>
      <ErrorMessage errors={error ? error.message.split('\n') : []} />
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group gap-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="form-control"
            required
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="form-control"
            required
          />
          <button type="submit" className="btn btn-primary">
            Add Bookmark
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookmark;
