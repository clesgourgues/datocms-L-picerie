import React from 'react';
import { Link, graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import Img from 'gatsby-image';
import logo from '../assets/logo_epicerie.png';
import { HelmetDatoCms } from 'gatsby-source-datocms';

const IndexPage = ({ data }) => (
  <div className='showcase__container'>
    <HelmetDatoCms seo={data.datoCmsHome.seoMetaTags} />
    <img src={logo} alt='Logo Lépicerie bordelaise' className='showcase__logo' />
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
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
