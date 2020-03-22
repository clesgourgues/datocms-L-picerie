export const getTags = (products, tag) => {
  const tags = products.map(({ node: product }) => (product[tag] ? product[tag] : null));
  return [...new Set(tags)].sort();
};

export const isSelected = (tag, filters) => filters.includes(tag);

export const isFilteredProduct = (product, filters) => {
  const productValues = Object.values(product);
  const stringProductsValues = productValues.filter(
    p => typeof p === 'string' || typeof p === 'number'
  );
  let results = [];
  filters.forEach(filter => {
    results.push(stringProductsValues.includes(filter));
  });
  return results.every(result => result);
};
