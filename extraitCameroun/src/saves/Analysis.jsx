import { useEffect, useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';

const AnalysisPage = () => {
  const { selectedIngredients, selectedPerfumes, selectionType } = useQuiz();
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⏳ Simule une animation de 5 sec avant d'afficher le produit recommandé
    setTimeout(() => {
      // 🔎 Exemple très simple d'analyse
      if (selectionType === 'ingredient' && selectedIngredients.includes('cire de soja')) {
        setRecommendedProduct({
          name: 'Ambre Cire',
          image: 'https://example.com/ambre.jpg',
          rating: 5,
          family: 'Oriental boisé - Chaud et sensuel',
          description: 'Un parfum doux et chaleureux à base de cire naturelle...',
          ingredients: ['Cire de soja', 'Ambre', 'Santal'],
          price: '49.99 €'
        });
      } else {
        // Par défaut
        setRecommendedProduct({
          name: 'Essence Naturelle',
          image: 'https://example.com/nature.jpg',
          rating: 4,
          family: 'Floral frais - Léger et raffiné',
          description: 'Un mélange harmonieux de notes florales fraîches...',
          ingredients: ['Fleur de jasmin', 'Cire d’abeille'],
          price: '39.99 €'
        });
      }

      setLoading(false);
    }, 5000);
  }, [selectedIngredients, selectedPerfumes]);

  return (
    <div>
      {loading ? (
        <div className="animate-ingredients"> {/* ton animation d’ingrédients */} </div>
      ) : (
        <div className="result">
          {/* Affichage du produit recommandé */}
        </div>
      )}
    </div>
  );
};
