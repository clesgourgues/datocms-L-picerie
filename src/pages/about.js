import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const About = ({ data: { about } }) => (
  <article className='sheet'>
    <HelmetDatoCms seo={about.seoMetaTags} />
    <div className='sheet__inner'>
      <h1 className='about__title'>{about.title}</h1>
      <p className='about__lead'>{about.subtitle}</p>
      <div className='sheet__gallery'>
        <Img fluid={about.photo.fluid} />
      </div>
      <div
        className='sheet__body'
        dangerouslySetInnerHTML={{
          __html: about.bioNode.childMarkdownRemark.html
        }}
      />
    </div>
  </article>
);

export default About;

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
