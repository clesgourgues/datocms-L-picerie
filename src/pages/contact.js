import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import ContactForm from '../components/ContactForm';
import AppContext from '../context/AppContext';

const Contact = () => (
  <StaticQuery
    query={graphql`
      query ContactQuery {
        contact: datoCmsContact {
          tel
          hours
          seoMetaTags {
            ...GatsbyDatoCmsSeoMetaTags
          }
        }
      }
    `}
    render={data => (
      <AppContext.Consumer>
        {context => (
          <article className='sheet'>
            <HelmetDatoCms seo={data.contact.seoMetaTags} />
            <div className='sheet__inner'>
              <h1 className='sheet__lead'>Nous contacter</h1>
              <div className='sheet__body'>
                <p>
                  Vous pouvez nous joindre au {data.contact.tel}, {data.contact.hours}
                </p>
                <p>Vous pouvez également nous joindre via le formulaire de contact ci-dessous.</p>
              </div>
              <ContactForm user={context.cart && context.cart.email ? context.cart.email : ''} />
            </div>
          </article>
        )}
      </AppContext.Consumer>
    )}
  />
);

export default Contact;
