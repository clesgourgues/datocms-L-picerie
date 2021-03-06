import React, { useState } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Counter from '../components/Counter';

export default ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <article className='sheet'>
      <HelmetDatoCms seo={data.wine.seoMetaTags} />
      <Link to={`/vins`} className='sheet__back link'>
        <span className='sheet__back-icon'></span>
        <Img
          fluid={data.category.edges[0].node.coverImage.fluid}
          className='sheet__back-category'
        />
      </Link>
      <div className='sheet__inner-product-wine'>
        <h1 className='sheet__lead'>
          {data.wine.name} {data.wine.millesime}
        </h1>
        <p className='sheet__lead'>{data.wine.price.toFixed(2)} €</p>
        <p className='sheet__color'>
          <span>{data.wine.color}</span>
          <span> / {data.wine.appellation}</span>
        </p>
        {data.wine.bio && (
          <div className='sheet__bios'>
            {data.wine.bio.map(b => (
              <img
                src={require('../assets/' + b + '.jpg')}
                alt={b}
                className='products__item-bio'
                key={b}
              />
            ))}
          </div>
        )}
        <div className='sheet__responsive'>
          <div className='sheet__gallery-wine'>
            <Img fluid={data.wine.photo.fluid} className='sheet__gallery-image' />
          </div>
          <div className='sheet__infos'>
            <h6 className='sheet__inner-title'>Cépages</h6>
            <div className='sheet__description'>
              {data.wine.cepages.map((cepage, index) => (
                <span key={index}>
                  {index === data.wine.cepages.length - 1 ? cepage : `${cepage}, `}
                </span>
              ))}
            </div>
            <h6 className='sheet__inner-title'>Notes de dégustation</h6>
            <div
              className='sheet__description'
              dangerouslySetInnerHTML={{
                __html: data.wine.descriptionNode.childMarkdownRemark.html
              }}
            />
            <div className='sheet__buy'>
              <Counter quantity={quantity} setQuantity={setQuantity} />
              <button
                className='sheet__button snipcart-add-item'
                data-item-id={data.wine.ref}
                data-item-price={data.wine.price}
                data-item-image={data.wine.photo.url}
                data-item-name={data.wine.name}
                data-item-url={`/vins/${data.wine.slug}`}
                data-item-description={data.wine.description}
                data-item-quantity={quantity}
                data-item-has-taxes-included='true'
                data-item-taxes='TVA 20% (VINS ET LIVRAISON)'
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
  query WineQuery($slug: String!) {
    category: allDatoCmsCategory(filter: { slug: { eq: "vins" } }) {
      edges {
        node {
          coverImage {
            url
            fluid(maxWidth: 200, imgixParams: { fm: "png", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
    wine: datoCmsWine(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      name
      appellation
      millesime
      color
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      price
      slug
      id
      ref
      color
      bio
      cepages
      photo {
        url
        fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
