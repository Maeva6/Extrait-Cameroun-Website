// import { useState, useEffect, useRef } from 'react';
// import { Home, Package, ShoppingCart, Users, User, History, FileText, CreditCard, Settings, Cherry, Truck, Sigma, LogOut, Factory, PackagePlus } from 'lucide-react';
// import logoExtrait from '../Auth/assets/icons/logo.svg';
// import { Link, usePage, router } from '@inertiajs/react';

// const menuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} />, path: '/dashboard-admin' },
//   { id: 'commandes', label: 'Commandes', icon: <CreditCard size={18} />, path: '/commandes/admin' },
//   { id: 'produits', label: 'Produits', icon: <Package size={18} />, path: '/produits/admin' },
//   { id: 'Ingredient', label: 'Ingredients', icon: <Cherry size={18} />, path: '/ingredients/admin' },
//   { id: 'production-lab', label: 'Production', icon: <Factory size={18} />, path: '/productions/admin' },
//   { id: 'Fournisseur', label: 'Fournisseurs', icon: <Truck size={18} />, path: '/fournisseurs/admin' },
//   { id: 'Formule', label: 'Formules', icon: <Sigma size={18} />, path: '/formules/admin' },
//   { id: 'Reaprovisionnement', label: 'Réapprovision', icon: <PackagePlus size={18} />, path: '/reapprovisionnements/admin' },
//   { id: 'ventes', label: 'Ventes', icon: <ShoppingCart size={18} />, path: '/ventes/admin' },
//   { id: 'employe', label: 'Employés', icon: <Users size={18} />, path: '/employes/admin' },
//   { id: 'clients', label: 'Clients', icon: <User size={18} />, path: '/clients/admin' },
//   { id: 'Historique', label: 'Historique', icon: <History size={18} />, path: '/historique/admin' },
//   { id: 'rapports', label: 'Rapports', icon: <FileText size={18} />, path: '/rapport/admin' },
//   { id: 'acces-utilisateur', label: 'Accès utilisateur', icon: <Settings size={18} />, path: '/accesutilisateur/admin' },
// ];

// export default function Navbar() {
//   const { url, props } = usePage();
// const user = props?.user;
// // const userPermissions = user?.permissions || [];
// const isSuperAdmin = user?.role === 'superadmin';
// const userPermissions = isSuperAdmin ? menuItems.map(item => item.id) : (user?.permissions || []);
// // console.log("Permissions de l'utilisateur :", userPermissions);


//   console.log('Utilisateur connecté:', props.auth?.user);
//   console.log('props:', props);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
//   const [active, setActive] = useState('dashboard');
//   const navbarRef = useRef(null);
//   const touchStartY = useRef(0);
//   const scrollPosition = useRef(0);
//   const isTwoFingerScroll = useRef(false);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('authToken');
//     router.post('/logout');
//   };

//   useEffect(() => {
//     const matchingItem = menuItems.find(item => url.startsWith(item.path));
//     setActive(matchingItem?.id || 'dashboard');
//   }, [url]);

//   useEffect(() => {
//     let timeoutId = null;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         const newIsDesktop = window.innerWidth >= 1024;
//         setIsDesktop(newIsDesktop);
//         if (newIsDesktop && isOpen) setIsOpen(false);
//       }, 100);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     const navElement = navbarRef.current;
//     if (!navElement) return;

//     const handleWheel = (e) => {
//       if (isDesktop) {
//         e.preventDefault();
//         navElement.scrollBy({ top: e.deltaY * 0.5, behavior: 'smooth' });
//       }
//     };

//     const handleTouchStart = (e) => {
//       if (e.touches.length === 2) {
//         isTwoFingerScroll.current = true;
//         touchStartY.current = e.touches[0].clientY;
//         scrollPosition.current = navElement.scrollTop;
//       } else if (e.touches.length === 1) {
//         isTwoFingerScroll.current = false;
//       }
//     };

//     const handleTouchMove = (e) => {
//       if (!isDesktop) return;
//       if (isTwoFingerScroll.current && e.touches.length === 2) {
//         const y = e.touches[0].clientY;
//         const dy = touchStartY.current - y;
//         navElement.scrollTop = scrollPosition.current + (dy * 103);
//         e.preventDefault();
//       }
//     };

//     const handleTouchEnd = () => {
//       isTwoFingerScroll.current = false;
//     };

//     navElement.addEventListener('wheel', handleWheel, { passive: false });
//     navElement.addEventListener('touchstart', handleTouchStart, { passive: false });
//     navElement.addEventListener('touchmove', handleTouchMove, { passive: false });
//     navElement.addEventListener('touchend', handleTouchEnd);
//     navElement.addEventListener('touchcancel', handleTouchEnd);

//     return () => {
//       navElement.removeEventListener('wheel', handleWheel);
//       navElement.removeEventListener('touchstart', handleTouchStart);
//       navElement.removeEventListener('touchmove', handleTouchMove);
//       navElement.removeEventListener('touchend', handleTouchEnd);
//       navElement.removeEventListener('touchcancel', handleTouchEnd);
//     };
//   }, [isDesktop]);

//   const renderMenuContent = () => (
//     <div className="flex flex-col h-full">
//       <div className="sticky top-0 bg-black z-20">
//         <div className="flex items-center justify-between mb-2 pt-2 pb-2">
//           <div className="flex items-center">
//             <img 
//               src={logoExtrait} 
//               alt="Logo de l'application" 
//               className="w-10 h-10 mr-2 rounded-full" 
//             />
//             <span className="text-lg font-semibold">Admin Panel</span>
//           </div>
//           {!isDesktop && (
//             <button 
//               onClick={() => setIsOpen(false)} 
//               className="text-white text-xl focus:outline-none"
//               aria-label="Fermer le menu de navigation"
//             >
//               ✕
//             </button>
//           )}
//         </div>
//         <div className="h-1 bg-[#D4AF37] w-full rounded" />
//       </div>

//       <nav 
//         aria-label="Navigation principale" 
//         className="flex-1 overflow-y-auto pb-4 hide-scrollbar mt-2"
//         ref={navbarRef}
//         style={{ scrollbarWidth: 'none' }}
//       >
//         {/* <ul className="space-y-1 w-full">
//           {menuItems
//             // .filter(item => userPermissions.includes(item.id))
//             //superadmin accede a toutes les pages 
//             .filter(item => user?.role === 'superadmin' || userPermissions.includes(item.id))
//             .map((item) => (
//               <li key={item.id}>
//                 <Link
//                   href={item.path}
//                   onClick={() => !isDesktop && setIsOpen(false)}
//                   className={`flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all
//                     ${active === item.id ? 'bg-[#D4AF37] text-white font-semibold' : 'hover:bg-gray-800'}
//                   `}
//                   aria-current={active === item.id ? 'page' : undefined}
//                 >
//                   {item.icon}
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             ))} */}

//            <ul className="space-y-1 w-full">
//   {menuItems
//     .filter(item => props.auth?.user?.role === 'superadmin' || userPermissions.includes(item.id))
//     .map((item) => (
//       <li key={item.id}>
//         <Link
//           href={item.path}
//           onClick={() => !isDesktop && setIsOpen(false)}
//           className={`flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all
//             ${active === item.id ? 'bg-[#D4AF37] text-white font-semibold' : 'hover:bg-gray-800'}
//           `}
//           aria-current={active === item.id ? 'page' : undefined}
//         >
//           {item.icon}
//           <span>{item.label}</span>
//         </Link>
//       </li>
//     ))}

//           <li className="mt-4 border-t border-gray-700 pt-2">
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all hover:bg-red-900/50 text-red-400"
//             >
//               <LogOut size={18} />
//               <span>Déconnexion</span>
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );

//   return (
//     <>
//       {!isDesktop && !isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="lg:hidden fixed top-4 left-4 z-50 text-black p-2 bg-white rounded-md shadow-lg focus:outline-none"
//           aria-label="Ouvrir le menu de navigation"
//           aria-expanded={isOpen}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       )}

//       {isDesktop && (
//         <aside className="bg-black text-white h-screen w-56 p-4 shadow-md fixed left-0 top-0 z-40 flex flex-col">
//           {renderMenuContent()}
//         </aside>
//       )}

//       {!isDesktop && isOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           <div
//             className="fixed inset-0 bg-opacity-10"
//             onClick={() => setIsOpen(false)}
//             aria-hidden="true"
//           ></div>
//           <aside className="relative bg-black text-white w-72 h-screen p-4 shadow-md z-150 flex flex-col">
//             {renderMenuContent()}
//           </aside>
//         </div>
//       )}

//       <style>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { Home, Package, ShoppingCart, Users, User, History, FileText, CreditCard, Settings, Cherry, Truck, Sigma, LogOut, Factory, PackagePlus } from 'lucide-react';
import logoExtrait from '../Auth/assets/icons/logo.svg';
import { Link, usePage, router } from '@inertiajs/react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} />, path: '/dashboard-admin' },
  { id: 'commandes', label: 'Commandes', icon: <CreditCard size={18} />, path: '/commandes/admin' },
  { id: 'produits', label: 'Produits', icon: <Package size={18} />, path: '/produits/admin' },
  { id: 'Ingredient', label: 'Ingredients', icon: <Cherry size={18} />, path: '/ingredients/admin' },
  { id: 'production-lab', label: 'Production', icon: <Factory size={18} />, path: '/productions/admin' },
  { id: 'Fournisseur', label: 'Fournisseurs', icon: <Truck size={18} />, path: '/fournisseurs/admin' },
  { id: 'Formule', label: 'Formules', icon: <Sigma size={18} />, path: '/formules/admin' },
  { id: 'Reaprovisionnement', label: 'Réapprovision', icon: <PackagePlus size={18} />, path: '/reapprovisionnements/admin' },
  { id: 'ventes', label: 'Ventes', icon: <ShoppingCart size={18} />, path: '/ventes/admin' },
  { id: 'employe', label: 'Employés', icon: <Users size={18} />, path: '/employes/admin' },
  { id: 'clients', label: 'Clients', icon: <User size={18} />, path: '/clients/admin' },
  // { id: 'Historique', label: 'Historique', icon: <History size={18} />, path: '/historique/admin' },
  { id: 'rapports', label: 'Rapports', icon: <FileText size={18} />, path: '/rapport/admin' },
  { id: 'acces-utilisateur', label: 'Accès utilisateur', icon: <Settings size={18} />, path: '/accesutilisateur/admin' },
  {id: 'attribution',label: 'Attributions',icon: <User size={18} />,path: '/attribution/admin'},
];

export default function Navbar() {
  const { url, props } = usePage();
const user = props?.user;
// const userPermissions = user?.permissions || [];
const isSuperAdmin = user?.role === 'superadmin';
const userPermissions = isSuperAdmin ? menuItems.map(item => item.id) : (user?.permissions || []);
// console.log("Permissions de l'utilisateur :", userPermissions);


  console.log('Utilisateur connecté:', props.auth?.user);
  console.log('props:', props);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [active, setActive] = useState('dashboard');
  const navbarRef = useRef(null);
  const touchStartY = useRef(0);
  const scrollPosition = useRef(0);
  const isTwoFingerScroll = useRef(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    router.post('/logout');
  };

  useEffect(() => {
    const matchingItem = menuItems.find(item => url.startsWith(item.path));
    setActive(matchingItem?.id || 'dashboard');
  }, [url]);

  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newIsDesktop = window.innerWidth >= 1024;
        setIsDesktop(newIsDesktop);
        if (newIsDesktop && isOpen) setIsOpen(false);
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    const navElement = navbarRef.current;
    if (!navElement) return;

    const handleWheel = (e) => {
      if (isDesktop) {
        e.preventDefault();
        navElement.scrollBy({ top: e.deltaY * 0.5, behavior: 'smooth' });
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        isTwoFingerScroll.current = true;
        touchStartY.current = e.touches[0].clientY;
        scrollPosition.current = navElement.scrollTop;
      } else if (e.touches.length === 1) {
        isTwoFingerScroll.current = false;
      }
    };

    const handleTouchMove = (e) => {
      if (!isDesktop) return;
      if (isTwoFingerScroll.current && e.touches.length === 2) {
        const y = e.touches[0].clientY;
        const dy = touchStartY.current - y;
        navElement.scrollTop = scrollPosition.current + (dy * 103);
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      isTwoFingerScroll.current = false;
    };

    navElement.addEventListener('wheel', handleWheel, { passive: false });
    navElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    navElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    navElement.addEventListener('touchend', handleTouchEnd);
    navElement.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      navElement.removeEventListener('wheel', handleWheel);
      navElement.removeEventListener('touchstart', handleTouchStart);
      navElement.removeEventListener('touchmove', handleTouchMove);
      navElement.removeEventListener('touchend', handleTouchEnd);
      navElement.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDesktop]);

  const renderMenuContent = () => (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-black z-20">
        <div className="flex items-center justify-between mb-2 pt-2 pb-2">
          <div className="flex items-center">
            <img 
              src={logoExtrait} 
              alt="Logo de l'application" 
              className="w-10 h-10 mr-2 rounded-full" 
            />
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          {!isDesktop && (
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white text-xl focus:outline-none"
              aria-label="Fermer le menu de navigation"
            >
              ✕
            </button>
          )}
        </div>
        <div className="h-1 bg-[#D4AF37] w-full rounded" />
      </div>

      <nav 
        aria-label="Navigation principale" 
        className="flex-1 overflow-y-auto pb-4 hide-scrollbar mt-2"
        ref={navbarRef}
        style={{ scrollbarWidth: 'none' }}
      >
        {/* <ul className="space-y-1 w-full">
          {menuItems
            // .filter(item => userPermissions.includes(item.id))
            //superadmin accede a toutes les pages 
            .filter(item => user?.role === 'superadmin' || userPermissions.includes(item.id))
            .map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  onClick={() => !isDesktop && setIsOpen(false)}
                  className={`flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all
                    ${active === item.id ? 'bg-[#D4AF37] text-white font-semibold' : 'hover:bg-gray-800'}
                  `}
                  aria-current={active === item.id ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))} */}

           <ul className="space-y-1 w-full">
  {menuItems
    .filter(item => props.auth?.user?.role === 'superadmin' || userPermissions.includes(item.id))
    .map((item) => (
      <li key={item.id}>
        <Link
          href={item.path}
          onClick={() => !isDesktop && setIsOpen(false)}
          className={`flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all
            ${active === item.id ? 'bg-[#D4AF37] text-white font-semibold' : 'hover:bg-gray-800'}
          `}
          aria-current={active === item.id ? 'page' : undefined}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      </li>
    ))}

          <li className="mt-4 border-t border-gray-700 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded text-left gap-3 transition-all hover:bg-red-900/50 text-red-400"
            >
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {!isDesktop && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 text-black p-2 bg-white rounded-md shadow-lg focus:outline-none"
          aria-label="Ouvrir le menu de navigation"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {isDesktop && (
        <aside className="bg-black text-white h-screen w-56 p-4 shadow-md fixed left-0 top-0 z-40 flex flex-col">
          {renderMenuContent()}
        </aside>
      )}

      {!isDesktop && isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-opacity-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>
          <aside className="relative bg-black text-white w-72 h-screen p-4 shadow-md z-150 flex flex-col">
            {renderMenuContent()}
          </aside>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
