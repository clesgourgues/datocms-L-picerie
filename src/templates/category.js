import React, { useState } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Tags from '../components/Tags';
import { getTags, isFilteredProduct } from '../helpers/category';
import { setConfig } from 'react-hot-loader';

setConfig({ pureSFC: true });

const wineFilters = ['color', 'appellation', 'millesime'];

export default ({ data }) => {
  const isWine = data.category.slug === 'vins';
  const allProducts = isWine ? data.wines.edges : data.products.edges;
  const [products, setProducts] = useState(isWine ? data.wines.edges : data.products.edges);
  const [filters, setFilters] = useState([]);

  const applyFilters = filterValue => {
    const newFilters = filters.includes(filterValue)
      ? filters.filter(filter => filter !== filterValue)
      : [...filters, filterValue];
    setFilters(newFilters);
    const filteredProducts = allProducts.filter(({ node: product }) =>
      isFilteredProduct(product, newFilters)
    );
    setProducts(filteredProducts);
  };

  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.category.seoMetaTags} />
        <div className='sheet__inner'>
          <p className='sheet__lead'>{data.category.excerpt}</p>
          <div
            className='sheet__body'
            dangerouslySetInnerHTML={{
              __html: data.category.descriptionNode.childMarkdownRemark.html
            }}
          />
          {isWine && (
            <div className='sheet__tags'>
              <div className='sheet__cancel'>
                <span className='sheet__cancel-icon'></span>
                <span
                  onClick={() => {
                    setFilters([]);
                    setProducts(isWine ? data.wines.edges : data.products.edges);
                  }}
                  className='sheet__cancel-title'
                >
                  Supprimer les filtres
                </span>
              </div>
              {wineFilters.map(filter => (
                <Tags
                  tags={getTags(allProducts, filter)}
                  filters={filters}
                  applyFilters={applyFilters}
                  key={filter}
                />
              ))}
            </div>
          )}

          <div className='sheet__gallery'>
            <Img fluid={data.category.coverImage.fluid} />
          </div>
          <div className='products'>
            {products.map(({ node: product }) => (
              <figure key={product.id} className='products__item'>
                <Link
                  to={`/${data.category.slug}/${product.slug}`}
                  className='card__image card__image-product'
                >
                  <Img fluid={product.photo.fluid} className='card__image-inner' />
                </Link>
                <figcaption className='card__caption card__caption-product'>
                  <h6 className='card__title'>
                    <Link to={`/${data.category.slug}/${product.slug}`}>{product.name}</Link>
                  </h6>
                  {isWine ? (
                    <p>{product.price}€ /bouteille</p>
                  ) : (
                    <p>
                      {product.price}€ | {product.conditionnement}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query CategoryQuery($slug: String!) {
    category: datoCmsCategory(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      slug
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "png", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
    products: allDatoCmsProduct(filter: { category: { slug: { eq: $slug } } }) {
      edges {
        node {
          id
          slug
          name
          price
          conditionnement
          photo {
            url
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
    wines: allDatoCmsWine {
      edges {
        node {
          id
          slug
          price
          name
          color
          appellation
          millesime
          photo {
            url
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`;
