import { useState, useCallback } from 'react';

/**
 * @interface FileUploadResult
 * @description Define la estructura del resultado de la subida de archivos.
 * @property {string[]} photoUrls - URLs de las fotos subidas.
 * @property {string[]} videoUrls - URLs de los videos subidos.
 * @property {{ name: string; url: string }[]} documentUrls - URLs y nombres de los documentos subidos.
 */
interface FileUploadResult {
  photoUrls: string[];
  videoUrls: string[];
  documentUrls: { name: string; url: string }[];
  mainPhotoUrl: string | null;
}

/**
 * @interface PhotoWithFolder
 * @description Define una foto con su carpeta de destino asociada.
 * @property {File} file - Archivo de foto.
 * @property {string | null} folderId - ID de la carpeta de destino.
 */
export interface PhotoWithFolder {
  file: File;
  folderId: string | null;
}

/**
 * Custom Hook `useFileUpload`
 * 
 * Encapsula toda la lógica para manejar la selección, previsualización y subida de archivos (fotos, videos y documentos).
 * Esto permite reutilizar la funcionalidad de subida de archivos en cualquier componente.
 *
 * @returns Un objeto con el estado y las funciones para gestionar los archivos.
 */
export const useFileUpload = () => {
  // Estado para los archivos de fotos seleccionados por el usuario con su carpeta de destino.
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  // Estado para los archivos de fotos con su carpeta de destino individual.
  const [photosWithFolder, setPhotosWithFolder] = useState<PhotoWithFolder[]>([]);
  // Estado para los archivos de videos seleccionados por el usuario.
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  // Estado para los archivos de documentos seleccionados por el usuario.
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  // Estado para indicar si se está realizando una subida de archivos.
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const uploadFiles = useCallback(async (mainPhotoFile: File | null, documentFile: File | null = null): Promise<FileUploadResult> => {
    console.log('useFileUpload: Initial state - photoFiles:', photoFiles, 'photosWithFolder:', photosWithFolder, 'videoFiles:', videoFiles, 'documentFiles:', documentFiles, 'mainPhotoFile (arg):', mainPhotoFile, 'documentFile (arg):', documentFile);
    
    // Combinar fotos antiguas y nuevas con carpeta
    const allPhotoFiles = [...photoFiles, ...photosWithFolder.map(pwf => pwf.file)];
    
    // Si no hay archivos, retorna inmediatamente.
    if (allPhotoFiles.length === 0 && videoFiles.length === 0 && documentFiles.length === 0 && !mainPhotoFile && !documentFile) {
      return { photoUrls: [], videoUrls: [], documentUrls: [], mainPhotoUrl: null };
    }

    setIsUploading(true);
    const formData = new FormData();
    allPhotoFiles.forEach(file => formData.append('photos', file));
    videoFiles.forEach(file => formData.append('videos', file));
    documentFiles.forEach(file => formData.append('documents', file));
    if (mainPhotoFile) {
      formData.append('mainPhoto', mainPhotoFile);
    }
    if (documentFile) {
      formData.append('documents', documentFile);
    }

    console.log('useFileUpload: FormData before fetch:', formData);

    try {
      const API_URL = import.meta.env.VITE_APP_BASE_URL ? `${import.meta.env.VITE_APP_BASE_URL}/api` : '/api';
      const response = await fetch(`${API_URL}/upload`, { 
        method: 'POST',
        body: formData,
      });

      console.log('useFileUpload: Response from /api/upload:', response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al subir archivos.');
      }

      const data = await response.json();
      
      console.log('useFileUpload: Data received from server:', data);
      
      // Función para mantener URLs relativas
      const makeUrlAbsolute = (url: string | null): string | null => {
        if (!url) return null;
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return url; // Ya es absoluta
        }
        // Mantener la URL como relativa para que el .htaccess la proxyee
        return url;
      };
      
      // El backend ya separó los archivos por tipo, así que solo necesitamos convertirlos a URLs absolutas
      const photoUrls = (Array.isArray(data.photos) ? data.photos : []).map((url: string) => makeUrlAbsolute(url) as string);
      const videoUrls = (Array.isArray(data.videos) ? data.videos : []).map((url: string) => makeUrlAbsolute(url) as string);
      
      // Convertir URLs de documentos y extraer nombres
      const documentUrls = (Array.isArray(data.documents) ? data.documents : []).map((url: string) => {
        const absoluteUrl = makeUrlAbsolute(url);
        const filename = url.substring(url.lastIndexOf('/') + 1);
        return { name: filename, url: absoluteUrl as string };
      });
      
      // Convertir la URL de la imagen principal
      const mainPhotoUrl = makeUrlAbsolute(data.mainPhoto);
      
      console.log('useFileUpload: Processed URLs:', { photoUrls, videoUrls, documentUrls, mainPhotoUrl });
      
      return { photoUrls, videoUrls, documentUrls, mainPhotoUrl };
    } finally {
      setIsUploading(false);
    }
  }, [photoFiles, photosWithFolder, videoFiles, documentFiles]);

  /**
   * Resetea el estado de los archivos seleccionados.
   */
  const resetFiles = useCallback(() => {
    setPhotoFiles([]);
    setPhotosWithFolder([]);
    setVideoFiles([]);
    setDocumentFiles([]);
  }, []);

  return {
    photoFiles,
    setPhotoFiles,
    photosWithFolder,
    setPhotosWithFolder,
    videoFiles,
    setVideoFiles,
    documentFiles,
    setDocumentFiles,
    isUploading,
    uploadFiles,
    resetFiles,
  };
};