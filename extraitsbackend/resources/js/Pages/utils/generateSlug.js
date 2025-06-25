// utils/generateSlug.js
const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD") // supprime les accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export function generateSlug(product, allProducts) {
  const baseSlug = normalize(product.name);
  const duplicates = allProducts.filter(
    (p) => normalize(p.name) === baseSlug && p !== product
  );

  if (duplicates.length > 0) {
    // Ajoute le type ou la catégorie si le nom est dupliqué
    const suffix = normalize(product.type || product.category || "");
    return `${baseSlug}-${suffix}`;
  }

  return baseSlug;
}
