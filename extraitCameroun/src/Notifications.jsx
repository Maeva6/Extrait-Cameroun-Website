import React, { useState, useRef, useEffect } from 'react';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'stock',
      title: 'Stock critique',
      message: "Il ne reste que 3 unités de 'Parfum Oud Royal'",
      time: 'Il y a 15 minutes',
      read: false,
    },
    {
      id: 2,
      type: 'order',
      title: 'Nouvelle commande',
      message: "Commande #1245 de 120€ par Sarah K.",
      time: 'Il y a 45 minutes',
      read: false,
    },
    {
      id: 3,
      type: 'client',
      title: 'Nouveau client',
      message: "Jean D. a créé un compte",
      time: 'Hier, 14:30',
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Icône cloche */}
      <button
        onClick={() => setVisible(!visible)}
        className="relative p-2"
        aria-label="Notifications"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popup */}
      {visible && (
        <div
          className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[95vw] bg-white border shadow-lg rounded-md z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-yellow-600 text-white px-4 py-2 rounded-t-md">
            <div className="font-semibold">Notification</div>
            <button onClick={markAllAsRead} className="text-sm underline hover:text-gray-200">
              marquer tout comme lu
            </button>
          </div>

          {/* Liste */}
          <div className="divide-y max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`p-3 text-sm cursor-pointer hover:bg-gray-50 ${
                  notif.read ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <div className="font-bold">{notif.title}</div>
                <div className="text-gray-700">{notif.message}</div>
                <div className="text-gray-500 text-xs mt-1">{notif.time}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-2 text-yellow-600 text-sm cursor-pointer hover:underline">
            voir toutes les notifications
          </div>
        </div>
      )}
    </div>
  );
}
