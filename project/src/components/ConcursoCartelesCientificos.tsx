import React, { useState } from 'react';
import { BookOpen, Users, ListChecks, Calendar, Camera, Trophy } from 'lucide-react';

const ConcursoCartelesCientificos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<string[]>([]); // Nuevo estado para las fotos

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5003/api/concurso-carteles-images', { // Ajusta la URL de tu backend
        method: 'POST',
        body: formData,
        // Si necesitas autenticación, añade los headers aquí
        // headers: {
        //   'Authorization': `Bearer ${yourAuthToken}`,
        // },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Imagen subida con éxito!');
      console.log('Respuesta del servidor:', result);
      setSelectedFile(null); // Limpiar el archivo seleccionado después de la subida
      fetchPhotos(); // Refrescar la lista de fotos después de subir una nueva
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen.');
    }
  };

  // Nueva función para obtener fotos
  const fetchPhotos = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/concurso-carteles-images'); // Ajusta la URL de tu backend
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPhotos(data.map((img: any) => img.url)); // Asume que el backend devuelve un array de objetos con una propiedad 'url'
      alert('Fotos cargadas!');
    } catch (error) {
      console.error('Error al obtener las fotos:', error);
      alert('Error al obtener las fotos.');
    }
  };

  // Secciones informativas
  const sections = [
    {
      title: 'Introducción',
      icon: BookOpen,
      content: <>
        El Concurso de Carteles Científicos está diseñado para estudiantes universitarios que desean comunicar sus proyectos de investigación de manera visual y efectiva. Su propósito es desarrollar habilidades para presentar información científica compleja de forma clara, concisa y atractiva.<br /><br />
        Este concurso ofrece un espacio donde los participantes pueden practicar la divulgación científica, aprender a diseñar carteles académicos y recibir retroalimentación de expertos en comunicación científica.<br /><br />
        Participar en este concurso no solo significa presentar tu investigación, sino también aprender a comunicarla efectivamente, desarrollar habilidades de diseño y mejorar tu capacidad para compartir conocimiento con diferentes audiencias.<br /><br />
        En esencia, es una oportunidad para hacer visible tu trabajo científico mientras aprendes a comunicarlo de manera profesional y accesible.<br />
      </>
    },
    {
      title: 'Bases, Requisitos, Evaluacion',
      icon: ListChecks,
      content: <>
        <br />
        El concurso se regirá por un conjunto de reglas diseñadas para garantizar una evaluación justa y objetiva. Se evaluará la claridad visual, la organización del contenido, el diseño del cartel y la capacidad de comunicación científica efectiva.
        <br /><br />
        <div className="text-center">
          <a
            href="/docs/33-Ponentes y Moderadores/Concurso de Programación Básico y Avanzado.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Ver/Download PDF
          </a>
        </div>
      </>
    },
    {
      title: 'Participantes',
      icon: Users,
      content: <span className="text-sm">
        Individual o en equipo (máximo 3 integrantes).<br /><br />
        Requisitos de participación:<br /><br />
        - Nombre de su universidad que representan.<br />
        - Programa académico al cual pertenecen.<br />
        - Cuatrimestre o semestre cursando actualmente.<br />
        - Matrícula o expediente.<br />
        - Nombre completo de los participantes.<br />
        - Correo institucional de cada integrante.<br />
        - Título del proyecto de investigación.<br /><br />
        <div className="text-center">
          <a
            href="https://forms.gle/Ze5jgKK9RrzEZFV67"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Inscribirse Ahora
          </a>
        </div>
      </span>
    },
    {
      title: 'Fechas Importantes',
      icon: Calendar,
      content: <>
        Periodo del 2° Foro 2026<br /><br />
        Fecha límite de inscripción: Domingo 15 de Marzo<br />
        Fecha de entrega de carteles: Miércoles 18 de Marzo<br />
        Fecha de exhibición: Jueves 19 de Marzo<br />
        Fecha de premiación: Viernes 20 de Marzo<br /><br />
        Lugar: Área de exposiciones, Bloque principal.<br />
        Hora exhibición: 10:00 hrs. - 18:00 hrs.<br />
        Hora premiación: 17:00 hrs.<br />
      </>
    },
    {
      title: 'Fotos de Edición',
      icon: Camera,
      content: <>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="mt-4 mr-2 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
        >
          Subir Foto
        </button>
        <button
          onClick={fetchPhotos}
          className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
        >
          Ver Fotos
        </button>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Foto ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
          ))}
        </div>
      </>
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight">
            Concurso de Carteles Científicos 2026
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Divulgación Científica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <div className="p-8">
                <div className="flex items-center">
                  <section.icon className="h-8 w-8 text-blue-500" />
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">{section.title}</h3>
                </div>
                <div className="mt-4 text-gray-600 leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcursoCartelesCientificos;