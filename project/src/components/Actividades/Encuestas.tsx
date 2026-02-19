import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <ul className="flex space-x-6">
        {/* Otras secciones */}
        <li className="relative group">
          <span className="cursor-pointer">Actividades</span>
          <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded">
            <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              <a href="/reconocimientos">Reconocimientos</a>
            </li>
            <li className="p-2 hover:bg-gray-100 rounded">
              <a
                href="https://forms.gle/1FTQLYwxgCn1VHAr8"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                Encuestas
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
