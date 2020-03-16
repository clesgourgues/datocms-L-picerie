const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsCategory {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsCategory.edges.map(({ node: category }) => {
        createPage({
          path: `categories/${category.slug}`,
          component: path.resolve(`./src/templates/category.js`),
          context: {
            slug: category.slug
          }
        });
      });
      resolve();
    });
  });
};
