import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Category {
  id?: string;
  category: string; // The internal key/slug for the category
  label: string;    // The display name for the category
  color?: string;   // Optional color associated with the category
}

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  onSelect?: (categorySlug: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAdd,
  onDelete,
  onSelect
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ label: '', color: '#000000' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (categoryToEdit: Category | null = null) => {
    if (categoryToEdit) {
      setEditingCategory(categoryToEdit);
      setCategoryForm({
        label: categoryToEdit.label,
        color: categoryToEdit.color || '#000000'
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({ label: '', color: '#000000' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryForm({ label: '', color: '#000000' });
  };

  const handleSubmit = () => {
    if (!categoryForm.label) {
      alert('El nombre de la categoría es obligatorio.');
      return;
    }

    // Enviar solo los campos que espera addCategory (label y color)
    const newCategory = {
      label: categoryForm.label,
      color: categoryForm.color
    };
    
    onAdd(newCategory);
    handleCloseModal();
  };

  const handleDelete = (categoryId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría? Esta acción no se puede deshacer.')) {
      onDelete(categoryId);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Gestionar Categorías</h2>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenModal();
        }}
        className="bg-green-500 text-white px-3 py-1.5 rounded-md flex items-center mb-4 hover:bg-green-600 transition-colors text-sm"
      >
        <Plus size={16} className="mr-2" /> Agregar Nueva Categoría
      </button>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Clave
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Color
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id || cat.category} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2">
                  <p className="text-gray-800 whitespace-no-wrap">{cat.category}</p>
                </td>
                <td className="px-3 py-2">
                  <p className="text-gray-800 whitespace-no-wrap">{cat.label}</p>
                </td>
                <td className="px-3 py-2">
                  <span
                    className="inline-block w-5 h-5 rounded-full"
                    style={{ backgroundColor: cat.color || '#000000' }}
                    title={cat.color || '#000000'}
                  ></span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex space-x-2">
                    {onSelect && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(cat.category);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Seleccionar"
                      >
                        Seleccionar
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(cat.id || cat.category);
                      }}
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">{editingCategory ? 'Editar Categoría' : 'Agregar Nueva Categoría'}</h2>
            <div>
              <div className="mb-3">
                <label htmlFor="label" className="block text-gray-700 text-xs font-semibold mb-1">
                  Nombre para mostrar (ej: 'Taller', 'Conferencia')
                </label>
                <input
                  type="text"
                  id="label"
                  name="label"
                  value={categoryForm.label}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded w-full py-1.5 px-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-gray-700 text-xs font-semibold mb-1">
                  Color
                </label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={categoryForm.color}
                  onChange={handleInputChange}
                  className="shadow-sm appearance-none border rounded py-1 px-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-400 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  {editingCategory ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;