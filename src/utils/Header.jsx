import { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-scroll";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { title: "Home", to: "home" },
    { title: "About", to: "about" },
    { title: "Skills", to: "skills" },
    { title: "Projects", to: "projects" },
    { title: "Contact", to: "contact" },
  ];

  return (
    <header className="fixed top-4 left-0 w-full z-50">
      <div
        ref={headerRef}
        className="mx-auto max-w-[92%] md:max-w-5xl 
        backdrop-blur-xl bg-white/70 dark:bg-gray-900/80
        border border-white/30 dark:border-gray-700/40
        rounded-2xl shadow-lg transition-all duration-300"
      >
        <div className={`flex items-center px-6 ${scrolled ? "py-2" : "py-3"}`}>
          <Link
            to="home"
            smooth
            duration={500}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#00728F] text-white flex items-center justify-center font-bold">
              T
            </div>
            <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
              Tarun Kumar
            </span>
          </Link>

          <nav className="hidden lg:flex ml-auto space-x-8 text-gray-700 dark:text-gray-300">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                smooth
                spy
                offset={-80}
                duration={500}
                className="cursor-pointer font-medium hover:text-[#00728F] dark:hover:text-yellow-400 transition"
                activeClass="text-[#00728F] dark:text-yellow-400"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden ml-auto text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <RxCross2 className="text-red-500" />
            ) : (
              <GiHamburgerMenu className="text-[#00728F] dark:text-yellow-400" />
            )}
          </button>
        </div>

        {open && (
          <div className="lg:hidden px-6 pb-4 space-y-3 border-t dark:border-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                smooth
                offset={-80}
                duration={500}
                onClick={() => setOpen(false)}
                className="block cursor-pointer text-gray-700 dark:text-gray-300 font-medium hover:text-[#00728F] dark:hover:text-yellow-400"
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}