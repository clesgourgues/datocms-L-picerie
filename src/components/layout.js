import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import { setConfig } from 'react-hot-loader';
import Img from 'gatsby-image';
import logo from '../assets/logo_maison_lascombes.svg';
import Cart from '../components/Cart';
import AppContext from '../context/AppContext';

import '../styles/index.sass';

setConfig({ pureSFC: true });

const TemplateWrapper = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
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
            copyright
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
        <AppContext.Consumer>
          {context => (
            <div className={`container ${showMenu ? 'is-open' : ''}`}>
              <Helmet htmlAttributes={{ lang: 'fr-FR' }} />
              <HelmetDatoCms
                favicon={data.datoCmsSite.faviconMetaTags}
                seo={data.datoCmsHome.seoMetaTags}
              />
              <Cart cart={context.cart} />
              <div className='container__sidebar'>
                <div className='sidebar'>
                  <div className='container__sidebar-hamburger'>
                    <a
                      href='#'
                      onClick={e => {
                        e.preventDefault();
                        setShowMenu(!showMenu);
                      }}
                    />
                  </div>
                  <Link to='/'>
                    <div className='sidebar__logo__container'>
                      <img src={logo} alt='Logo Maison Lascombes' className='sidebar__logo' />
                    </div>
                  </Link>
                  <ul className='sidebar__menu'>
                    {data.allDatoCmsCategory.edges.map(({ node: category }) => (
                      <li
                        key={category.id}
                        onClick={e => {
                          e.preventDefault();
                          const id = e.target.id;
                          setSelectedCategory(id);
                        }}
                        className={
                          selectedCategory === category.title ? 'sidebar__menu-selected' : ''
                        }
                      >
                        <Link to={`/${category.slug}`} id={category.title}>
                          {category.title}
                        </Link>
                      </li>
                    ))}
                    <li className='link'>
                      <Link to='/about'>A propos</Link>
                    </li>
                  </ul>
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
        </AppContext.Consumer>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
