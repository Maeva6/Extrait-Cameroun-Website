import { ImageUpIcon, Save, ShoppingBasket, ShoppingBasketIcon } from 'lucide-react';
import logo from '../assets/Ellipse.svg';
import React, { useRef,useState } from "react";

const IngredientForm = () => {
    const [ingredientname, setIngredientName] = useState("");
    const [ingredienttreshold, setIngredientTreshold] = useState("");
    const [ingredientimage, setIngredientImage] = useState("");
    const [ingredientsupplier, setIngredientSupplier] = useState("");
    const [ingredientprice, setIngredientPrice] = useState("");
    const [ingredienttype, setIngredientType] = useState("");
    const [ingredientdesc, setIngredientDesc] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file){
            setIngredientImage(file.name);
        }
    
    };

    const triggerFileInput = () =>{
        fileInputRef.current.click();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!ingredientname || !ingredienttreshold || ingredientsupplier ||ingredienttype || ingredientprice) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        console.log("IngredientName:", ingredientname);
        console.log("IngredientTreshold", ingredienttreshold);
        console.log("IngredientSupplier",ingredientsupplier);
    }
    
    return(
        <div className="px-4 py-6 w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100">
            <div className="py-4 w-full max-w-md flex flex-col justify-center items-center bg-white rounded-lg shadow-lg space-y-4">
                <header className="flex flex-col justify-center items-center p-1 bg-white">
                    <img src={logo} alt="logo" className="h-16" />
                </header>
                <form className="w-full space-y-4 flex flex-col items-start">
                    <div className="flex flex-row items-center gap-x-4 px-6">
                        <ShoppingBasket className="h-4 w-4"/>
                        <p>Ajouter un Ingredient</p>
                    </div>
                    <hr className="border-black w-full"></hr>
                    

                    <div className="flex flex-col px-12 space-y-4">
                        <label className="text-left font-semibold">Nom de L'Ingredient</label>
                        <input
                            type="text" 
                            id="ingredientname" 
                            value={ingredientname}
                            onChange={(e) => setIngredientName(e.target.value)}
                            placeholder="Ajouter le nom de l'ingredient.."
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Seuil de l'Ingredient</label>
                        <input
                            type="number"
                            id="ingredientthreshold"
                            min="1"
                            value={ingredienttreshold}
                            onChange={(e) => setIngredientTreshold(e.target.value)}
                            placeholder="Ajouter le nombre minimal a avoir en stock"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="ingredientsupplier" className="text-left font-semibold">Fournisseur de L'ingredient</label>
                        <select
                            required
                            id="ingredientsupplier"
                            value={ingredientsupplier}
                            onChange={(e) => setIngredientSupplier(e.target.value)}
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        >
                            <option value ="parfum">Papa Watcheu Watcheu</option>
                        </select>
                        <label className="text-left font-semibold">Prix de la L'ingredient</label>
                        <input
                            type="text"
                            id="ingredientprice"
                            value={ingredientprice}
                            onChange={(e) => setIngredientPrice(e.target.value)}
                            placeholder="Ajouter le prix relatif aux depenses pour cette production"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label htmlFor="ingredienttype" className="text-left font-semibold">Categorie</label>
                        <select
                            required
                            id="ingredienttype"
                            value={ingredienttype}
                            onChange={(e) => setIngredientType(e.target.value)}
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        >
                            <option value ="parfum">Parfum</option>
                        </select>
                        <label className="text-left font-semibold">Description</label>
                        <textarea
                            id="ingredientdesc"
                            value={ingredientdesc}
                            onChange={(e) => setIngredientDesc(e.target.value)}
                            placeholder="Ajouter des informations parcticulieres sur le fournisseur"
                            className="p-2 border rounded-md w-full placeholder-yellow-500"
                        />
                        <label className="text-left font-semibold">Photo de Production</label>
                        <div className="items-center justify-center border border-yellow-400 rounded-md p-3 bg-yellow-50 text-gray-700">
                            <ImageUpIcon className="h-24 w-24"/>
                            {ingredientimage ?(
                                <p>Fichier Selectionne : <span className="font-medium">{ingredientimage}</span></p>
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

                </form>
                
            </div>
        </div>

    );
}
export default IngredientForm;