import { FaFacebookF, FaInstagram, FaPhone, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Link } from '@inertiajs/react'; // ✅


export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 text-sm px-4 mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div>
          <h5 className="font-semibold mb-2">EXTRAITS</h5>
          <p>
            L'art du parfum camerounais,<br />
            une expérience sensorielle<br />
            unique.
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Boutique</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/body-perfume" className="hover:text-[#d4af37] transition-colors">• Tous les parfums</Link>
            </li>
            <li>
              <Link to="/nouveautes" className="hover:text-[#d4af37] transition-colors">• Nouveautés</Link>
            </li>
            <li>
              <Link to="/best-sellers" className="hover:text-[#d4af37] transition-colors">• Best-sellers</Link>
            </li>
            <li>
              <Link to="/offres-speciales" className="hover:text-[#d4af37] transition-colors">• Offres spéciales</Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Aide</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/contact" className="hover:text-[#d4af37] transition-colors">• Contactez-nous</Link>
            </li>
            <li>
              <Link to="/livraison-retours" className="hover:text-[#d4af37] transition-colors">• Livraison & Retours</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#d4af37] transition-colors">• FAQ</Link>
            </li>
            <li>
              <Link to="/guide-des-parfums" className="hover:text-[#d4af37] transition-colors">• Guide des parfums</Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2">Légal</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/conditions-utilisation" className="hover:text-[#d4af37] transition-colors">• Conditions d'utilisation</Link>
            </li>
            <li>
              <Link href="/politique-de-confidentialite" className="hover:text-[#d4af37] transition-colors">• Politique de confidentialité</Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-[#d4af37] transition-colors">• Cookies</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <a href="https://www.facebook.com/EXTRAITS.CMR" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="w-5 h-5 hover:text-blue-500" />
        </a>
        <a href="https://www.instagram.com/extraits_cmr?igsh=ZGtqNndxa2dqYzRt" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="w-5 h-5 hover:text-pink-500" />
        </a>
        {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="w-5 h-5 hover:text-sky-400 transition-colors" />
        </a> */}
        <a href="https://api.whatsapp.com/send/?phone=23799273209" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="w-5 h-5 hover:text-sky-400 transition-colors" />
        </a>
        <a href="tel:+237699273209" target="_blank" rel="noopener noreferrer">
  <FaPhone className="w-5 h-5 hover:text-yellow-600 transition-colors" />
</a>
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=extraits1104@gmail.com&su=Demande%20d'information&body=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20produits."
  target="_blank"
  rel="noopener noreferrer"
>
  <FaEnvelope className="w-5 h-5 hover:text-yellow-600 transition-colors" />
</a>

      </div>

      <p className="text-center mt-6">© 2025 Extraits Cameroun. Tous droits réservés.</p>
    </footer>
  );
}
