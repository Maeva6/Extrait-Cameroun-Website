     import { FaFacebookF, FaInstagram,FaTwitter }  from 'react-icons/fa';
     {/* Footer */}
     export default function Footer() {
        return(
      <footer className="bg-black text-white py-6 text-sm px-4 mt-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h5 className="font-semibold mb-2">EXTRAITS</h5>
            <p>L'art du parfum camerounais,<br />une expérience sensorielle <br />unique.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Boutique</h5>
            <ul>
              <li>• Tous les parfums</li>
              <li>• Nouveautés</li>
              <li>• Best-sellers</li>
              <li>• Offres spéciales</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Aide</h5>
            <ul>
              <li>• Contactez-nous</li>
              <li>• Livraison & Retours</li>
              <li>• FAQ</li>
              <li>• Guide des parfums</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Légal</h5>
            <ul>
              <li>• Conditions d'utilisation</li>
              <li>• Politique de confidentialité</li>
              <li>• Cookies</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-white">
  <a href="https://www.facebook.com/EXTRAITS.CMR" target="_blank" rel="noopener noreferrer">
    <FaFacebookF className="w-5 h-5 hover:text-blue-500" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="w-5 h-5 hover:text-pink-500" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter className="w-5 h-5 hover:text-sky-400" />
  </a>
</div>
        <p className="text-center mt-6">© 2025 Extraits Cameroun. Tous droits réservés.</p>
      </footer>
    );
        }

// le footer doit être en bas de la page il doit y avoir d'espace entre entre le bas de l'écran et le footer