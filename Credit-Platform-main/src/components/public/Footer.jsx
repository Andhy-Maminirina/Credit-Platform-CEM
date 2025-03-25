"use client"

import { Link } from "react-router-dom"
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowUp } from "react-icons/fi"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Bouton retour en haut */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Retour en haut"
      >
        <FiArrowUp size={20} />
      </button>

      {/* Vague décorative */}
      <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: "60px" }}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: "#f9fafb", width: "100%", height: "60px" }}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      <div className="container pt-5xl pb-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
          <div>
            <div className="flex items-center mb-lg">
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
                <span className="text-primary-700 font-bold text-xl">CEM</span>
              </div>
              <span className="ml-sm text-xl font-semibold">Caisse d'Épargne</span>
            </div>
            <p className="text-gray-400 mb-xl">
              La Caisse d'Épargne de Madagascar vous accompagne dans tous vos projets de financement avec des solutions
              adaptées à vos besoins.
            </p>
            <div className="flex space-x-md">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-lg relative">
              Nos produits
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-600"></span>
            </h3>
            <ul className="space-y-md">
              <li>
                <Link
                  to="/credit-type/safidy"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  Crédit SAFIDY
                </Link>
              </li>
              <li>
                <Link
                  to="/credit-type/avotra"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  Crédits AVOTRA
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  Épargne
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  Assurances
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-lg relative">
              Liens utiles
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-600"></span>
            </h3>
            <ul className="space-y-md">
              <li>
                <Link
                  to="/credit-simulation"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  Simulateur de crédit
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>À propos de nous
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  Nos agences
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-sm"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-lg relative">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-600"></span>
            </h3>
            <ul className="space-y-md">
              <li className="flex items-start">
                <FiMapPin className="text-primary-500 mt-xs mr-sm flex-shrink-0" size={18} />
                <span className="text-gray-400">123 Avenue de l'Indépendance, Antananarivo 101, Madagascar</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-primary-500 mr-sm flex-shrink-0" size={18} />
                <span className="text-gray-400">+261 20 22 555 00</span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-primary-500 mr-sm flex-shrink-0" size={18} />
                <span className="text-gray-400">contact@cem.mg</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-lg">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-md md:mb-0">
              &copy; {new Date().getFullYear()} Caisse d'Épargne de Madagascar. Tous droits réservés.
            </p>
            <div className="flex space-x-xl">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

