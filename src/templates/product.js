import React, { useState } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Counter from '../components/Counter';
import Allergen from '../components/Allergen';

export default ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <article className='sheet'>
      <HelmetDatoCms seo={data.product.seoMetaTags} />
      <Link to={`/${data.product.category.slug}`} className='sheet__back link'>
        <span className='sheet__back-icon'></span>
        <Img fluid={data.product.category.coverImage.fluid} className='sheet__back-category' />
      </Link>
      <div className='sheet__inner-product'>
        <h1 className='sheet__lead'>{data.product.name}</h1>
        <p className='sheet__description'>{data.product.description}</p>
        <div className='sheet__responsive'>
          <div className='sheet__gallery'>
            <Img fluid={data.product.photo.fluid} className='sheet__gallery-image' />
          </div>
          <div className='sheet__infos'>
            {data.product.composition && (
              <>
                <h6 className='sheet__inner-title'>Composition</h6>
                <p className='sheet__composition'>{data.product.composition}</p>
              </>
            )}
            {data.product.allergen && <Allergen allergens={data.product.allergen} />}
            <h6 className='sheet__inner-title'>Prix</h6>
            <p className='sheet__price'>
              {data.product.price.toFixed(2)} € | {data.product.conditionnement}
            </p>
            <div className='sheet__buy'>
              <Counter quantity={quantity} setQuantity={setQuantity} />
              <button
                className='sheet__button snipcart-add-item'
                data-item-id={data.product.ref}
                data-item-price={data.product.price}
                data-item-image={data.product.photo.url}
                data-item-name={data.product.name}
                data-item-url={`/${data.product.category.slug}/${data.product.slug}`}
                data-item-description={data.product.description}
                data-item-quantity={quantity}
                data-item-has-taxes-included={true}
                data-item-taxes='TVA 5.5% (PRODUITS ALIMENTAIRES)'
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
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
        coverImage {
          url
          fluid(maxWidth: 200, imgixParams: { fm: "png", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
      }
      conditionnement
      description
      composition
      price
      slug
      id
      ref
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
