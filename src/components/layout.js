import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import logo from '../assets/logo_maison_lascombes.svg';

import '../styles/index.sass';

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHome {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introTextNode {
              childMarkdownRemark {
                html
              }
            }
            copyright
            logo {
              fluid(maxWidth: 450, imgixParams: { fm: "png", auto: "compress" }) {
                ...GatsbyDatoCmsSizes
              }
            }
          }
          allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                profileType
                url
              }
            }
          }
          allDatoCmsCategory(sort: { fields: [position], order: ASC }) {
            edges {
              node {
                id
                title
                slug
              }
            }
          }
        }
      `}
      render={data => (
        <div className={`container ${showMenu ? 'is-open' : ''}`}>
          <Helmet htmlAttributes={{ lang: 'fr' }} />
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <div className='container__sidebar'>
            <div className='sidebar'>
              <Link to='/'>
                <Img fluid={data.datoCmsHome.logo.fluid} />
              </Link>
              {/*          <h6 className='sidebar__title'>{data.datoCmsSite.globalSeo.siteName}</h6> */}
              <div
                className='sidebar__intro'
                dangerouslySetInnerHTML={{
                  __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
                }}
              />
              <ul className='sidebar__menu'>
                {data.allDatoCmsCategory.edges.map(({ node: category }) => (
                  <li key={category.id}>
                    <Link to={`/categories/${category.slug}`}>{category.title}</Link>
                  </li>
                ))}
                <li className='link snipcart-checkout'>
                  <Link to='/about'>
                    Mon caddy/mon compte
                    <span className='snipcart-items-count'></span>
                    <span className='snipcart-total-price'></span>
                  </Link>
                </li>
                <li className='link'>
                  <Link to='/about'>A propos</Link>
                </li>
              </ul>
              <div className='sidebar__logo__container'>
                <img src={logo} alt='Logo Maison Lascombes' className='sidebar__logo' />
              </div>
              <p className='sidebar__social'>
                {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                  <a
                    key={profile.profileType}
                    href={profile.url}
                    target='blank'
                    className={`social social--${profile.profileType.toLowerCase()}`}
                  >
                    {' '}
                  </a>
                ))}
              </p>
              <div className='sidebar__copyright'>{data.datoCmsHome.copyright}</div>
            </div>
          </div>
          <div className='container__body'>
            <div className='container__mobile-header'>
              <div className='mobile-header'>
                <div className='mobile-header__menu'>
                  <a
                    href='#'
                    onClick={e => {
                      e.preventDefault();
                      setShowMenu(!showMenu);
                    }}
                  />
                </div>
                <div className='mobile-header__logo link snipcart-checkout Snipcart-cart'>
                  {/*   <Link to='/'>{data.datoCmsSite.globalSeo.siteName}</Link> */}
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
