import React from 'react';
import { FileText, File, FileSpreadsheet, FileJson, FileImage, FileArchive } from 'lucide-react';

/**
 * @interface DocumentIconProps
 * @description Propiedades para el componente DocumentIcon.
 */
interface DocumentIconProps {
  fileName: string;
}

/**
 * Componente `DocumentIcon`
 * 
 * Muestra un icono SVG basado en la extensión del nombre del archivo.
 */
const DocumentIcon: React.FC<DocumentIconProps> = ({ fileName }) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf': return <FileText className="text-red-500" size={32} />;
    case 'doc': case 'docx': return <FileText className="text-blue-500" size={32} />;
    case 'xls': case 'xlsx': return <FileSpreadsheet className="text-green-500" size={32} />;
    case 'json': return <FileJson className="text-yellow-500" size={32} />;
    case 'png': case 'jpg': case 'jpeg': case 'gif': return <FileImage className="text-purple-500" size={32} />;
    case 'zip': case 'rar': return <FileArchive className="text-gray-500" size={32} />;
    default: return <File className="text-gray-500" size={32} />;
  }
};

export default DocumentIcon;