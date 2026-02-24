import { useState, useEffect } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

export default function DarkMode() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
      <div className="fixed bottom-6 right-6 z-[99998] flex justify-center">
        <button
          type="button"
          id="dark-mode-toggle"
          onClick={(e) => {
            if (e.detail === 0) return;
            setIsDark((prev) => !prev);
            e.currentTarget.blur();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
            }
          }}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`
          h-12 w-12 animate-bounce rounded-full
          flex items-center justify-center
          shadow-2xl border-2
          transition-colors duration-300
          ${
            isDark
              ? "bg-yellow-400 border-yellow-300 text-gray-900 shadow-yellow-400/50"
              : "bg-[#00728F] border-[#005f78] text-white shadow-[#00728F]/50"
          }
        `}
        >
          {isDark ? (
            <BsSunFill className="text-xl" />
          ) : (
            <BsMoonStarsFill className="text-xl" />
          )}
        </button>
      </div>
    );
}
