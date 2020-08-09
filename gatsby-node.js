const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  createRedirect({ fromPath: '/*', toPath: '/', isPermanent: true });

  /*   return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsCategory {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsProduct(filter: { online: { eq: true } }) {
          edges {
            node {
              slug
              category {
                slug
              }
            }
          }
        }
        allDatoCmsWine(filter: { online: { eq: true } }) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors);
      }
      result.data.allDatoCmsCategory.edges.map(({ node: category }) => {
        createPage({
          path: `${category.slug}`,
          component: path.resolve(`./src/templates/category.js`),
          context: {
            slug: category.slug
          }
        });
        resolve();
      });
      result.data.allDatoCmsProduct.edges.map(({ node: product }) => {
        createPage({
          path: `${product.category.slug}/${product.slug}`,
          component: path.resolve(`./src/templates/product.js`),
          context: {
            slug: product.slug
          }
        });
        resolve();
      });
      result.data.allDatoCmsWine.edges.map(({ node: wine }) => {
        createPage({
          path: `vins/${wine.slug}`,
          component: path.resolve(`./src/templates/wine.js`),
          context: {
            slug: wine.slug
          }
        });
        resolve();
      });
    });
  }); */
};
