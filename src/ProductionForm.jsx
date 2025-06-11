import logo from '../assets/Ellipse.svg';
import React, { useRef, useState } from "react";
import { ImageDownIcon, ImageUpIcon, Save, TestTubeIcon } from 'lucide-react';

const ProductionForm = () => {
    const [prodname, setProdName] = useState("");
    const [prodtreshold, setProdTreshold] = useState("");
    const [prodimage, setProdImage] = useState("");
    const [prodstatus, setProdStatus] = useState("");
    const [prodprice, setProdPrice] = useState("");
    const [prodid, setProdID] = useState("");
    const [prodgoal, setProdGoal] = useState("");
    const [prodingredients, setProdIngredients] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file){
            setProdImage(file.name);
        }
    
    };

    const triggerFileInput = () =>{
        fileInputRef.current.click();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!prodname || !prodtreshold) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        console.log("ProdName:", prodname);
        console.log("ProdTreshold", prodtreshold)
    };


    return(
        <div className="px-4 py-6 w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100">
            <div className="py-4 w-full max-w-md flex flex-col justify-center items-center bg-white rounded-lg shadow-lg space-y-4">
                <header className="flex flex-col justify-center items-center p-1 bg-white">
                    <img src={logo} alt="logo" className="h-16" />
                </header>
                <form className="w-full space-y-4 flex flex-col " onSubmit={handleSubmit}>
                    <div className="flex flex-row items-center gap-x-4 px-6">
                        <TestTubeIcon className="h-4 w-4"/>
                        <p>Ajouter une Production</p>
                    </div>
                    <hr className="border-black w-full"></hr>
                    

                    <div className="flex flex-col px-12 space-y-4">
                        <label htmlFor="prodName" className="text-left font-semibold">Nom de la Production</label>
                        <input
                            type="text" 
                            id="prodName" 
                            value={prodname}
                            onChange={(e) => setProdName(e.target.value)}
                            placeholder="Ajouter le nom du Client"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="prodtreshold" className="text-left font-semibold">Seuil de la Production</label>
                        <input
                            type="number"
                            id="prodtreshold"
                            min="1"
                            value={prodtreshold}
                            onChange={(e) => setProdTreshold(e.target.value)}
                            placeholder="Ajouter le nombre maximal a ne pas depasser"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="prodstatus" className="text-left font-semibold">Statut de la Production</label>
                        <input
                            type="text"
                            id="prodstatus"
                            value={prodstatus}
                            onChange={(e) => setProdStatus(e.target.value)}
                            placeholder="Ajouter l'Etat de la production"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="prodprice" className="text-left font-semibold">Prix de la Production</label>
                        <input
                            type="text"
                            id="prodprice"
                            value={prodprice}
                            onChange={(e) => setProdPrice(e.target.value)}
                            placeholder="Ajouter le prix relatif aux depenses pour cette production"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="prodid" className="text-left font-semibold">ID de la Production</label>
                        <input
                            type="text"
                            id="prodid"
                            value={prodid}
                            onChange={(e) => setProdID(e.target.value)}
                            placeholder="Ajouter l'identifiant unique du client"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="prodgoal" className="text-left font-semibold">Objectif</label>
                        <input
                            type="number"
                            id="prodgoal"
                            min="1"
                            value={prodgoal}
                            onChange={(e) => setProdGoal(e.target.value)}
                            placeholder="Ajouter le nombre de produits a frabriquer"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="prodtype" className="text-left font-semibold">Categorie</label>
                        <select
                            required
                            id="prodtype"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        >
                            <option value ="parfum">Parfum</option>
                        </select>
                        <label htmlFor="" className="text-left font-semibold">Ingredients</label>
                        <textarea
                            id="prodingredients"
                            value={prodingredients}
                            onChange={(e) => setProdIngredients(e.target.value)}
                            placeholder="Ajouter des informations parcticulieres sur le fournisseur"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="prodimage" className="text-left font-semibold">Photo de Production</label>
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
                                id="prodimage"
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
        </div>

    );
}

export default ProductionForm;