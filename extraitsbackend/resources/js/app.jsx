import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import App from './components/App';
import axios from 'axios';

// Configuration globale d'Axios
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob(['./Pages/**/*.jsx',
             './Components/**/*.jsx']),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// import '../css/app.css';
// import './bootstrap';

// import { createInertiaApp } from '@inertiajs/react';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import AppWrapper from './components/App'; // ⚠️ AppWrapper doit encapsuler ton layout global (cart, favoris, etc.)

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//   title: (title) => `${title} - ${appName}`,
//   resolve: (name) =>
//     resolvePageComponent(
//       `./Pages/${name}.jsx`,
//       import.meta.glob('./Pages/**/*.jsx')
//     ),
//   setup({ el, App, props }) {
//     const root = createRoot(el);

//     root.render(
//       <StrictMode>
//         <AppWrapper>
//           <App {...props} />
//         </AppWrapper>
//       </StrictMode>
//     );
//   },
//   progress: {
//     color: '#4B5563',
//   },
// });
