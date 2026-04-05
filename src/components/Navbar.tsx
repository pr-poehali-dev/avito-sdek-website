import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "delivery" | "chat" | "profile";

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar = ({ activePage, onNavigate }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: { id: Page; label: string; icon: string }[] = [
    { id: "delivery", label: "Доставка и трекинг", icon: "Truck" },
    { id: "chat", label: "Центр помощи", icon: "MessageSquare" },
    { id: "profile", label: "Личный кабинет", icon: "User" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate("delivery")}>
            <div className="w-8 h-8 rounded bg-[hsl(var(--primary))] flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-wider">M</span>
            </div>
            <div>
              <span className="text-[hsl(var(--primary))] font-semibold text-lg tracking-tight">Meridian</span>
              <span className="hidden sm:inline text-[hsl(var(--gold))] text-xs font-medium ml-1.5 uppercase tracking-widest">Market</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
                  activePage === link.id
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
                }`}
              >
                <Icon name={link.icon} size={15} />
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="relative p-2 rounded hover:bg-[hsl(var(--secondary))] transition-colors text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
              <Icon name="Bell" size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] text-sm font-medium text-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] transition-colors">
              <Icon name="ShoppingCart" size={15} />
              Корзина
            </button>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded hover:bg-[hsl(var(--secondary))] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-medium transition-all ${
                  activePage === link.id
                    ? "bg-[hsl(var(--primary))] text-white"
                    : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
                }`}
              >
                <Icon name={link.icon} size={16} />
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
