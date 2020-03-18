import React from 'react';
import { Link, graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const IndexPage = ({ data }) => (
  <Layout>
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
            <Link to={`/categories/${category.slug}`} className='card__image'>
              <Img fluid={category.coverImage.fluid} />
            </Link>
            <figcaption className='card__caption card__caption-category'>
              <div className='card__description'>
                <p>{category.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
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
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
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
    }
  }
`;
