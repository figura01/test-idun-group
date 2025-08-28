"use client";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { redirect, RedirectType } from 'next/navigation'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={48}
        height={480}
        priority={true}
      />
      <div className="p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Page 404</h1>
        <p className="text-destructive">La page demandée est introuvable</p>
        <div className="flex justify-center gap-4 mt-6">
            <button
              className="btn rounded-full px-3 py-1 border border-gray-300 hover:cursor-pointer hover:text-white hover:bg-gray-800"
              onClick={() => redirect('/', RedirectType.push)}
            >
              Accueil
            </button>

            <button
              className="btn rounded-full px-3 py-1 border border-gray-300 hover:cursor-pointer hover:text-white hover:bg-gray-800"
              onClick={() => redirect('/produits', RedirectType.push)}
            >
              Catalogue
            </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
