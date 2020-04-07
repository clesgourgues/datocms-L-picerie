export const getTotalItems = items => items.reduce((acc, current) => acc + current.quantity, 0);
