"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"; 

const MainMenu = () => {
    const pathname = usePathname();
    
    return (
        <div className="flex justify-end gap-3">
            <nav className="flex w-full max-w-xs gap-1">
                <Link 
                    href="/produits" 
                    className={`link ${pathname === '/produits' ? 'active' : ''}`}
                >
                    Nos Produits</Link>
                <Link 
                    href="/favoris" 
                    className={`link ${pathname === '/favoris' ? 'active' : ''}`}   
                >
                    Mes Favoris 
                </Link>
            </nav>
        </div>
    );
}

export default MainMenu;