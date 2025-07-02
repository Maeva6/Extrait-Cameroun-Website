import { useState } from 'react';
import { Search, Plus, X, ShoppingCart, CreditCard, Truck, Wallet } from 'lucide-react';
import { Link, usePage, router } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function Contact({clients = [],produits=[]}) {
    // États pour la commande
    const [commande, setCommande] = useState({
      clientId: '',
      methodePaiement: 'espèces',
      adresseLivraison: '',
      produits: [],
      notes: ''
    });
  
    // États pour l'interface
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [newProduit, setNewProduit] = useState({
      produitId: '',
      quantite: 1,
      prixUnitaire: 0
    });
    const [searchProduitTerm, setSearchProduitTerm] = useState('');
  
    // Filtrer les clients et produits
    const filteredClients = clients.filter(client =>
      client?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const filteredProduits = produits.filter(produit =>
      produit?.nomProduit?.toLowerCase().includes(searchProduitTerm.toLowerCase())
    );
  
    // Sélectionner un client
    const handleSelectClient = (client) => {
      setSelectedClient(client);
      setCommande(prev => ({
        ...prev,
        clientId: client.id,
        adresseLivraison: client.adresse || ''
      }));
      setSearchTerm('');
    };
  
    // Ajouter un produit à la commande
    const handleAddProduit = () => {
      if (!newProduit.produitId || newProduit.quantite <= 0) return;
  
      const produitSelectionne = produits.find(p => p.id === newProduit.produitId);
      if (!produitSelectionne) return;
  
      setCommande(prev => ({
        ...prev,
        produits: [
          ...prev.produits,
          {
            id: produitSelectionne.id, 
            nom: produitSelectionne.nomProduit,
            quantite: newProduit.quantite,
            prixUnitaire: Number(produitSelectionne.prixProduit),
            total: Number(newProduit.quantite) * (produitSelectionne.prixProduit)
          }
        ]
      }));
  
      setNewProduit({
        produitId: '',
        quantite: 1,
        prixUnitaire: 0
      });
      setSearchProduitTerm('');
    };
  
    // Supprimer un produit de la commande
    const handleRemoveProduit = (index) => {
      setCommande(prev => ({
        ...prev,
        produits: prev.produits.filter((_, i) => i !== index)
      }));
    };
  
    // Calculer le total de la commande
    const totalCommande = commande.produits.reduce((sum, item) => sum + (item.quantite * item.prixUnitaire), 0);
  console.log("Soumission en cours...");

    // Soumettre la commande
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedClient || commande.produits.length === 0) return;
  
      console.log('Commande soumise:', {
        ...commande,
        client: selectedClient,
        total: totalCommande,
        date: new Date().toISOString()
      });

// };
const payload = {
  items: commande.produits.map(p => ({
    id: p.id,
    quantite: p.quantite
  })),
  client_id: commande.clientId,
  total_price: totalCommande,
  payment_method: commande.methodePaiement,
  lastname: selectedClient.name,
  firstname: selectedClient.prenom || selectedClient.name || 'Client inconnu',
// lastname: selectedClient.name || '',
  city: commande.adresseLivraison.split(',')[0] || '',
  neighborhood: commande.adresseLivraison.split(',')[1] || '',
 phone: selectedClient.numero || selectedClient.telephone_client || 'Non fourni' // <- ajusté ici
};

  //   axios.post('/admin/commandes', payload,{
  //     onSuccess: () => {
  //   console.log('Commande envoyée avec succès');
  // },
  // onError: (errors) => {
  //   console.error('Erreur lors de la soumission de la commande', errors);
  // },
  //   }); 
  axios.post('/admin/commandes', payload)
  .then(response => {
    console.log('✅ Commande envoyée avec succès', response.data);
  })
  .catch(error => {
    if (error.response && error.response.status === 422) {
      console.error('❌ Erreurs de validation :', error.response.data.errors);
    } else {
      console.error('❌ Autre erreur :', error.message);
    }
  }); // Ici vous ajouterez la logique pour envoyer la commande à votre API
    };
  
    // Rediriger vers la page de création de client
    const handleCreateNewClient = () => {
      router.visit('/ajouter-client');
    };
  
    console.log('Clients:', clients);
console.log('Produits:', produits);

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg min-h-screen w-full lg:ml-[300px]">
    <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <ShoppingCart className="text-[#D4AF37]" /> Nouvelle commande
    </h1>

    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Client</h2>

      {!selectedClient ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rechercher un client
          </label>
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tapez le nom ou l'email du client..."
                className="flex-1 p-3 outline-none"
              />
              <span className="px-3 text-gray-400">
                <Search size={18} />
              </span>
            </div>

            {searchTerm && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredClients.length > 0 ? (
                  filteredClients.map(client => (
                    <div
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b"
                    >
                      <div className="font-medium">{client.nom}</div>
                      <div className="text-sm text-gray-600">{client.email}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">
                    Aucun client trouvé.
                    <button
                      onClick={handleCreateNewClient}
                      className="ml-2 text-[#D4AF37] hover:underline"
                    >
                      Créer un nouveau client
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{selectedClient.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedClient.email}</p>
              <p className="text-sm text-gray-600">{selectedClient.numero}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedClient(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              × Changer
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Produits de la commande */}
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Produits commandés</h2>

      <div className="space-y-4">
        {/* Ajout d'un nouveau produit */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="text"
                  value={searchProduitTerm}
                  onChange={(e) => setSearchProduitTerm(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="flex-1 p-2 outline-none"
                />
                <span className="px-3 text-gray-400">
                  <Search size={18} />
                </span>
              </div>

              {searchProduitTerm && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredProduits.length > 0 ? (
                    filteredProduits.map(produit => (
                      <div
                        key={produit.id}
                        onClick={() => {
                          setNewProduit({
                            produitId: produit.id,
                            quantite: 1,
                            prixUnitaire: produit.prixProduit
                          });
                          setSearchProduitTerm(produit.nomProduit);
                        }}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b"
                      >
                        <div className="font-medium">{produit.nomProduit}</div>
                        <div className="text-sm text-gray-600">Prix: {produit.prixProduit} FCFA</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500 ">Aucun produit trouvé</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
            <input
              type="number"
              min="1"
              value={newProduit.quantite}
              onChange={(e) => setNewProduit({
                ...newProduit,
                quantite: parseInt(e.target.value) || 1
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={handleAddProduit}
            disabled={!newProduit.produitId}
            className={`p-2 rounded-md flex items-center justify-center gap-1 ${!newProduit.produitId ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#D4AF37] text-white hover:bg-[#C4A235]'}`}
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>

        {/* Liste des produits ajoutés */}
        {commande.produits.length > 0 ? (
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Produit</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Prix unitaire</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantité</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {commande.produits.map((produit, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap">{produit.nom}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{produit.prixUnitaire} FCFA</td>
                    <td className="px-4 py-2 whitespace-nowrap">{produit.quantite}</td>
                    <td>{(produit.quantite * produit.prixUnitaire).toLocaleString()} FCFA</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => handleRemoveProduit(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 border border-gray-300 rounded-md">
            Aucun produit ajouté à la commande
          </div>
        )}
      </div>
    </div>

    {/* Informations supplémentaires */}
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Informations supplémentaires</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Méthode de paiement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="methodePaiement"
                value="espèces"
                checked={commande.methodePaiement === 'espèces'}
                onChange={() => setCommande({ ...commande, methodePaiement: 'espèces' })}
                className="text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <Wallet size={16} />
              <span>Espèces</span>
            </label>

            <label className="flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="methodePaiement"
                value="carte"
                checked={commande.methodePaiement === 'carte'}
                onChange={() => setCommande({ ...commande, methodePaiement: 'carte' })}
                className="text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <CreditCard size={16} />
              <span>Carte bancaire</span>
            </label>
          </div>
        </div>

        {/* Adresse de livraison */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse de livraison</label>
          <textarea
            value={commande.adresseLivraison}
            onChange={(e) => setCommande({ ...commande, adresseLivraison: e.target.value })}
            placeholder="Ville, quartier (ex: Douala, Bonapriso)"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optionnel)</label>
        <textarea
          value={commande.notes}
          onChange={(e) => setCommande({ ...commande, notes: e.target.value })}
          placeholder="Instructions spéciales, notes, etc..."
          rows="2"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    {/* Récapitulatif et soumission */}
    <div className="border-t pt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Total de la commande</h3>
        <div className="text-2xl font-bold text-[#D4AF37]">{totalCommande} FCFA</div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedClient || commande.produits.length === 0}
          className={`px-6 py-2 rounded-md flex items-center gap-2 ${!selectedClient || commande.produits.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D4AF37] text-white hover:bg-[#C4A235]'}`}
        >
          <Truck size={18} />
          Enregistrer la commande
        </button>
      </div>
    </div>
  </div>
  );
}