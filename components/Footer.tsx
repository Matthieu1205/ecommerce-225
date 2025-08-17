"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo et description */}
          <div className="space-y-6">
            <h3 className="font-['Pacifico'] text-2xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Logo
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Votre destination premium pour l'élégance masculine et les
              produits de luxe d'exception.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-500 hover:to-green-600 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <i
                  className="ri-facebook-fill text-white transition-colors duration-300"
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-500 hover:to-green-600 rounded-full transition-all duration-300"
                aria-label="Twitter"
              >
                <i
                  className="ri-twitter-fill text-white transition-colors duration-300"
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-500 hover:to-green-600 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <i
                  className="ri-instagram-fill text-white transition-colors duration-300"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="font-bold text-white text-lg">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/vip"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Programme VIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Premium */}
          <div className="space-y-6">
            <h4 className="font-bold text-white text-lg">Service Premium</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/concierge"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Service Conciergerie
                </Link>
              </li>
              <li>
                <Link
                  href="/personal-shopper"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Personal Shopper
                </Link>
              </li>
              <li>
                <Link
                  href="/luxury-delivery"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Livraison Premium
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                >
                  Garantie Exclusive
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact VIP */}
          <div className="space-y-6">
            <h4 className="font-bold text-white text-lg">Contact VIP</h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3">
                <i className="ri-phone-fill text-green-400"></i>
                <a
                  href="tel:+225220005550"
                  className="hover:text-green-400 transition-colors"
                >
                  +225 22 20 00 55 50
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-mail-fill text-green-400"></i>
                <a
                  href="mailto:vip@logo.com"
                  className="hover:text-green-400 transition-colors"
                >
                  vip@logo.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-map-pin-fill text-green-400 mt-0.5"></i>
                <span>
                  123 Boulvard-latrille, Abidjan, Côte d'Ivoire.
                  <br />
                  75008 Abidjan, Côte d'Ivoire
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © 2024 logo. Collection Premium - Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-green-400 transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-green-400 transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-green-400 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
