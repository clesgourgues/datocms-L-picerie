const getProductTag = (product, tag) => (typeof product[tag] === 'object' ? tag : product[tag]);

export const getTags = (products, tag) => {
  const tags = products
    .map(({ node: product }) => product[tag] && getProductTag(product, tag))
    .filter(product => product);
  return [...new Set(tags)].sort();
};

export const isSelected = (tag, filters) => filters.includes(tag);

export const isFilteredProduct = (product, filters) => {
  const productValues = Object.values(product);
  const stringProductsValues = productValues.filter(
    p => typeof p === 'string' || typeof p === 'number'
  );
  if (product.bio) {
    stringProductsValues.push('bio');
  }
  let results = [];
  filters.forEach(filter => {
    results.push(stringProductsValues.includes(filter));
  });
  return results.some(result => result);
};
