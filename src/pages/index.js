import React from 'react';
import { Link, graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import Img from 'gatsby-image';

const IndexPage = ({ data }) => (
  <div>
    <Img className='showcase__image' fluid={data.datoCmsHome.logo.fluid} />
    <div
      className='showcase__intro'
      dangerouslySetInnerHTML={{
        __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
      }}
    />
    <Masonry className='showcase'>
      {data.allDatoCmsCategory.edges.map(({ node: category }) => (
        <div key={category.id} className='showcase__item'>
          <figure className='card'>
            <Link to={`/${category.slug}`} className='card__image card__image-category'>
              <Img fluid={category.coverImage.fluid} />
            </Link>
          </figure>
        </div>
      ))}
    </Masonry>
  </div>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsCategory(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "png", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
    datoCmsHome {
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      logo {
        fluid(maxWidth: 450, imgixParams: { fm: "png", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
