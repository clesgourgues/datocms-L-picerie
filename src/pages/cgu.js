import React from 'react';
import { graphql } from 'gatsby';

const Cgu = ({ data: { cgu } }) => (
  <article className='sheet'>
    <div className='sheet__inner'>
      <div
        className='sheet__body'
        dangerouslySetInnerHTML={{
          __html: cgu.cguNode.childMarkdownRemark.html
        }}
      />
    </div>
  </article>
);

export default Cgu;

export const query = graphql`
  query CguQuery {
    cgu: datoCmsCgu {
      cguNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
