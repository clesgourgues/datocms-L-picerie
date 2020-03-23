import React, { useState, useEffect } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Tags from '../components/Tags';
import { getTags, isFilteredProduct } from '../helpers/category';
import { setConfig } from 'react-hot-loader';

setConfig({ pureSFC: true });

const wineFilters = ['color', 'appellation', 'millesime', 'bio'];

export default ({ data }) => {
  const isWine = data.category.slug === 'vins';
  const allProducts = isWine ? data.wines.edges : data.products.edges;
  const [products, setProducts] = useState(isWine ? data.wines.edges : data.products.edges);
  const [filters, setFilters] = useState([]);

  const toggleFilters = filterValue => {
    const newFilters = filters.includes(filterValue)
      ? filters.filter(filter => filter !== filterValue)
      : [...filters, filterValue];
    setFilters(newFilters);
  };

  useEffect(() => {
    const filteredProducts =
      filters.length === 0
        ? allProducts
        : allProducts.filter(({ node: product }) => isFilteredProduct(product, filters));
    setProducts(filteredProducts);
  }, [filters]);

  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.category.seoMetaTags} />
        <div className='sheet__inner'>
          <div className='sheet__gallery-category'>
            <Img fluid={data.category.coverImage.fluid} />
          </div>
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
                  toggleFilters={toggleFilters}
                  key={filter}
                />
              ))}
            </div>
          )}
          <div className='products'>
            {products.map(({ node: product }) => (
              <figure key={product.id} className='products__item'>
                {product.bio && (
                  <div className='products__item-bios'>
                    {product.bio.map(b => (
                      <img
                        src={require('../assets/' + b + '.jpg')}
                        alt={b}
                        className='products__item-bio'
                        key={b}
                      />
                    ))}
                  </div>
                )}
                <Link
                  to={`/${data.category.slug}/${product.slug}`}
                  className='card__image card__image-product'
                >
                  <Img fluid={product.photo.fluid} className='card__image-inner' />
                </Link>
                <figcaption className='card__caption card__caption-product'>
                  <h6 className='card__title'>
                    <Link to={`/${data.category.slug}/${product.slug}`}>
                      {product.name} {product.millesime}
                    </Link>
                  </h6>
                  {isWine ? (
                    <p>{product.price.toFixed(2)}€ /bouteille</p>
                  ) : (
                    <p>
                      {product.price.toFixed(2)}€ | {product.conditionnement}
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
        fluid(maxWidth: 500, imgixParams: { fm: "png", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
    products: allDatoCmsProduct(
      sort: { fields: [price], order: ASC }
      filter: { category: { slug: { eq: $slug } } }
    ) {
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
    wines: allDatoCmsWine(sort: { fields: [price], order: ASC }) {
      edges {
        node {
          id
          slug
          price
          name
          color
          appellation
          millesime
          bio
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
