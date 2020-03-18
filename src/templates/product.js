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
        <HelmetDatoCms seo={data.product.seoMetaTags} />
        <div className='sheet__inner'>
          <h1 className='sheet__lead'>{data.product.name}</h1>
          <div className='sheet__gallery'>
            <Img fluid={data.product.photo.fluid} />
          </div>

          <p className=''>{data.product.description}</p>
          <p className=''>Composition: {data.product.composition}</p>
          <p>
            {data.product.price} € | {data.product.conditionnement}
          </p>
          <Counter quantity={quantity} setQuantity={setQuantity} />
          <button
            className='sheet__button snipcart-add-item'
            data-item-id={data.product.id}
            data-item-price={data.product.price}
            data-item-image={data.product.photo.url}
            data-item-name={data.product.name}
            data-item-url={`/produits/${data.product.slug}`}
            data-item-description={data.product.description}
            data-item-quantity={quantity}
            data-item-has-taxes-included='true'
          >
            Ajouter au panier
          </button>
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
      composition
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
