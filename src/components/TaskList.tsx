
import React, { useState } from 'react';
import { Plus, Filter, Search, Edit, Trash2, User } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

interface TaskListProps {
  onNewTask: () => void;
  onEditTask: (task: any) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onNewTask, onEditTask }) => {
  const { tasks, militares, deleteTask } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDivision, setFilterDivision] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesDivision = filterDivision === 'all' || task.division.includes(filterDivision);
    
    return matchesSearch && matchesPriority && matchesStatus && matchesDivision;
  });

  const divisions = [
    '1ª Divisão', '2ª Divisão', '3ª Divisão', '4ª Divisão',
    '5ª Divisão', '6ª Divisão', '7ª Divisão', '8ª Divisão'
  ];

  const priorityColors = {
    alta: 'border-l-red-500 bg-red-50',
    media: 'border-l-orange-500 bg-orange-50',
    baixa: 'border-l-blue-500 bg-blue-50'
  };

  const statusColors = {
    pendente: 'bg-gray-100 text-gray-700',
    em_andamento: 'bg-blue-100 text-blue-700',
    concluida: 'bg-green-100 text-green-700',
    cancelada: 'bg-red-100 text-red-700'
  };

  const statusLabels = {
    pendente: 'Pendente',
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada'
  };

  const getMilitarName = (responsibleId: string | null) => {
    if (!responsibleId) return 'Não atribuído';
    const militar = militares.find(m => m.id === responsibleId);
    return militar ? `${militar.rank} ${militar.name}` : 'Militar não encontrado';
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Erro ao excluir tarefa');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestão de Tarefas</h1>
        <button
          onClick={onNewTask}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
        >
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todas as Prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todos os Status</option>
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="concluida">Concluída</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <select
          value={filterDivision}
          onChange={(e) => setFilterDivision(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todas as Divisões</option>
          {divisions.map(division => (
            <option key={division} value={division}>{division}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <span className="text-sm text-gray-600">{filteredTasks.length} tarefas</span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const deadline = new Date(task.deadline);
          const today = new Date();
          const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          const isOverdue = diffDays < 0 && task.status !== 'concluida';

          return (
            <div key={task.id} className={`border-l-4 ${priorityColors[task.priority]} rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {task.id}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
                      {statusLabels[task.status]}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'alta' ? 'bg-red-100 text-red-700' :
                    task.priority === 'media' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {task.priority.toUpperCase()}
                  </span>
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                    title="Editar tarefa"
                  >
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                    title="Excluir tarefa"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>🏢</span>
                  <span>{task.division}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={isOverdue ? '⚠️' : '📅'}></span>
                  <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                    {isOverdue ? `${Math.abs(diffDays)} dias atrasado` : `${diffDays} dias restantes`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{getMilitarName(task.responsible_id)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔗</span>
                  <span>{task.dependencies || 'Sem dependências'}</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">📋</div>
            <p className="text-gray-500">Nenhuma tarefa encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};
