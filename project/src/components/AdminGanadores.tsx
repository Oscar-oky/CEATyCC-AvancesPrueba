import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Send, Plus, Trash2, Edit, X, Loader2, Upload, Eye } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';

interface Ganador {
  id: number;
  nombre: string;
  email: string;
  categoria: string;
  institucion: string;
  pdfUrl?: string;
  premio: string;
  recuadro: number;
  created_at?: string;
}

interface GanadorForm {
  id?: number;
  nombre: string;
  email: string;
  institucion: string;
  pdfUrl: string;
  lugar: string;
  premio: string;
  selectedFile: File | null;
}

interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  recuadrosConfig?: RecuadroConfig[]; // Nuevo campo para almacenar la configuración de recuadros
  created_at?: string;
}

const AdminGanadores: React.FC = () => {
  const { user, isAdmin, sendRegistrationLink, allUsers, token } = useAuth();

  // Estado para categorías
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [isModalCategoriaOpen, setIsModalCategoriaOpen] = useState(false);
  const [isEditingCategoria, setIsEditingCategoria] = useState(false);
  const [currentCategoriaId, setCurrentCategoriaId] = useState<number>(0);
  const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);

  // Estado para ganadores
  const [ganadores, setGanadores] = useState<Ganador[]>([]);
  const [ganadoresForm, setGanadoresForm] = useState<GanadorForm[]>([{
    nombre: '',
    email: '',
    institucion: '',
    pdfUrl: '',
    lugar: '',
    premio: '',
    selectedFile: null
  }]);
  // Estado para categoría única (todos los ganadores comparten esta categoría)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGanadorId, setCurrentGanadorId] = useState<number>(0);
  const [isLoadingGanadores, setIsLoadingGanadores] = useState(false);

  // Estado para configuración de recuadros
  interface RecuadroConfig {
    id: number;
    nombre: string;
  }
  const [recuadrosPorCategoria, setRecuadrosPorCategoria] = useState<Record<string, RecuadroConfig[]>>({});
  const [cantidadRecuadros, setCantidadRecuadros] = useState(1);
  const [categoriaRecuadros, setCategoriaRecuadros] = useState('');
  const [recuadrosTemp, setRecuadrosTemp] = useState<RecuadroConfig[]>([{ id: 1, nombre: '1.er lugar' }]);
  // Estado para selección de recuadro en cada ganador
  const [recuadroSeleccionado, setRecuadroSeleccionado] = useState<number[]>([1]);

  // Inicializar el hook useFileUpload
  const { uploadFiles, isUploading: isHookUploading } = useFileUpload();

  // URL base de la API (ajusta según tu configuración)
  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
  // URL base para archivos estáticos
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL || '';

  // Cargar categorías desde la API
  const fetchCategorias = async () => {
    setIsLoadingCategorias(true);
    try {
      const response = await fetch(`${API_BASE_URL}/reconocimientos/categorias`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener categorías');
      }
      const data: Categoria[] = await response.json();
      const recuadrosMap: Record<string, RecuadroConfig[]> = {};
      data.forEach(cat => {
        if (cat.recuadrosConfig) {
          recuadrosMap[cat.nombre] = cat.recuadrosConfig;
        }
      });
      setCategorias(data);
      setRecuadrosPorCategoria(recuadrosMap);
    } catch (error) {
      console.error('Error fetching categorias:', error);
      setMessage({ text: 'Error al cargar categorías', type: 'error' });
    } finally {
      setIsLoadingCategorias(false);
    }
  };

  // Cargar ganadores desde la API
  const fetchGanadores = async () => {
    setIsLoadingGanadores(true);
    try {
      const response = await fetch(`${API_BASE_URL}/reconocimientos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener ganadores');
      }
      const data = await response.json();
      setGanadores(data);
    } catch (error) {
      console.error('Error fetching ganadores:', error);
      setMessage({ text: 'Error al cargar ganadores', type: 'error' });
    } finally {
      setIsLoadingGanadores(false);
    }
  };

  // Cargar datos desde la API al montar el componente
  useEffect(() => {
    fetchCategorias();
    fetchGanadores();
  }, []);

  // Verificar si el usuario es admin
  if (!user || !isAdmin()) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
        <p className="text-gray-600">Solo los administradores pueden acceder a esta página.</p>
      </div>
    );
  }

  // Funciones para gestionar categorías
  const handleSubmitCategoria = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevaCategoria.trim()) {
      setMessage({ text: 'El nombre de la categoría es obligatorio', type: 'error' });
      return;
    }

    setIsLoadingCategorias(true);
    try {
      let response;
      if (isEditingCategoria) {
        // Editar categoría existente
        response = await fetch(`${API_BASE_URL}/reconocimientos/categorias/${currentCategoriaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: nuevaCategoria.trim(),
            descripcion: descripcionCategoria.trim(),
            recuadrosConfig: recuadrosTemp
          })
        });
      } else {
        // Agregar nueva categoría
        response = await fetch(`${API_BASE_URL}/reconocimientos/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: nuevaCategoria.trim(),
            descripcion: descripcionCategoria.trim(),
            recuadrosConfig: recuadrosTemp
          })
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar categoría');
      }

      // Recargar categorías desde la API
      await fetchCategorias();

      setMessage({
        text: isEditingCategoria ? 'Categoría actualizada con éxito' : 'Categoría agregada con éxito',
        type: 'success'
      });

      // Reiniciar formulario y cerrar modal
      setNuevaCategoria('');
      setDescripcionCategoria('');
      setIsEditingCategoria(false);
      setCurrentCategoriaId(0);
      setIsModalCategoriaOpen(false);
    } catch (error: any) {
      console.error('Error submitting categoria:', error);
      setMessage({ text: error.message || 'Error al guardar categoría', type: 'error' });
    } finally {
      setIsLoadingCategorias(false);
    }
  };

  const handleEditCategoria = (categoria: Categoria) => {
    setNuevaCategoria(categoria.nombre);
    setDescripcionCategoria(categoria.descripcion || '');
    setIsEditingCategoria(true);
    setCurrentCategoriaId(categoria.id);
    setIsModalCategoriaOpen(true);

    // Initialize recuadros configuration when editing a category
    setCategoriaRecuadros(categoria.nombre);
    const recuadrosExistentes = categoria.recuadrosConfig || [{ id: 1, nombre: '1.er lugar' }];
    setCantidadRecuadros(recuadrosExistentes.length);
    setRecuadrosTemp(recuadrosExistentes);
  };

  const handleDeleteCategoria = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reconocimientos/categorias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar categoría');
      }

      // Recargar categorías y ganadores desde la API
      await fetchCategorias();
      await fetchGanadores();

      setMessage({ text: 'Categoría eliminada con éxito', type: 'success' });
    } catch (error: any) {
      console.error('Error deleting categoria:', error);
      setMessage({ text: error.message || 'Error al eliminar categoría', type: 'error' });
    }
  };

  // Función para agregar o editar ganador
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que se haya seleccionado una categoría
    if (!categoriaSeleccionada) {
      setMessage({ text: 'Debe seleccionar una categoría para los ganadores', type: 'error' });
      return;
    }

    // Validar todos los ganadores en la lista
    console.log('=== Validando múltiples ganadores ===');

    for (let i = 0; i < ganadoresForm.length; i++) {
      const ganador = ganadoresForm[i];
      console.log(`=== Validando ganador ${i + 1} ===`);
      console.log('nombre:', ganador.nombre, 'trim:', ganador.nombre.trim() === '');
      console.log('email:', ganador.email, 'trim:', ganador.email.trim() === '');
      console.log('institucion:', ganador.institucion, 'trim:', ganador.institucion.trim() === '');
      console.log('lugar:', ganador.lugar, 'trim:', ganador.lugar.trim() === '');
      console.log('premio:', ganador.premio, 'trim:', ganador.premio.trim() === '');

      if (ganador.nombre.trim() === '' || ganador.email.trim() === '' || ganador.institucion.trim() === '' || ganador.lugar.trim() === '') {
        console.log('=== Validación fallida para ganador', i + 1, '===');
        setMessage({ text: `Todos los campos son obligatorios para el ganador ${i + 1}`, type: 'error' });
        return;
      }

      // Validar que haya un archivo seleccionado o una URL de PDF existente
      if (!ganador.pdfUrl && !ganador.selectedFile) {
        console.log('=== Validación fallida - PDF para ganador', i + 1, '===');
        setMessage({ text: `El ganador ${i + 1} debe subir un archivo PDF o seleccionar uno`, type: 'error' });
        return;
      }
    }

    setIsLoadingGanadores(true);
    try {
      // Copiar la lista de ganadores para modificarla durante la subida de archivos
      const ganadoresToSubmit = [...ganadoresForm];

      // Subir archivos para los ganadores que lo necesiten
      for (let i = 0; i < ganadoresToSubmit.length; i++) {
        const ganador = ganadoresToSubmit[i];

        if (ganador.selectedFile && !ganador.pdfUrl) {
          // Usar el hook useFileUpload para subir el PDF
          try {
            const uploadResult = await uploadFiles(null, ganador.selectedFile);
            if (uploadResult.documentUrls && uploadResult.documentUrls.length > 0) {
              ganadoresToSubmit[i] = {
                ...ganador,
                pdfUrl: uploadResult.documentUrls[0].url,
                selectedFile: null
              };
            } else {
              throw new Error('No se obtuvo URL de PDF después de la subida.');
            }
          } catch (error: any) {
            console.error('Error uploading file with useFileUpload:', error);
            setMessage({ text: error.message || `Error al subir archivo para el ganador ${i + 1}`, type: 'error' });
            return;
          }
        }
      }

      // Enviar cada ganador a la API
        for (let i = 0; i < ganadoresToSubmit.length; i++) {
          const ganador = ganadoresToSubmit[i];

          // Datos a enviar al servidor
          const ganadorData = {
            nombre: ganador.nombre,
            email: ganador.email,
            institucion: ganador.institucion,
            pdfUrl: ganador.pdfUrl,
            categoria: categoriaSeleccionada,
            // Usar lugar como premio para almacenar el nombre del recuadro
            premio: ganador.lugar,
            // El backend no almacena recuadro, pero lo enviamos por compatibilidad
            recuadro: recuadroSeleccionado[i] || 1
          };

          let url = `${API_BASE_URL}/reconocimientos`;
          let method = 'POST';

          if (isEditing && currentGanadorId) {
            url = `${API_BASE_URL}/reconocimientos/${currentGanadorId}`;
            method = 'PUT';
            // Asegurarse de que el ID del ganador se incluya en los datos para la actualización
            Object.assign(ganadorData, { id: currentGanadorId });
          }

          console.log(`=== Enviando datos al servidor para ganador ${i + 1} ===`);
          console.log('API_BASE_URL:', API_BASE_URL);
          console.log('URL:', url);
          console.log('Método:', method);
          console.log('Token presente:', !!token);
          console.log('Token:', token ? token.substring(0, 10) + '...' : 'No token');
          console.log('Datos:', ganadorData);
          console.log('Campo recuadro:', ganadorData.recuadro);
          console.log('Datos JSON:', JSON.stringify(ganadorData));

          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ganadorData)
          });

        if (!response.ok) {
          console.log('=== Error del servidor para ganador', i + 1, '===');
          console.log('Status:', response.status);
          console.log('StatusText:', response.statusText);
          console.log('Response Headers:', Object.fromEntries(response.headers));

          // Leer el cuerpo de la respuesta solo una vez
          const responseText = await response.text();
          console.log('Response Text:', responseText);

          try {
            // Intentar analizar como JSON
            const errorData = JSON.parse(responseText);
            console.log('Error Data:', errorData);
            console.log('Error Message:', errorData.message);
            console.log('Error Details:', errorData);
            throw new Error(errorData.message || `Error al guardar ganador ${i + 1}`);
          } catch (jsonError) {
            console.log('Error parsing JSON:', jsonError);
            throw new Error(`Error al guardar ganador ${i + 1}: ` + response.statusText + ' - ' + responseText);
          }
        }
      }

      // Recargar ganadores desde la API
      await fetchGanadores();

      setMessage({
        text: isEditing ? 'Ganador actualizado con éxito' : 'Ganadores agregados con éxito',
        type: 'success'
      });

      // Reiniciar formulario
      setGanadoresForm([{
        nombre: '',
        email: '',
        institucion: '',
        pdfUrl: '',
        lugar: '',
        premio: '',
        selectedFile: null
      }]);
      setCategoriaSeleccionada('');
      setIsEditing(false);
      setCurrentGanadorId(0);
    } catch (error: any) {
      console.error('=== Error completo ===', error);
      setMessage({ text: error.message || 'Error al guardar ganadores', type: 'error' });
    } finally {
      setIsLoadingGanadores(false);
    }
  };



  // Función para agregar un nuevo ganador a la lista
  const addGanador = () => {
    setGanadoresForm(prevGanadores => [...prevGanadores, {
      nombre: '',
      email: '',
      institucion: '',
      pdfUrl: '',
      lugar: '',
      premio: '',
      selectedFile: null
    }]);
    setRecuadroSeleccionado(prev => [...prev, 1]);
  };

  // Función para eliminar un ganador de la lista
  const removeGanador = (index: number) => {
    setGanadoresForm(prevGanadores => {
      if (prevGanadores.length <= 1) {
        setMessage({ text: 'Debe haber al menos un ganador', type: 'error' });
        return prevGanadores;
      }
      const updatedGanadores = prevGanadores.filter((_, i) => i !== index);
      return updatedGanadores;
    });
    setRecuadroSeleccionado(prev => {
      const updatedRecuadros = prev.filter((_, i) => i !== index);
      return updatedRecuadros;
    });
  };

  // Función para descargar y abrir PDF usando blob con autenticación
  const downloadAndOpenPdf = async (pdfUrl: string, fileName: string) => {
    try {
      // Opción 1: Intentar con un enlace de descarga directa
      // Crear un enlace temporal para descargar el PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      
      // Simular click en el enlace
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Si el navegador bloquea la apertura automática, mostrar mensaje al usuario
      setTimeout(() => {
        alert('El PDF debería abrirse en una nueva pestaña. Si no lo hace, por favor, verifique la configuración de su navegador para permitir pop-ups o haga clic derecho en el botón y seleccione "Abrir enlace en una nueva pestaña".');
      }, 1000);
      
    } catch (error) {
      console.error('Error al abrir PDF:', error);
      // Mostrar alerta al usuario con instrucciones alternativas
      alert('No se puede acceder al archivo PDF debido a un problema de permisos en el servidor. Por favor, contacte al administrador del servidor para que revise la configuración de acceso a los archivos PDF.');
    }
  };


  // Función para editar ganador
  const handleEdit = (ganador: Ganador) => {
    // Para edición, resetear la lista y colocar solo el ganador a editar
    setGanadoresForm([{
      nombre: ganador.nombre || ganador.name || '',
      email: ganador.email || '',
      institucion: ganador.institucion || ganador.institution || '',
      pdfUrl: ganador.pdfUrl || ganador.pdf_url || '',
      lugar: ganador.premio || '', // El campo 'premio' del ganador almacena el 'lugar' (nombre del recuadro)
      premio: ganador.premio || '', // Mantener el premio original si es necesario, o ajustar según la lógica
      selectedFile: null
    }]);
    setRecuadroSeleccionado([ganador.recuadro || 1]);
    setIsEditing(true);
    setCurrentGanadorId(ganador.id);

    // Cargar la categoría del ganador y su configuración de recuadros
    setCategoriaSeleccionada(ganador.categoria);
    setCategoriaRecuadros(ganador.categoria); // <-- Added this line
    const categoriaConfig = categorias.find(cat => cat.nombre === ganador.categoria);
    if (categoriaConfig && categoriaConfig.recuadrosConfig) {
      setRecuadrosTemp(categoriaConfig.recuadrosConfig);
      setCantidadRecuadros(categoriaConfig.recuadrosConfig.length);
    } else {
      // Si no hay configuración de recuadros para la categoría, establecer valores por defecto
      setRecuadrosTemp([{ id: 1, nombre: '1.er lugar' }]);
      setCantidadRecuadros(1);
    }
  }

  // Función para eliminar ganador
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reconocimientos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar ganador');
      }

      // Recargar ganadores desde la API
      await fetchGanadores();

      setMessage({ text: 'Ganador eliminado con éxito', type: 'success' });
    } catch (error: any) {
      console.error('Error deleting ganador:', error);
      setMessage({ text: error.message || 'Error al eliminar ganador', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gestión de Ganadores</h1>
      </div>

      {/* Mensaje de feedback */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* Gestión de Categorías */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Categorías de Reconocimientos</h2>
          <button
            onClick={() => {
              setIsEditingCategoria(false);
              setNuevaCategoria('');
              setDescripcionCategoria('');
              setIsModalCategoriaOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            Agregar Categoría
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Nombre</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Descripción</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.id} className="border-t">
                  <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium">{cat.nombre}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4">{cat.descripcion || 'Sin descripción'}</td>
                  <td className="py-2 px-3 sm:py-3 sm:px-4 flex flex-wrap gap-1 sm:gap-2">
                    <button
                      onClick={() => handleEditCategoria(cat)}
                      className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                    >
                      <Edit className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCategoria(cat.id)}
                      className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
                    >
                      <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuración de Recuadros por Categoría */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Configuración de Recuadros por Categoría
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Seleccione una categoría y configure cuántos recuadros desea tener para mostrar los ganadores.
        </p>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!categoriaRecuadros) {
            setMessage({ text: 'Debe seleccionar una categoría', type: 'error' });
            return;
          }
          if (recuadrosTemp.some(recuadro => !recuadro.nombre.trim())) {
            setMessage({ text: 'Todos los recuadros deben tener un nombre', type: 'error' });
            return;
          }
          setRecuadrosPorCategoria(prev => ({
            ...prev,
            [categoriaRecuadros]: recuadrosTemp
          }));
          setMessage({
            text: `Recuadros configurados para ${categoriaRecuadros}: ${recuadrosTemp.length}`,
            type: 'success'
          });
        }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={categoriaRecuadros}
                onChange={(e) => {
                  const categoria = e.target.value;
                  setCategoriaRecuadros(categoria);
                  const recuadrosExistentes = recuadrosPorCategoria[categoria] || [{ id: 1, nombre: '1.er lugar' }];
                  setCantidadRecuadros(recuadrosExistentes.length);
                  setRecuadrosTemp(recuadrosExistentes);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-gray-400"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad de Recuadros</label>
              <select
                value={cantidadRecuadros}
                onChange={(e) => {
                  const nuevaCantidad = parseInt(e.target.value);
                  setCantidadRecuadros(nuevaCantidad);

                  // Generar nuevos recuadros o eliminar excedentes
                  const nuevosRecuadros = [...recuadrosTemp];

                  if (nuevaCantidad > nuevosRecuadros.length) {
                    // Agregar nuevos recuadros
                    for (let i = nuevosRecuadros.length + 1; i <= nuevaCantidad; i++) {
                      nuevosRecuadros.push({
                        id: i,
                        nombre: `${i}${i === 1 ? 'er' : i === 2 ? 'do' : i === 3 ? 'er' : 'to'} lugar`
                      });
                    }
                  } else {
                    // Eliminar recuadros excedentes
                    nuevosRecuadros.splice(nuevaCantidad);
                  }

                  setRecuadrosTemp(nuevosRecuadros);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-gray-400"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? 'recuadro' : 'recuadros'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Campos para nombrar cada recuadro */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Nombres de los Recuadros</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recuadrosTemp.map((recuadro, index) => (
                <div key={recuadro.id} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 w-16">Recuadro {recuadro.id}:</span>
                  <input
                    type="text"
                    value={recuadro.nombre}
                    onChange={(e) => {
                      const updatedRecuadros = [...recuadrosTemp];
                      updatedRecuadros[index] = { ...updatedRecuadros[index], nombre: e.target.value };
                      setRecuadrosTemp(updatedRecuadros);
                    }}
                    placeholder={`Nombre del recuadro ${recuadro.id}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botón de guardar configuración */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>


      {/* Formulario para agregar/editar ganadores */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Agregar Nuevos Ganadores
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de categoría única para todos los ganadores */}
          <div className="bg-blue-50 p-4 sm:p-5 rounded-lg border border-blue-200">
            <h3 className="text-md sm:text-lg font-semibold text-blue-800 mb-3">
              Configuración de Categoría
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría para todos los ganadores</label>
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-blue-700">
                Todos los ganadores agregados se asociarán a la categoría seleccionada.
              </p>
            </div>
          </div>

          {/* Mapear la lista de ganadores */}
          {ganadoresForm.map((ganador, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-5 sm:p-6 border-2 border-gray-200 hover:border-blue-300 transition-all mb-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Ganador {index + 1}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => removeGanador(index)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={ganador.nombre}
                    onChange={(e) => {
                      setGanadoresForm(prevGanadores => {
                        const updatedGanadores = [...prevGanadores];
                        updatedGanadores[index] = { ...updatedGanadores[index], nombre: e.target.value };
                        return updatedGanadores;
                      });
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-gray-400"
                    placeholder="Nombre completo del ganador"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    value={ganador.email}
                    onChange={(e) => {
                      setGanadoresForm(prevGanadores => {
                        const updatedGanadores = [...prevGanadores];
                        updatedGanadores[index] = { ...updatedGanadores[index], email: e.target.value };
                        return updatedGanadores;
                      });
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-gray-400"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institución</label>
                  <input
                    type="text"
                    value={ganador.institucion}
                    onChange={(e) => {
                      setGanadoresForm(prevGanadores => {
                        const updatedGanadores = [...prevGanadores];
                        updatedGanadores[index] = { ...updatedGanadores[index], institucion: e.target.value };
                        return updatedGanadores;
                      });
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-gray-400"
                    placeholder="Institución o organización"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lugar</label>
                  <input
                    type="text"
                    value={ganador.lugar}
                    onChange={(e) => {
                      setGanadoresForm(prevGanadores => {
                        const updatedGanadores = [...prevGanadores];
                        updatedGanadores[index] = { ...updatedGanadores[index], lugar: e.target.value };
                        return updatedGanadores;
                      });
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-gray-400"
                    placeholder="Ej: Primer Premio, Segundo Premio, Tercer Premio"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recuadro</label>
                  <select
                    value={recuadroSeleccionado[index] || 1}
                    onChange={(e) => {
                      const recuadroId = parseInt(e.target.value);
                      const updatedRecuadros = [...recuadroSeleccionado];
                      updatedRecuadros[index] = recuadroId;
                      setRecuadroSeleccionado(updatedRecuadros);

                      // Autocompletar el campo Lugar con el nombre del recuadro
                      const recuadroSeleccionadoData = recuadrosPorCategoria[categoriaSeleccionada]?.find(r => r.id === recuadroId);
                      if (recuadroSeleccionadoData) {
                        setGanadoresForm(prevGanadores => {
                          const updatedGanadores = [...prevGanadores];
                          updatedGanadores[index] = { ...updatedGanadores[index], lugar: recuadroSeleccionadoData.nombre };
                          return updatedGanadores;
                        });
                      }
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-gray-400"
                    required
                  >
                    {recuadrosPorCategoria[categoriaSeleccionada]?.map((recuadro) => (
                      <option key={recuadro.id} value={recuadro.id}>
                        {recuadro.nombre}
                      </option>
                    )) || (
                        Array.from({ length: 5 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Recuadro {i + 1}
                          </option>
                        ))
                      )}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Archivo PDF de Reconocimiento</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    <div className="sm:col-span-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setGanadoresForm(prevGanadores => {
                            const updatedGanadores = [...prevGanadores];
                            updatedGanadores[index] = { ...updatedGanadores[index], selectedFile: file };
                            return updatedGanadores;
                          });
                        }}
                        className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all hover:border-blue-300 hover:bg-blue-50"
                      />
                      {ganador.selectedFile && (
                        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Archivo seleccionado:</strong> {ganador.selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Tamaño: {(ganador.selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                  {ganador.pdfUrl && (
                    <div className="mt-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                      <p className="text-sm text-gray-700 break-all">
                        <strong>PDF Subido:</strong> {ganador.pdfUrl.split('/').pop()}
                      </p>
                      <button
                        onClick={() => downloadAndOpenPdf(ganador.pdfUrl, ganador.pdfUrl.split('/').pop() || 'reconocimiento.pdf')}
                        className="text-sm text-blue-600 hover:underline mt-1 inline-block flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Ver archivo PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Botón para agregar otro ganador */}
          <div className="mt-6">
            <button
              type="button"
              onClick={addGanador}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              Agregar Otro Ganador
            </button>
          </div>

          {/* Botón para enviar el formulario */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg"
              disabled={isLoadingGanadores || isHookUploading}
            >
              {isLoadingGanadores ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                isEditing ? <><Edit className="w-5 h-5" /> Actualizar Ganador</> : <><Plus className="w-5 h-5" /> Agregar Ganadores</>
              )}
            </button>
          </div>
        </form>
      </div>


      {/* Lista de ganadores */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Lista de Ganadores</h2>
        {ganadores.length === 0 ? (
          <p className="text-gray-600 text-center py-6 sm:py-8">No hay ganadores registrados</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Recuadro</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Nombre</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Correo</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Institución</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Categoría</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ganadores.map((ganador) => (
                  <tr key={ganador.id} className="border-t">
                    <td className="py-2 px-3 sm:py-3 sm:px-4 font-medium">{ganador.premio}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4">{ganador.nombre}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 break-all">{ganador.email}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4">{ganador.institucion}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4">{ganador.categoria}</td>
                    <td className="py-2 px-3 sm:py-3 sm:px-4 flex flex-wrap gap-1 sm:gap-2">
                      <button
                        onClick={() => handleSendLink(ganador)}
                        className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
                      >
                        <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Enviar Enlace</span>
                      </button>
                      <button
                        onClick={() => handleEdit(ganador)}
                        className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                      >
                        <Edit className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(ganador.id)}
                        className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
                      >
                        <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para agregar/editar categoría */}
      {isModalCategoriaOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {isEditingCategoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                </h3>
                <button
                  onClick={() => setIsModalCategoriaOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmitCategoria}>
                <div className="mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Nombre de la categoría"
                    required
                  />
                </div>
                <div className="mb-4 sm:mb-6">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
                  <textarea
                    value={descripcionCategoria}
                    onChange={(e) => setDescripcionCategoria(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Descripción de la categoría"
                    rows={3}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalCategoriaOpen(false)}
                    className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    {isEditingCategoria ? 'Actualizar' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGanadores;