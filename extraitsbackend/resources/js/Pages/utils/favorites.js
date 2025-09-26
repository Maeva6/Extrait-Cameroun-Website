import { router } from "@inertiajs/react";

export const handleAddToFavorites = (item) => {
  const payload =
    item.type === "service"
      ? { service_id: item.id }
      : item.type === "accessoire"
      ? { accessoire_id: item.id }
      : { produit_id: item.id };

  router.post("/favorites", payload, {
    onSuccess: () => router.visit("/mes-favoris"),
    onError: () => alert("Erreur lors de l'ajout aux favoris"),
  });
};
 