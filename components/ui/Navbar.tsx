import { Home, Phone, Info, FileText, Mail } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Phone, label: "Call+Sms Bomber", href: "/" },
    { icon: Info, label: "About Us", href: "/" },
    { icon: FileText, label: "Privacy Policy", href: "/" },
    { icon: FileText, label: "Terms of Use", href: "/" },
    { icon: Mail, label: "Contact Us", href: "/" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">SMS Bomber</div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;