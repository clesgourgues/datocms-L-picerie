import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import Masonry from 'react-masonry-component';
import Layout from '../components/layout';

export default ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <article className='sheet'>
        <HelmetDatoCms seo={data.category.seoMetaTags} />
        <div className='sheet__inner'>
          <h1 className='sheet__title'>{data.category.title}</h1>
          <p className='sheet__lead'>{data.category.excerpt}</p>
          <div
            className='sheet__body'
            dangerouslySetInnerHTML={{
              __html: data.category.descriptionNode.childMarkdownRemark.html
            }}
          />
          <div className='sheet__gallery'>
            <Img fluid={data.category.coverImage.fluid} />
          </div>
          <Masonry className='showcase'>
            {data.products.edges.map(({ node: product }) => (
              <div key={product.id} className='showcase__item'>
                <figure className='card'>
                  <Link to={`/categories/produits/${product.slug}`} className='card__image'>
                    <Img fluid={product.photo.fluid} />
                  </Link>
                  <figcaption className='card__caption'>
                    <h6 className='card__title'>
                      <Link to={`/categories/produits/${product.slug}`}>{product.productName}</Link>
                    </h6>
                  </figcaption>
                </figure>
              </div>
            ))}
          </Masonry>
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
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
    products: allDatoCmsProduct {
      edges {
        node {
          id
          slug
          productName
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

//filter: { category: { slug: { eq: $slug } } }
