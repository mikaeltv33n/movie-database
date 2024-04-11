import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

const BookmarkButton = ({ isBookmarked, toggleBookmark, movieId }) => {
  const handleClick = () => {
    toggleBookmark(movieId);
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={isBookmarked ? faBookmark : farBookmark} />
    </button>
  );
};

export default BookmarkButton;
