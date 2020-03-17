import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
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
          <p>
            {data.product.price} € | {data.product.conditionnement}
          </p>
          <button className='sheet__button'>Ajouter au panier</button>
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
        fluid(maxWidth: 300, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
