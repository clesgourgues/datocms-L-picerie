import React, { useState } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Counter from '../components/Counter';

export default ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.wine.seoMetaTags} />
        <div className='sheet__back link'>
          <span className='sheet__back-icon'></span>
          <Link to={`/vins`}>Vins</Link>
        </div>
        <div className='sheet__inner-product'>
          <h1 className='sheet__title'>{data.wine.name}</h1>
          <p className='sheet__lead'>{data.wine.description}</p>
          <p className='sheet__lead'>
            {data.wine.color} | {data.wine.category}
          </p>
          <p className='sheet__price'>{data.wine.price} €</p>
          <div className='sheet__gallery'>
            <Img fluid={data.wine.photo.fluid} />
          </div>

          <div className='sheet__buy'>
            <Counter quantity={quantity} setQuantity={setQuantity} />
            <button
              className='sheet__button snipcart-add-item'
              data-item-id={data.wine.id}
              data-item-price={data.wine.price}
              data-item-image={data.wine.photo.url}
              data-item-name={data.wine.name}
              data-item-url={`/produits/${data.wine.slug}`}
              data-item-description={data.wine.description}
              data-item-quantity={quantity}
              data-item-has-taxes-included='true'
            >
              Ajouter au panier
            </button>
          </div>
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
      appellation
      millesime
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
