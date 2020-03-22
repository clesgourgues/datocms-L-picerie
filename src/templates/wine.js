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
        {/*         <HelmetDatoCms seo={data.wine.seoMetaTags} /> */}
        <Link to={`/vins`} className='sheet__back link'>
          <span className='sheet__back-icon'></span>
          <span className='sheet__back-text'>Vins</span>
        </Link>
        <div className='sheet__inner-product'>
          <h1 className='sheet__lead'>{data.wine.name}</h1>
          <h1 className='sheet__lead'>{data.wine.millesime}</h1>
          <p className='sheet__price'>
            <span>{data.wine.color}</span>
            <span> / {data.wine.appellation}</span>
          </p>
          <p className='sheet__price'>{data.wine.price} €</p>
          <div className='sheet__gallery'>
            <Img fluid={data.wine.photo.fluid} />
          </div>
          <h6 className='sheet__inner-title'>Cépages</h6>
          <div className='sheet__description'>
            {data.wine.cepages.map((cepage, index) => (
              <span>{index === data.wine.cepages.length - 1 ? cepage : `${cepage}, `}</span>
            ))}
          </div>
          <h6 className='sheet__inner-title'>Notes de dégustation</h6>
          <div
            className='sheet__description'
            dangerouslySetInnerHTML={{
              __html: data.wine.descriptionNode.childMarkdownRemark.html
            }}
          />
          {/*           <p className='sheet__description'>{data.wine.description}</p> */}
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
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      price
      slug
      id
      color
      cepages
      photo {
        url
        fluid(maxWidth: 300, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
