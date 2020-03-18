require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Creative Portfolio`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN
      }
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: process.env.GATSBY_SNIPCART_API_KEY
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Passion One`, `Lato`],
        display: 'swap'
      }
    }
  ]
};
