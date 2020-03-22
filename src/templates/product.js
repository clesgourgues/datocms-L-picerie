import React, { useState } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Counter from '../components/Counter';
import Allergen from '../components/Allergen';

export default ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.product.seoMetaTags} />
        <Link to={`/${data.product.category.slug}`} className='sheet__back link'>
          <span className='sheet__back-icon'></span> {data.product.category.title}
        </Link>
        <div className='sheet__inner-product'>
          <h1 className='sheet__lead'>{data.product.name}</h1>
          <p className='sheet__description'>{data.product.description}</p>
          <p className='sheet__price'>
            {data.product.price} € | {data.product.conditionnement}
          </p>
          <div className='sheet__gallery'>
            <Img fluid={data.product.photo.fluid} className='sheet__gallery-image' />
          </div>
          {data.product.composition && (
            <>
              <h6 className='sheet__inner-title'>Composition</h6>
              <p className='sheet__composition'>{data.product.composition}</p>
            </>
          )}
          {data.product.allergen && <Allergen allergens={data.product.allergen} />}
          <div className='sheet__buy'>
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
        slug
      }
      conditionnement
      description
      composition
      price
      slug
      id
      minimum
      allergen
      photo {
        url
        fluid(maxWidth: 300, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
