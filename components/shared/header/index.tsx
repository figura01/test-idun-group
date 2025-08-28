import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import MainMenu from "./main-menu";

const Header = () => {
    return ( 
        <header className="w-full border-b">
            <div className="wrapper flex-between">
                <div className="flex-start items-center">
                    <Link href='/' className="flex-start ml-4">
                        <Image 
                            src='/images/logo.svg' 
                            alt={APP_NAME} 
                            width={48} 
                            height={48} 
                            priority={true}
                        />
                        <span className="hidden lg:block font-bold text-2xl ml-3">
                            {APP_NAME}
                        </span>
                    </Link>
                </div>
                <MainMenu />
            </div>
        </header>
    );
}

export default Header;