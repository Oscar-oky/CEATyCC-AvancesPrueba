import React, { useRef, useState } from 'react';
import { CalendarEvent } from '@/types';
import { Trash2, Video, Loader, CalendarDays, Clock, UploadCloud, Plus, X } from 'lucide-react';
import CategoryManager from './CategoryManager';
import { useEvents } from '@/hooks/useEvents';
import DocumentIcon from './DocumentIcon';

/**
 * @interface EventAdminViewProps
 * @description Propiedades para el componente de la vista de administrador del modal de eventos.
 */
interface EventAdminViewProps {
  formData: CalendarEvent;
  setFormData: React.Dispatch<React.SetStateAction<CalendarEvent>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleDelete: () => void;
  handleShowAdminQr: () => void; // Prop para el QR
  handleDeleteFile: (fileType: 'photos' | 'videos' | 'documents', url: string, folderId?: string) => void;
  isUploading: boolean;
  event: CalendarEvent | null;
  
  // Props para el manejo de archivos
  photoFiles: File[];
  setPhotoFiles: React.Dispatch<React.SetStateAction<File[]>>;
  photosWithFolder: Array<{ file: File; folderId: string | null }>;
  setPhotosWithFolder: React.Dispatch<React.SetStateAction<Array<{ file: File; folderId: string | null }>>>;
  videoFiles: File[];
  setVideoFiles: React.Dispatch<React.SetStateAction<File[]>>;
  mainPhotoFile: File | null;
  setMainPhotoFile: React.Dispatch<React.SetStateAction<File | null>>;
  documentFiles: File[];
  setDocumentFiles: React.Dispatch<React.SetStateAction<File[]>>;

  // Handlers de Drag & Drop y cambios de input
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handlePhotoFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveNewPhoto: (index: number) => void;
  isDragging: boolean;

  handleVideoDragOver: (e: React.DragEvent) => void;
  handleVideoDragLeave: (e: React.DragEvent) => void;
  handleVideoDrop: (e: React.DragEvent) => void;
  handleVideoFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveNewVideo: (index: number) => void;
  isVideoDragging: boolean;

  handleMainPhotoDragOver: (e: React.DragEvent) => void;
  handleMainPhotoDragLeave: (e: React.DragEvent) => void;
  handleMainPhotoDrop: (e: React.DragEvent) => void;
  handleMainPhotoFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMainPhotoDragging: boolean;

  handleDocumentDragOver: (e: React.DragEvent) => void;
  handleDocumentDragLeave: (e: React.DragEvent) => void;
  handleDocumentDrop: (e: React.DragEvent) => void;
  handleDocumentFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveNewDocument: (index: number) => void;
  isDocumentDragging: boolean;

  // Handlers generales y de fecha/hora
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (index: number, field: 'startTime' | 'endTime', value: string) => void;
  addTimeSlot: () => void;
  removeTimeSlot: (index: number) => void;
  memoizedDateString: string;
  categoryDisplayValue: string;
  
  // Estado para gestión de carpetas de fotos
  selectedFolderId: string | null;
  setSelectedFolderId: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * Componente `EventAdminView`
 * 
 * Renderiza el formulario para crear o editar un evento.
 * Esta vista es exclusiva para los administradores.
 */
const EventAdminView: React.FC<EventAdminViewProps> = ({
  formData,
  setFormData,
  handleSubmit,
  handleDelete,
  handleShowAdminQr,
  handleDeleteFile,
  isUploading,
  event,
  photoFiles,
  setPhotoFiles,
  photosWithFolder,
  setPhotosWithFolder,
  videoFiles,
  setVideoFiles,
  mainPhotoFile,
  setMainPhotoFile,
  documentFiles,
  setDocumentFiles,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handlePhotoFileChange,
  handleRemoveNewPhoto,
  isDragging,
  handleVideoDragOver,
  handleVideoDragLeave,
  handleVideoDrop,
  handleVideoFileChange,
  handleRemoveNewVideo,
  isVideoDragging,
  handleMainPhotoDragOver,
  handleMainPhotoDragLeave,
  handleMainPhotoDrop,
  handleMainPhotoFileChange,
  isMainPhotoDragging,
  handleDocumentDragOver,
  handleDocumentDragLeave,
  handleDocumentDrop,
  handleDocumentFileChange,
  handleRemoveNewDocument,
  isDocumentDragging,
  handleChange,
  handleDateChange,
  handleTimeChange,
  addTimeSlot,
  removeTimeSlot,
memoizedDateString,
  categoryDisplayValue,
  selectedFolderId,
  setSelectedFolderId,
}) => {
  const { categories, addCategory, deleteCategory } = useEvents();
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const mainPhotoFileInputRef = useRef<HTMLInputElement>(null);
  const documentFileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para gestión de carpetas de fotos
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');

  return (
    <>
      <h2 className="text-2xl font-bold text-red-800 mb-4">{event ? 'Editar Evento' : 'Agregar Nuevo Evento'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6 bg-white rounded-lg shadow-md max-w-full md:max-w-2xl mx-auto">
        {/* Título */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>

        {/* Fecha */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Fecha:</label>
          <div className="relative group">
            <button type="button" onClick={() => document.getElementById('date')?.showPicker()} className="w-full flex items-center justify-between shadow border rounded py-2 px-3 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Seleccionar fecha del evento">
              <span className="flex-1">{memoizedDateString || 'Seleccionar fecha'}</span>
              <CalendarDays className="h-5 w-5 text-gray-400" />
            </button>
            <input type="date" id="date" name="date" value={memoizedDateString} onChange={handleDateChange} className="sr-only" required />
          </div>
        </div>

        {/* Fecha de Publicación */}
        <div className="mb-4">
          <label htmlFor="publicationDate" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Publicación (Opcional):</label>
          <div className="relative group">
            <button type="button" onClick={() => document.getElementById('publicationDate')?.showPicker()} className="w-full flex items-center justify-between shadow border rounded py-2 px-3 text-gray-700 hover:bg-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Seleccionar fecha de publicación">
              <span className="flex-1">{formData.publicationDate ? new Date(formData.publicationDate).toLocaleDateString('es-ES') : 'Seleccionar fecha de publicación'}</span>
              <CalendarDays className="h-5 w-5 text-gray-400" />
            </button>
            <input type="date" id="publicationDate" name="publicationDate" value={formData.publicationDate ? new Date(formData.publicationDate).toISOString().split('T')[0] : ''} onChange={handleChange} className="sr-only" />
          </div>
        </div>

        {/* Horarios */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Horarios:</label>
          {(Array.isArray(formData.times) ? formData.times : [formData.times || { startTime: '09:00', endTime: '17:00' }])?.map((time, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-end mb-3">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Hora de inicio {index + 1}:</label>
                <div className="relative group">
                  <button 
                    type="button" 
                    onClick={() => document.getElementById(`startTime-${index}`)?.showPicker()} 
                    className="w-full flex items-center justify-between shadow border rounded py-2 px-3 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Seleccionar hora de inicio ${index + 1}`}
                  >
                    <span className="flex-1">{time.startTime || 'Seleccionar hora'}</span>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </button>
                  <input 
                    type="time" 
                    id={`startTime-${index}`} 
                    name={`startTime-${index}`} 
                    value={time.startTime} 
                    onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)} 
                    className="sr-only" 
                    required 
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 text-xs font-semibold mb-1">Hora de fin {index + 1}:</label>
                <div className="relative group">
                  <button 
                    type="button" 
                    onClick={() => document.getElementById(`endTime-${index}`)?.showPicker()} 
                    className="w-full flex items-center justify-between shadow border rounded py-2 px-3 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Seleccionar hora de fin ${index + 1}`}
                  >
                    <span className="flex-1">{time.endTime || 'Seleccionar hora'}</span>
                    <Clock className="h-5 w-5 text-gray-400" />
                  </button>
                  <input 
                    type="time" 
                    id={`endTime-${index}`} 
                    name={`endTime-${index}`} 
                    value={time.endTime} 
                    onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)} 
                    className="sr-only" 
                    required 
                  />
                </div>
              </div>
              {formData.times.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeTimeSlot(index)} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded text-sm"
                  title="Eliminar horario"
                  aria-label="Eliminar horario"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            onClick={addTimeSlot} 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center gap-2"
            aria-label="Agregar otro horario"
          >
            <Plus size={16} />
            Agregar otro horario
          </button>
        </div>

        {/* Ubicación */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Nombre de Ubicación:</label>
          <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <label htmlFor="locationLink" className="block text-gray-700 text-sm font-bold mb-2">Link de Google Maps:</label>
          <input type="text" id="locationLink" name="locationLink" value={formData.locationLink || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" placeholder="https://maps.app.goo.gl/..." />
        </div>

        {/* Capacidad y Costo */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="capacidad_maxima" className="block text-gray-700 text-sm font-bold mb-2">Capacidad del Evento:</label>
            <input type="number" id="capacidad_maxima" name="capacidad_maxima" value={formData.capacidad_maxima || ''} onChange={handleChange} placeholder="Ej: 100 (vacío si no hay límite)" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de Costo:</label>
            <div className="flex rounded-lg border p-1 bg-gray-100 mb-2">
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, costo: 0 }))} className={`w-1/2 py-1 rounded-md text-sm font-semibold transition-colors ${formData.costo === 0 ? 'bg-white shadow text-blue-600' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}>
                Gratis
              </button>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, costo: prev.costo === 0 ? undefined : prev.costo }))} className={`w-1/2 py-1 rounded-md text-sm font-semibold transition-colors ${formData.costo !== 0 ? 'bg-white shadow text-blue-600' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}>
                De pago
              </button>
            </div>
            {formData.costo !== 0 && (
              <input type="number" id="costo" name="costo" value={formData.costo ?? ''} onChange={handleChange} placeholder="Ingrese el precio" min="0" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-2" />
            )}
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
          <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"></textarea>
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold">Categoría:</label>
            <button type="button" onClick={() => setShowCategoryManager(!showCategoryManager)} className="text-sm text-blue-600 hover:underline">
              {showCategoryManager ? 'Ocultar gestor' : 'Gestionar categorías'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              list="category-suggestions"
              id="category-input"
              name="category"
              value={categoryDisplayValue}
              onChange={(e) => {
                const label = e.target.value;
                const selectedCat = categories.find(c => c.label === label);
                if (selectedCat) {
                  setFormData(prev => ({ ...prev, category: selectedCat.category, color: selectedCat.color }));
                } else {
                  setFormData(prev => ({ ...prev, category: label, color: '#f0ad4e' })); // Default color if no match
                }
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
            <datalist id="category-suggestions">
              {categories.map(item => <option key={item.category} value={item.label} />)}
            </datalist>
          </div>
          {showCategoryManager && (
            <div className="mt-4">
              <CategoryManager
                categories={categories}
                onDelete={deleteCategory}
                onAdd={addCategory}
                onSelect={(categorySlug) => {
                  const selectedCat = categories.find(c => c.category === categorySlug);
                  if (selectedCat) {
                    setFormData(prev => ({ ...prev, category: selectedCat.category, color: selectedCat.color }));
                  }
                  setShowCategoryManager(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Sección de Imagen Principal */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Imagen Principal (única):</label>
          <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
            <input type="file" id="mainPhoto" name="mainPhoto" accept="image/*" onChange={handleMainPhotoFileChange} className="hidden" ref={mainPhotoFileInputRef} />
            {formData.mainPhoto || mainPhotoFile ? (
              <div className="mb-2">
                <img src={mainPhotoFile ? URL.createObjectURL(mainPhotoFile) : formData.mainPhoto} alt="Imagen Principal" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                <div className="flex gap-2 justify-center mt-2">
                  <button type="button" onClick={() => mainPhotoFileInputRef.current?.click()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm" aria-label="Cambiar imagen principal">Cambiar Imagen</button>
                  <button type="button" onClick={() => { setFormData(prev => ({ ...prev, mainPhoto: '' })); setMainPhotoFile(null); }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm" aria-label="Eliminar imagen principal">Eliminar Imagen Principal</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                <UploadCloud size={32} />
                <p className="mb-2">Arrastra y suelta una imagen principal aquí, o</p>
                <button type="button" onClick={() => mainPhotoFileInputRef.current?.click()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" aria-label="Seleccionar imagen principal">Seleccionar Imagen Principal</button>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Fotos Adicionales con Carpetas */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Fotos Adicionales:</label>
          
          {/* Crear nueva carpeta */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Nombre de la carpeta" 
              value={newFolderName} 
              onChange={(e) => setNewFolderName(e.target.value)} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
            <button 
              type="button" 
              onClick={() => {
                if (newFolderName.trim()) {
                  setFormData(prev => ({
                    ...prev,
                    photoFolders: [...(prev.photoFolders || []), {
                      id: `folder-${Date.now()}`,
                      name: newFolderName.trim(),
                      photos: []
                    }]
                  }));
                  setNewFolderName('');
                }
              }} 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              aria-label="Crear nueva carpeta de fotos"
            >
              Crear Carpeta
            </button>
          </div>
          
          {/* Selección de carpeta para nuevas fotos */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <label className="block text-gray-700 text-sm font-medium">Carpeta de destino:</label>
              <select 
                value={selectedFolderId || ''}
                onChange={(e) => setSelectedFolderId(e.target.value || null)}
                className="shadow appearance-none border rounded py-1.5 px-3 text-gray-700 w-full sm:flex-1"
              >
                <option value="">📁 Fotos Generales (Raíz)</option>
                {formData.photoFolders?.map((folder) => (
                  <option key={folder.id} value={folder.id}>📁 {folder.name}</option>
                ))}
              </select>
              <button 
                type="button" 
                onClick={() => photoFileInputRef.current?.click()} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded text-sm whitespace-nowrap w-full sm:w-auto"
              >
                + Agregar Fotos
              </button>
            </div>
          </div>
          
          {/* Fotos nuevas pendientes de subir */}
          {photoFiles.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-md font-semibold text-blue-800 flex items-center gap-2">
                  <span>🖼️ Fotos Pendientes</span>
                  <span className="text-sm bg-blue-600 text-white px-2 py-0.5 rounded-full">{photoFiles.length}</span>
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {photoFiles.map((file, index) => (
                  <div key={`new-photo-${index}`} className="relative group">
                    <img src={URL.createObjectURL(file)} alt={`new-photo-${index}`} className="w-full h-24 object-cover rounded-lg shadow-sm" />
                    <button type="button" onClick={() => handleRemoveNewPhoto(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                <span>📌</span>
                Estas fotos se agregarán a: <strong>{selectedFolderId ? formData.photoFolders?.find(f => f.id === selectedFolderId)?.name || 'Carpeta no encontrada' : 'Fotos Generales'}</strong>
              </p>
            </div>
          )}
          
          {/* Lista de carpetas */}
          <div className="space-y-4">
            {/* Fotos sin carpeta (raíz) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-md font-semibold text-gray-700">Fotos Generales</h4>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {formData.photos?.map((url, index) => (
                  <div key={`existing-photo-${index}`} className="relative group">
                    <img src={url} alt={`photo-${index}`} className="w-full h-24 object-cover rounded-lg" />
                    <button type="button" onClick={() => handleDeleteFile('photos', url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carpetas existentes */}
            {formData.photoFolders?.map((folder) => (
              <div key={folder.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  {editingFolderId === folder.id ? (
                    <div className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        value={editingFolderName} 
                        onChange={(e) => setEditingFolderName(e.target.value)} 
                        className="shadow appearance-none border rounded py-1 px-2 text-gray-700"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          if (editingFolderName.trim()) {
                            setFormData(prev => ({
                              ...prev,
                              photoFolders: prev.photoFolders?.map(f => 
                                f.id === folder.id ? { ...f, name: editingFolderName.trim() } : f
                              )
                            }));
                          }
                          setEditingFolderId(null);
                          setEditingFolderName('');
                        }} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                        aria-label={`Guardar cambios de la carpeta ${folder.name}`}
                      >
                        Guardar
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          setEditingFolderId(null);
                          setEditingFolderName('');
                        }} 
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm"
                        aria-label={`Cancelar edición de la carpeta ${folder.name}`}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <h4 className="text-md font-semibold text-gray-700">{folder.name}</h4>
                  )}
                  <div className="flex gap-2">
                    {editingFolderId !== folder.id && (
                      <>
                        <button 
                          type="button" 
                          onClick={() => {
                            setEditingFolderId(folder.id);
                            setEditingFolderName(folder.name);
                          }} 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded text-xs"
                          aria-label={`Editar carpeta ${folder.name}`}
                        >
                          Editar
                        </button>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (window.confirm('¿Estás seguro de que quieres eliminar esta carpeta? Se eliminarán todas las fotos dentro.')) {
                              setFormData(prev => ({
                                ...prev,
                                photoFolders: prev.photoFolders?.filter(f => f.id !== folder.id)
                              }));
                            }
                          }} 
                          className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded text-xs"
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Fotos dentro de la carpeta */}
                <div className="grid grid-cols-3 gap-4">
                  {folder.photos.map((url, index) => (
                    <div key={`folder-photo-${folder.id}-${index}`} className="relative group">
                      <img src={url} alt={`photo-${index}`} className="w-full h-24 object-cover rounded-lg" />
                      <button type="button" onClick={() => handleDeleteFile('photos', url, folder.id)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
                
                {/* Botón para agregar fotos a esta carpeta */}
                <div className="mt-3 text-center">
                  <button 
                    type="button" 
                    onClick={() => {
                      setSelectedFolderId(folder.id);
                      console.log('Selected folder:', folder.name, folder.id);
                      photoFileInputRef.current?.click();
                    }} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                    aria-label={`Agregar fotos a la carpeta ${folder.name}`}
                  >
                    Agregar Fotos a {folder.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Previsualización de fotos nuevas */}
          {(photoFiles.length > 0 || photosWithFolder.length > 0) && (
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700 mb-2">Fotos Nuevas (pendientes de guardar):</h4>
              <div className="grid grid-cols-3 gap-4">
                {/* Fotos antiguas (backward compatibility) */}
                {photoFiles.map((file, index) => (
                  <div key={`legacy-photo-${index}`} className="relative group">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover rounded-lg" />
                    <button type="button" onClick={() => handleRemoveNewPhoto(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"><Trash2 size={16} /></button>
                  </div>
                ))}
                {/* Fotos nuevas con selección de carpeta */}
                {photosWithFolder.map((photoWithFolder, index) => (
                  <div key={`new-photo-${index}`} className="relative group">
                    <img src={URL.createObjectURL(photoWithFolder.file)} alt={photoWithFolder.file.name} className="w-full h-24 object-cover rounded-lg" />
                    
                    {/* Selector de carpeta individual */}
                    <select 
                      value={photoWithFolder.folderId || ''}
                      onChange={(e) => {
                        const newPhotosWithFolder = [...photosWithFolder];
                        newPhotosWithFolder[index] = {
                          ...newPhotosWithFolder[index],
                          folderId: e.target.value || null
                        };
                        setPhotosWithFolder(newPhotosWithFolder);
                      }}
                      className="mt-1 text-xs p-1 border rounded w-full"
                    >
                      <option value="">📁 Raíz</option>
                      {formData.photoFolders?.map((folder) => (
                        <option key={folder.id} value={folder.id}>📁 {folder.name}</option>
                      ))}
                    </select>
                    
                    <button 
                      type="button" 
                      onClick={() => {
                        setPhotosWithFolder(prev => prev.filter((_, i) => i !== index));
                      }} 
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Área de drag & drop para fotos */}
          <div className={`border-2 border-dashed rounded-lg p-4 text-center mt-4 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={(e) => {
              e.preventDefault();
              if (!isDragging) return;
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const newPhotos = Array.from(e.dataTransfer.files).map(file => ({
                  file,
                  folderId: selectedFolderId
                }));
                setPhotosWithFolder(prev => [...prev, ...newPhotos]);
                e.dataTransfer.clearData();
              }
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
              <UploadCloud size={32} />
              <p className="mb-2">Arrastra y suelta fotos aquí, o</p>
              <button type="button" onClick={() => photoFileInputRef.current?.click()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Seleccionar Fotos</button>
              {selectedFolderId && (
                <p className="text-xs text-gray-500 mt-1">
                  Las fotos se agregarán a: <strong>{formData.photoFolders?.find(f => f.id === selectedFolderId)?.name}</strong>
                </p>
              )}
            </div>
            <input 
              type="file" 
              id="photos" 
              name="photos" 
              multiple 
              accept="image/*" 
              ref={photoFileInputRef} 
              onChange={(e) => {
                if (e.target.files) {
                  const newPhotos = Array.from(e.target.files).map(file => ({
                    file,
                    folderId: selectedFolderId
                  }));
                  setPhotosWithFolder(prev => [...prev, ...newPhotos]);
                }
              }} 
              className="hidden" 
            />
          </div>
        </div>

        {/* Sección de Videos */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Videos:</label>
          <div className="space-y-2">
            {formData.videos?.map((url, index) => (
              <div key={`video-${index}`} className="flex items-center gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    const newVideos = [...(formData.videos || [])];
                    newVideos[index] = e.target.value;
                    setFormData(prev => ({ ...prev, videos: newVideos }));
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Pegar enlace de video aquí..."
                />
                <button type="button" onClick={() => {
                  const newVideos = formData.videos?.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, videos: newVideos }));
                }} className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => {
            setFormData(prev => ({ ...prev, videos: [...(prev.videos || []), ''] }));
          }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 flex items-center gap-2">
            <Video size={16} />
            Agregar Video por URL
          </button>
          
          {/* Selección de Videos Destacados (múltiples) */}
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Videos Destacados en Descripción:</label>
            <div className="space-y-2">
              {/* Mostrar videos existentes */}
              {formData.videos?.map((video, index) => {
                // Para manejar URLs duplicadas, usamos un enfoque diferente:
                // 1. Contar cuántas veces aparece esta URL en los videos anteriores (incluyéndose)
                const urlOccurrencesBefore = formData.videos?.slice(0, index + 1).filter(v => v === video).length || 1;
                // 2. Contar cuántas veces aparece esta URL en los videos destacados
                const urlOccurrencesInFeatured = formData.featuredVideos?.filter(fv => fv === video).length || 0;
                // 3. Si hay más o igual ocurrencias en destacados que en los videos anteriores, está marcado
                const isFeatured = urlOccurrencesInFeatured >= urlOccurrencesBefore;
                
                return (
                  <div key={`existing-${index}`} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => {
                        setFormData(prev => {
                          const currentFeatured = prev.featuredVideos || [];
                          const videoToUpdate = prev.videos?.[index];
                          
                          if (!videoToUpdate) {
                            return prev;
                          }
                          
                          // Crear una copia de los videos destacados para modificar
                          let newFeatured = [...currentFeatured];
                          
                          // Contar ocurrencias de esta URL en videos anteriores
                          const occurrencesBeforeThis = prev.videos?.slice(0, index + 1).filter(v => v === videoToUpdate).length || 1;
                          
                          if (e.target.checked) {
                            // Agregar la URL a destacados
                            newFeatured.push(videoToUpdate);
                          } else {
                            // Encontrar todas las posiciones de esta URL en destacados
                            const positions = newFeatured
                              .map((fv, i) => fv === videoToUpdate ? i : -1)
                              .filter(i => i !== -1);
                            
                            // Si hay posiciones, eliminar la última ocurrencia
                            if (positions.length > 0) {
                              newFeatured = newFeatured.filter((_, i) => i !== positions[positions.length - 1]);
                            }
                          }
                          
                          return { ...prev, featuredVideos: newFeatured };
                        });
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="flex-1 text-sm text-gray-700 truncate">
                      Video {index + 1} - {video}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Selecciona los videos que se mostrarán destacados en la descripción del evento.
              Si no seleccionas ninguno, no se mostrará ningún video destacado.
            </p>
          </div>
          
          {/* Subida de videos locales */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Subir Videos Locales:</label>
            
            {/* Previsualización de videos nuevos */}
            {videoFiles.length > 0 && (
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                {videoFiles.map((file, index) => (
                  <div key={`new-video-${index}`} className="relative group border rounded-lg p-2 flex flex-col items-center text-center">
                    <Video size={32} className="text-blue-500" />
                    <span className="text-sm text-gray-600 mt-1 break-all truncate max-w-full">{file.name}</span>
                    <button type="button" onClick={() => handleRemoveNewVideo(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Área de drag & drop para videos */}
            <div 
              className={`border-2 border-dashed rounded-lg p-4 text-center mt-4 ${isVideoDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} 
              onDragOver={handleVideoDragOver} 
              onDragLeave={handleVideoDragLeave} 
              onDrop={handleVideoDrop}
            >
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                <UploadCloud size={32} />
                <p className="mb-2">Arrastra y suelta videos aquí, o</p>
                <button 
                  type="button" 
                  onClick={() => {
                    // Crear input de archivo temporal si no existe
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'video/*';
                    input.multiple = true;
                    input.onchange = (e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.files) {
                        handleVideoFileChange({ target } as React.ChangeEvent<HTMLInputElement>);
                      }
                    };
                    input.click();
                  }} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Seleccionar Videos
                </button>
              </div>
            </div>
          </div>
          
          {/* Seleccionar videos preexistentes desde assets */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Agregar Videos Preexistentes:</label>
            <div className="mt-2 space-y-4">
              {/* Opciones rápidas */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Opciones rápidas:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Lista de videos preexistentes (ejemplo dinámico) */}
                  {[
                    { name: '1er Foro.mp4', url: '/src/assets/Videos/1er Foro.mp4' },
                    { name: '2do Foro.mp4', url: '/src/assets/Videos/2do Foro.mp4' },
                    { name: '3er Foro.mp4', url: '/src/assets/Videos/3er Foro.mp4' }
                  ].map((video, index) => {
                    // Verificar si el video ya está en la lista
                    const isAlreadyAdded = formData.videos?.includes(video.url) || false;
                    return (
                      <div key={`asset-video-${index}`} className={`border rounded-lg p-2 flex flex-col items-center text-center ${isAlreadyAdded ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 transition-colors'}`}>
                        <Video size={32} className={isAlreadyAdded ? "text-gray-400" : "text-green-500"} />
                        <span className="text-sm text-gray-600 mt-1 break-all truncate max-w-full">{video.name}</span>
                        {isAlreadyAdded ? (
                          <span className="mt-2 bg-gray-400 text-white font-bold py-1 px-2 rounded text-xs cursor-not-allowed">
                            Ya agregado
                          </span>
                        ) : (
                          <button type="button" className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs" onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              videos: [...(prev.videos || []), video.url]
                            }));
                          }}>
                            Agregar
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Agregar ruta personalizada */}
              <div>
                <p className="text-sm text-gray-500 mb-2">O agregar ruta personalizada:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ej: /src/assets/Videos/mi-video.mp4"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    ref={(input) => {
                      // No hacer nada si el input es null (durante desmontaje)
                      if (input) {
                        // Guardar referencia para usar en el botón
                        (input as any).customVideoInput = true;
                      }
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        const customUrl = input.value.trim();
                        if (customUrl) {
                          setFormData(prev => {
                            const currentVideos = prev.videos || [];
                            if (!currentVideos.includes(customUrl)) {
                              return { ...prev, videos: [...currentVideos, customUrl] };
                            }
                            return prev;
                          });
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {
                      const parent = e.target.closest('.flex');
                      if (parent) {
                        const input = parent.querySelector('input[type="text"]') as HTMLInputElement;
                        const customUrl = input.value.trim();
                        if (customUrl) {
                          setFormData(prev => {
                            const currentVideos = prev.videos || [];
                            if (!currentVideos.includes(customUrl)) {
                              return { ...prev, videos: [...currentVideos, customUrl] };
                            }
                            return prev;
                          });
                          input.value = '';
                        }
                      }
                    }}
                  >
                    Agregar
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Ingrese la ruta completa del video desde la raíz del proyecto. Presione Enter o haga clic en Agregar para agregar el video.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Videos Destacados */}
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Videos Destacados</h4>
          <p className="text-sm text-gray-600 mb-3">Seleccione los videos que aparecerán destacados en la descripción del evento:</p>
          
          <div className="space-y-3">
            {/* Conjunto de videos disponibles (enlaces + locales) */}
            {formData.videos?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                {formData.videos.map((videoUrl, index) => {
                  const isFeatured = formData.featuredVideos?.includes(videoUrl) || false;
                  return (
                    <div key={`video-select-${index}`} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        id={`featured-video-${index}`}
                        checked={isFeatured}
                        onChange={() => {
                          let newFeaturedVideos = [...(formData.featuredVideos || [])];
                          if (isFeatured) {
                            // Quitar de destacados
                            newFeaturedVideos = newFeaturedVideos.filter(url => url !== videoUrl);
                          } else {
                            // Agregar a destacados
                            newFeaturedVideos.push(videoUrl);
                          }
                          setFormData(prev => ({ ...prev, featuredVideos: newFeaturedVideos }));
                        }}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`featured-video-${index}`} className="flex-1 text-sm truncate">
                        {videoUrl}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
            
            {videoFiles.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Videos Locales Pendientes de Subir:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                  {videoFiles.map((file, index) => {
                    const tempUrl = URL.createObjectURL(file);
                    const isFeatured = formData.featuredVideos?.includes(tempUrl) || false;
                    return (
                      <div key={`local-video-select-${index}`} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          id={`local-featured-video-${index}`}
                          checked={isFeatured}
                          onChange={() => {
                            let newFeaturedVideos = [...(formData.featuredVideos || [])];
                            if (isFeatured) {
                              // Quitar de destacados
                              newFeaturedVideos = newFeaturedVideos.filter(url => url !== tempUrl);
                            } else {
                              // Agregar a destacados
                              newFeaturedVideos.push(tempUrl);
                            }
                            setFormData(prev => ({ ...prev, featuredVideos: newFeaturedVideos }));
                          }}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`local-featured-video-${index}`} className="flex-1 text-sm truncate">
                          {file.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Mostrar videos destacados actuales */}
            {formData.featuredVideos && formData.featuredVideos.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Videos Destacados Actuales:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {formData.featuredVideos.map((videoUrl, index) => {
                    // Verificar si es un video local temporal
                    const isLocalTemp = videoUrl.startsWith('blob:');
                    return (
                      <span key={`featured-tag-${index}`} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {isLocalTemp ? 
                          videoFiles.find(file => URL.createObjectURL(file) === videoUrl)?.name || 'Video Local' : 
                          videoUrl}
                        <button
                          type="button"
                          onClick={() => {
                            const newFeaturedVideos = formData.featuredVideos?.filter(url => url !== videoUrl);
                            setFormData(prev => ({ ...prev, featuredVideos: newFeaturedVideos }));
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            
            {(!formData.videos || formData.videos.length === 0) && videoFiles.length === 0 && (
              <p className="text-sm text-gray-500 italic">No hay videos disponibles para destacar. Agregue videos primero.</p>
            )}
          </div>
        </div>

        {/* Sección de Documentos */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Documentos:</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.documents?.map((doc, index) => (
              <div key={`existing-doc-${index}`} className="relative group border rounded-lg p-2 flex flex-col items-center text-center">
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  <DocumentIcon fileName={doc.name || doc.url} />
                  <span className="text-sm text-gray-600 mt-1 break-all">{doc.name || 'Documento'}</span>
                </a>
                <button type="button" onClick={() => handleDeleteFile('documents', doc.url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"><Trash2 size={16} /></button>
              </div>
            ))}
            {documentFiles.map((file, index) => (
              <div key={`new-doc-${index}`} className="relative group border rounded-lg p-2 flex flex-col items-center text-center">
                <DocumentIcon fileName={file.name} />
                <span className="text-sm text-gray-600 mt-1 break-all">{file.name}</span>
                <button type="button" onClick={() => handleRemoveNewDocument(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <div className={`border-2 border-dashed rounded-lg p-4 text-center mt-4 ${isDocumentDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onDragOver={handleDocumentDragOver} onDragLeave={handleDocumentDragLeave} onDrop={handleDocumentDrop}>
            <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
              <UploadCloud size={32} />
              <p className="mb-2">Arrastra y suelta documentos aquí, o</p>
              <button type="button" onClick={() => documentFileInputRef.current?.click()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Seleccionar Documentos</button>
            </div>
            <input type="file" id="documents" name="documents" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" ref={documentFileInputRef} onChange={handleDocumentFileChange} className="hidden" />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-between mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center" disabled={isUploading}>
            {isUploading ? <><Loader className="animate-spin mr-2" size={20} />Guardando...</> : (event ? 'Actualizar Evento' : 'Agregar Evento')}
          </button>
          <div className="flex items-center gap-2">
            {event && (
              <button type="button" onClick={handleShowAdminQr} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" disabled={isUploading}>
                Ver código QR de Acceso
              </button>
            )}
            {event && <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" disabled={isUploading}>Eliminar Evento</button>}
          </div>
        </div>
      </form>
    </>
  );
};

export default EventAdminView;