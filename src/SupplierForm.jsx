import logo from '../assets/Ellipse.svg';
import React, { useRef, useState } from "react";
import { ImageDownIcon, ImageUpIcon, Save, TestTubeIcon, UserIcon } from 'lucide-react';

const SupplierForm = () => {
    const [suppliername, setSupplierName] = useState("");
    const [supplieremail, setSupplierEmail] = useState("");
    const [prodimage, setProdImage] = useState("");
    const [supplierphone, setSupplierPhone] = useState("");
    const [supplieraddress, setSupplierAddress] = useState("");
    const [supplierid, setSupplierID] = useState("");
    const [supplierstatus, setSupplierStatus] = useState("");
    const [supplytype, setSupplyType] = useState("");
    const [suppliersite, setSupplierSite] = useState("");
    const [suppliernote, setSupplierNote] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file){
            setSupplierImage(file.name);
        }
    
    };

    const triggerFileInput = () =>{
        fileInputRef.current.click();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!suppliername || !supplieremail) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        console.log("SupplierName:", suppliername);
        console.log("SupplierEmail", supplieremail);
    };


    return(
        <div className="space-y-4 px-4 py-6 w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100">
                <form className="space-y-4 w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 overflow-hidden sm:scrollbar-thin sm:scrollbar-thumb-gray-400 sm:scrollbar-track-gray-100" onSubmit={handleSubmit}>
                    <header className="flex flex-col justify-center p-1 bg-white">
                        <img src={logo} alt="logo" className="h-16" />
                    </header>

                    <div className="mr-auto flex flex-row items-center gap-x-4 px-6">
                        <UserIcon className="h-4 w-4"/>
                        <p>Ajouter un Fournisseur</p>
                    </div>
                    <hr className="border-black -mx-4"></hr>
                    

                    <div className="flex flex-col px-12 space-y-4">
                        <label className="text-left font-semibold">Nom du Fournisseur</label>
                        <input
                            type="text" 
                            id="suppliername" 
                            value={suppliername}
                            onChange={(e) => setSupplierName(e.target.value)}
                            placeholder="Ajouter le nom du Fournisseur"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Adresse Mail du Fournisseur</label>
                        <input
                            type="text"
                            id="supplieremail"
                            value={supplieremail}
                            onChange={(e) => setSupplierEmail(e.target.value)}
                            placeholder="Ajouter l'email du fournisseur.."
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Numero du Fournisseur</label>
                        <input
                            type="number"
                            id="supplierphone"
                            value={supplierphone}
                            onChange={(e) => setSupplierPhone(e.target.value)}
                            placeholder="Ajouter le numero de telephone du fournisseur.."
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Adresse de la boutique du Fournisseur</label>
                        <input
                            type="text"
                            id="supplieraddress"
                            value={supplieraddress}
                            onChange={(e) => setSupplierAddress(e.target.value)}
                            placeholder="Ajouter l'adresse du fournisseur.."
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">ID du Fournisseur</label>
                        <input
                            type="text"
                            id="supplierid"
                            value={supplierid}
                            onChange={(e) => setSupplierID(e.target.value)}
                            placeholder="Ajouter l'identifiant unique du fournisseur.."
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Statut du Fournisseur</label>
                        <input
                            type="text"
                            id="supplierstatus"
                            value={supplierstatus}
                            onChange={(e) => setSupplierStatus(e.target.value)}
                            placeholder="Ajouter le statut du fournisseur"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="supplytype" className="text-left font-semibold">Categorie des produits vendus</label>
                        <select
                            required
                            id="supplytype"
                            value={supplytype}
                            onChange={(e) => setSupplyType(e.target.value)}
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        >
                            <option value ="parfum">Parfum</option>
                        </select>
                        <label className="text-left font-semibold">Site Web</label>
                        <input
                            type="text"
                            id="suppliersite"
                            value={suppliersite}
                            onChange={(e) => setSupplierSite(e.target.value)}
                            placeholder="Ajouter le site web du fournisseur"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Note</label>
                        <input
                            type="text"
                            id="suppliernote"
                            value={suppliernote}
                            onChange={(e) => setSupplierNote(e.target.value)}
                            placeholder="Ajouter une note quelconque sur le fournisseur"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Description</label>
                        <textarea
                            placeholder="Ajouter des informations parcticulieres sur le fournisseur"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Photo du Fournisseur</label>
                        <div className="items-center justify-center border border-yellow-400 rounded-md p-3 bg-yellow-50 text-gray-700">
                            <ImageUpIcon className="h-24 w-24"/>
                            {prodimage ?(
                                <p>Fichier Selectionne : <span className="font-medium">{prodimage}</span></p>
                            ):(
                                <p>
                                    Glissez deposer une image ici ou{' '}
                                    <button
                                        type="button"
                                        onClick={triggerFileInput}
                                        className="text-blue-600 underline hover hover:text-blue-800"
                                    >
                                         parcourir
                                    </button>{''}
                                </p>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        <div className="flex flex-row items-center gap-x-12">
                            <button type="button" className="mt-5 bg-gray-700 text-white py-2 rounded-md hover:bg-yellow-700 w-full">Annuler</button> 
                            <button type="submit" className="flex flex-row items-center gap-x-4 px-6 mt-5 bg-black text-white py-2 rounded-md hover:bg-yellow-700 w-full">
                                <Save className="h-4 w-4"/> 
                                <span>Enregister</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-6">By EXTRᗩITS Cameroun</p>
                </form>
        </div>

    );
}

export default SupplierForm;