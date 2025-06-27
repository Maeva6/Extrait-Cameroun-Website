import React from 'react';

const NotificationsAdmin = ({ notifications, onMarkAllAsRead, onClose }) => {
  return (
    <div className="bg-white shadow-lg rounded-md w-80 border border-gray-200">
      {/* En-tête */}
      <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
        <button 
          onClick={onMarkAllAsRead}
          className="text-sm text-[#D4AF37] hover:underline"
        >
          marquer tout comme lu
        </button>
      </div>
      
      {/* Liste des notifications */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">Aucune notification</p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className="p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                  {notification.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Pied de page */}
      <div className="p-3 text-center border-t border-gray-200">
        <button 
          onClick={onClose}
          className="text-sm text-[#D4AF37] font-medium hover:underline"
        >
          voir toutes les notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsAdmin;