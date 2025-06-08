const ConfirmDialog = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 w-full h-full m-0 p-0">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <p className="mb-4">{message}</p>
          <div className="flex justify-end gap-4">
            <button 
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
            <button 
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmDialog;