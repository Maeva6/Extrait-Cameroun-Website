// App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navBar';
import Dashboard from './pages/pagesAdmin/dashboardAdmin';
import ProduitAdmin from './pages/pagesAdmin/produitAdmin';
import VenteAdmin from './pages/pagesAdmin/venteAdmin';
import Employe from './pages/pagesAdmin/employe';
import ClientAdmin from './pages/pagesAdmin/clientAdmin';
import HistoriqueAdmin from './pages/pagesAdmin/historiqueAdmin';
import RapportVente from './pages/pagesAdmin/rapportVente';
import RapportProduitAdmin from './pages/pagesAdmin/rapportProduitAdmin';
import RapportEmployeAdmin from './pages/pagesAdmin/rapportEmployeAdmin';
import RapportClientAdmin from './pages/pagesAdmin/rapportClienAdmin';
import NavbarVendeur from './pages/pagesVendeur/navBarVendeur';
import DashboardVendeur from './pages/pagesVendeur/dashboardVendeur';
import ProduitVendeur from './pages/pagesVendeur/produitVendeur';
import CommandeVendeur from './pages/pagesVendeur/commandeVendeur';
import ClientVendeur from './pages/pagesVendeur/clientVendeur';
import NavbarLaboratoir from './pages/pagesLab/navBarLab';
import IngredientLaboratoire from './pages/pagesLab/ingredientLab';
import ProduitLab from './pages/pagesLab/produitLab';
import FournisseurLab from './pages/pagesLab/fournisseurLab';
import FormuleLab from './pages/pagesLab/formuleLaboratoire';
import HistoriqueReapprovisionnementLab from './pages/pagesLab/historiqueReapprovisionnement';


export default function App() {
  const testRole ="laboratoire";

  return (
      <div className="min-h-screen flex bg-white-100">

    {testRole === "admin" && <Navbar />}
    {testRole === "vendeur" && <NavbarVendeur />}
    {testRole==="laboratoire" && <NavbarLaboratoir/>}
    
      <Routes>
        {testRole ==="admin" && (
          <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produits" element={<ProduitAdmin />} />
          <Route path='/ventes' element={<VenteAdmin/>}/>
          <Route path='/employes' element={<Employe/>}/>
          <Route path='/clients' element={<ClientAdmin/>}/>
          <Route path='/historique' element={<HistoriqueAdmin/>}/>
          <Route path='/rapports/*' element={<RapportVente/>}/>
          <Route path='/Rapport/Vente' element={<RapportVente/>}/>
          <Route path='/Rapport/Produit' element={<RapportProduitAdmin/>}/>
          <Route path='/Rapport/Client' element={<RapportClientAdmin/>}/>
          <Route path='/Rapport/Employe' element={<RapportEmployeAdmin/>}/>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}

        {testRole==="vendeur" && (
          <>
          <Route path='/vendeur/dashboard' element={<DashboardVendeur/>}/>
          <Route path='/vendeur/produits' element={<ProduitVendeur/>}/>
          <Route path='/vendeur/commandes' element={<CommandeVendeur/>}/>
          <Route path='/vendeur/clients' element={<ClientVendeur/>}/>
          </>
        )}

        {testRole==="laboratoire" && (
          <>
          <Route path='/laboratoire/ingredients' element={<IngredientLaboratoire/>}/>
          <Route path='/laboratoire/produits' element={<ProduitLab/>}/>
          <Route path='/laboratoire/fournisseurs' element={<FournisseurLab/>}/>
          <Route path='/laboratoire/formules' element={<FormuleLab/>}/>
          <Route path='/laboratoire/parametres' element={<HistoriqueReapprovisionnementLab/>}/>
          </>
        )}
          
        </Routes>
      </div>
  );
}
