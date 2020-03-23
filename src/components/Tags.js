import React from 'react';
import { isSelected } from '../helpers/category';

const Tags = ({ tags, filters, toggleFilters }) => {
  return (
    <div className='tags'>
      {tags.map(tag => (
        <span
          className={`tags__tag ${
            isSelected(tag, filters) ? 'tags__tag-selected' : 'tags__tag-unselected'
          }`}
          onClick={() => toggleFilters(tag)}
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
