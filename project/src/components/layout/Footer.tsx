import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Copyright line */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-300">
            © Copyright SEDEQ 2025 | CEATyCC
          </p>
        </div>
        
        {/* Main content */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-blue-400">
            Comisión de Educación en Alta Tecnología y Cloud Computing
          </h2>
          
          <div className="text-sm space-y-2">
            <p className="font-medium">
              Av. Prof. Luis Pasteur 23, 76000
            </p>
            <p>
              Santiago de Querétaro, Querétaro 442-2385086. jequintana@queretaro.gob.mx
            </p>
          </div>
        </div>
        
        {/* Legal text */}
        <div className="mt-8 text-xs text-gray-400 text-center leading-relaxed">
          <p className="mb-2">
            Todos los logos y marcas registradas en este sitio son propiedad de sus respectivos propietarios. 
            La información aquí dispuesta puede ser modificada sin previo aviso. Este programa es público, 
            ajeno a cualquier partido político. Queda prohibido el uso para fines distintos a los establecidos en el programa.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;