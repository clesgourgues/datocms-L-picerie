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
        <HelmetDatoCms seo={data.wine.seoMetaTags} />
        <div className='sheet__inner'>
          <div className='sheet__gallery'>
            <Img fluid={data.wine.photo.fluid} />
          </div>
          <h1 className='sheet__title'>{data.wine.name}</h1>
          <p className='sheet__lead'>{data.wine.description}</p>
          <p className='sheet__lead'>
            {data.wine.color} | {data.wine.category}
          </p>
          <p>{data.wine.price} €</p>
          <button className='sheet__button'>Ajouter au panier</button>
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query WineQuery($slug: String!) {
    wine: datoCmsWine(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      name
      category
      color
      description
      price
      slug
      id
      color
      photo {
        url
        fluid(maxWidth: 300, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
