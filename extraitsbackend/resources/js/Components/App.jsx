import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './reutilisable/navBar';

// Import Admin
import Dashboard from './pages/pageAdmin/dashboardAdmin';
import ProduitAdmin from './pages/pageAdmin/produitAdmin';
import VenteAdmin from './pages/pageAdmin/venteAdmin';
import Employe from './pages/pageAdmin/employe';
import ClientAdmin from './pages/pageAdmin/clientAdmin';
import HistoriqueAdmin from './pages/pageAdmin/historiqueAdmin';
import RapportVente from './pages/pageAdmin/rapportVente';
import ParametreAdmin from './pages/pageAdmin/parametreAdmin';
import RapportProduitAdmin from './pages/pageAdmin/rapportProduitAdmin';
import RapportClientAdmin from './pages/pageAdmin/rapportClienAdmin';
import RapportEmployeAdmin from './pages/pageAdmin/rapportEmployeAdmin';

// Import Formulaire
import FormulaireProduit from './Formulaire/formulaireProduit';
import FormulaireEmploye from './Formulaire/formulaireEmploye';
import FormulaireClient from './Formulaire/formulaireClient';
import FormulaireIngredient from './Formulaire/formulaireIngredient';
import FormulaireFournisseur from './Formulaire/formulaireFournisseur';
import FormulaireFormule from './Formulaire/formulaireFormule';
import FormulaireReapprovisionnementIngredient from './Formulaire/formulaireReapprovisionnementIngredient';
import FormulaireCommande from './Formulaire/formulaireCommande';
import FormulaireProduction from './Formulaire/formulaireProduction';


// Import laboratoire
import NavbarLaboratoir from './pages/pagesLab/navBarLab';
import IngredientLaboratoire from './pages/pagesLab/ingredientLab';
import ProduitLab from './pages/pagesLab/produitLab';
import FournisseurLab from './pages/pagesLab/fournisseurLab';
import FormuleLab from './pages/pagesLab/formuleLaboratoire';
import HistoriqueReapprovisionnementLab from './pages/pagesLab/historiqueReapprovisionnement';
import Login from '../components/reutilisable/page de connexion';
import ProductionLab from './pages/pagesLab/produitLab';

//Import vendeur
import CommandeVendeur from './pages/pagesVendeur/commandeVendeur';

function ProtectedRoutes({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Vérifie à la fois l'ancien token et le nouveau statut
        return localStorage.getItem('isAuthenticated') === 'true' || 
               localStorage.getItem('authToken') !== null;
      });
    
      useEffect(() => {
        const handleStorageChange = () => {
          setIsAuthenticated(
            localStorage.getItem('isAuthenticated') === 'true' || 
            localStorage.getItem('authToken') !== null
          );
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
      }, []);
      
  return (
    <Router>
      <div className="min-h-screen flex bg-white-100">
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Route publique */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            } 
          />

          {/* Routes protégées */}
          <Route
            path="/*"
            element={
              <ProtectedRoutes isAuthenticated={isAuthenticated}>
                <Routes>
                  <Route path="/" element={<ProduitAdmin />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/produits" element={<ProduitAdmin />} />
                  <Route path="/ventes" element={<VenteAdmin />} />
                  <Route path="/employes" element={<Employe />} />
                  <Route path="/clients" element={<ClientAdmin />} />
                  <Route path="/historique" element={<HistoriqueAdmin />} />
                  <Route path="/acces-utilisateur" element={<ParametreAdmin />} />
                  <Route path="/Production" element={<ProductionLab />} />
                  <Route path="/rapports/*" element={<RapportVente />} />
                  <Route path="/Rapport/Vente" element={<RapportVente />} />
                  <Route path="/Rapport/Produit" element={<RapportProduitAdmin />} />
                  <Route path="/Rapport/Client" element={<RapportClientAdmin />} />
                  <Route path="/Rapport/Employe" element={<RapportEmployeAdmin />} />
                  <Route path="/ajouter-produit" element={<FormulaireProduit />} />
                  <Route path="/ajouter-employe" element={<FormulaireEmploye />} />
                  <Route path="/ajouter-client" element={<FormulaireClient />} />
                  <Route path="/ajouter-production" element={<FormulaireProduction />} />
                  <Route path="/ingredients" element={<IngredientLaboratoire />} />
                  <Route path="/production" element={<ProduitLab />} />
                  <Route path="/fournisseurs" element={<FournisseurLab />} />
                  <Route path="/formules" element={<FormuleLab />} />
                  <Route path="/reapprovisionnement" element={<HistoriqueReapprovisionnementLab />} />
                  <Route path="/ajouter-ingredient" element={<FormulaireIngredient />} />
                  <Route path="/ajouter-fournisseur" element={<FormulaireFournisseur />} />
                  <Route path="/ajouter-formule" element={<FormulaireFormule />} />
                  <Route path="/ajouter-production" element={<FormulaireProduction />} />
                  <Route path="/reapprovisionner-ingredient" element={<FormulaireReapprovisionnementIngredient />} />
                  <Route path="/commandes" element={<CommandeVendeur />} />
                  <Route path="/ajouter-commande" element={<FormulaireCommande />} />
                  
                  {/* Route de fallback pour les routes inconnues */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}