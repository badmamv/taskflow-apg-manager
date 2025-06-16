
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTask?: any;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, editingTask }) => {
  const { createTask, updateTask, militares } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    division: '',
    priority: 'media' as 'alta' | 'media' | 'baixa',
    status: 'pendente' as 'pendente' | 'em_andamento' | 'concluida' | 'cancelada',
    assigned_date: new Date().toISOString().split('T')[0],
    deadline: '',
    dependencies: '',
    responsible_id: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        division: editingTask.division || '',
        priority: editingTask.priority || 'media',
        status: editingTask.status || 'pendente',
        assigned_date: editingTask.assigned_date || new Date().toISOString().split('T')[0],
        deadline: editingTask.deadline || '',
        dependencies: editingTask.dependencies || '',
        responsible_id: editingTask.responsible_id || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        division: '',
        priority: 'media',
        status: 'pendente',
        assigned_date: new Date().toISOString().split('T')[0],
        deadline: '',
        dependencies: '',
        responsible_id: '',
      });
    }
  }, [editingTask, isOpen]);

  const divisions = [
    '1ª Divisão - Logística',
    '2ª Divisão - Operações',
    '3ª Divisão - Planejamento',
    '4ª Divisão - Recursos Humanos',
    '5ª Divisão - Financeiro',
    '6ª Divisão - Tecnologia',
    '7ª Divisão - Jurídico',
    '8ª Divisão - Comunicações'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
      } else {
        await createTask(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Erro ao salvar tarefa');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Tarefa
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Digite o título da tarefa..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Descreva o escopo da tarefa..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Divisão Responsável
                </label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecione...</option>
                  {divisions.map(division => (
                    <option key={division} value={division}>{division}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Militar Responsável
                </label>
                <select
                  name="responsible_id"
                  value={formData.responsible_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Selecione um militar...</option>
                  {militares.map(militar => (
                    <option key={militar.id} value={militar.id}>
                      {militar.rank} {militar.name} - {militar.division}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridade
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluida">Concluída</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Atribuição
                </label>
                <input
                  type="date"
                  name="assigned_date"
                  value={formData.assigned_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo de Conclusão
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interações/Dependências
              </label>
              <input
                type="text"
                name="dependencies"
                value={formData.dependencies}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ex: Aguarda aprovação da 3ª Divisão"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50"
              >
                {loading ? 'Salvando...' : editingTask ? 'Atualizar Tarefa' : 'Criar Tarefa'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
