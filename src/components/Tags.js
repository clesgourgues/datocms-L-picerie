import React from 'react';
import { isSelected } from '../helpers/category';

const Tags = ({ tags, filters, applyFilters }) => {
  return (
    <div className='tags'>
      {tags.map(tag => (
        <span
          className={`tags__tag ${
            isSelected(tag, filters) ? 'tags__tag-selected' : 'tags__tag-unselected'
          }`}
          onClick={() => applyFilters(tag)}
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
