import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Masonry from 'react-masonry-component';
import Layout from '../components/layout';

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.product.seoMetaTags} />
        <div className='sheet__inner'>
          <div className='sheet__gallery'>
            <Img fluid={data.product.photo.fluid} />
          </div>
          <h1 className='sheet__title'>{data.product.name}</h1>
          <p className='sheet__lead'>{data.product.description}</p>
          {/*           <div
            className='sheet__body'
            dangerouslySetInnerHTML={{
              __html: data.product.descriptionNode.childMarkdownRemark.html
            }}
          /> */}
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query ProductQuery($slug: String!) {
    product: datoCmsProduct(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      name
      category {
        title
      }
      conditionnement
      description
      price
      slug
      id
      minimum
      photo {
        url
        fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
