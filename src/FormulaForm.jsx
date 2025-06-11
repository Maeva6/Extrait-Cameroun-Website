import React, { useState } from 'react';
import logo from '../assets/Ellipse.svg';
import { FunctionSquareIcon } from 'lucide-react';

export default function FormulaForm() {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);

    const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
    };

    const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
    };

    const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nom, ingredients, description });
    // Add save logic here (API/localStorage)
    };

    return (
        <div className="px-4 py-6 w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100">
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 overflow-hidden sm:scrollbar-thin sm:scrollbar-thumb-gray-400 sm:scrollbar-track-gray-100"
        >
           <header className="flex flex-col justify-center p-1 bg-white">
                <img src={logo} alt="logo" className="h-16" />
           </header>

            <div className="mr-auto flex flex-row items-center gap-x-4 px-6">
                <FunctionSquareIcon className="h-4 w-4"/>
                <p>Ajouter un Fournisseur</p>
            </div>
            <hr className="-mx-4 border-black "></hr>

            {/* Nom de la formule */}
            <div className="flex flex-col space-y-4 px-12">
                <label className="block text-gray-700 text-sm font-semibold mb-1">Nom de la formule *</label>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Ajouter le nom de la formule..."
                    required
                />
            

            {/* Ingrédients */}
                <label className="block text-gray-700 text-sm font-semibold mb-2">Liste des ingrédients *</label>
                {ingredients.map((ingredient, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                    <input
                        type="text"
                        placeholder={`Ingrédient ${index + 1}`}
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className="flex-grow border border-gray-300 rounded px-3 py-2 w-full"
                        required
                    />
                    <input
                        type="number"
                        placeholder=" "
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                        className="w-full sm:w-20 border border-gray-300 rounded px-3 py-2"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="text-red-500 hover:text-red-700 text-lg"
                    >
                    ✖
                    </button>
                    </div>
            ))}
                <button
                    type="button"
                    onClick={addIngredient}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                + Ajouter un ingrédient
                </button>

            {/* Description */}
                <label className="block text-gray-700 text-sm font-semibold mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={3}
                    placeholder="Ajouter des informations particulières sur la formule"
                />

            {/* Buttons */}
                <button
                    type="button"
                    className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                Annuler
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                Enregistrer
                </button>
            </div>

            <p className="text-xs text-center text-gray-400 mt-6">By EXTRᗩITS Cameroun</p>
        </form>
    </div>
);
}
