import { APP_NAME } from "@/lib/constants";

const Footer = () => {
    return (
        <footer className="w-full border-t">
            <div className="wrapper flex-center py-4 ">
                <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.</p>
            </div>
        </footer>
    );
}
 
export default Footer;