
import React from 'react';
import { Plus, AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Task } from '../types/Task';

interface DashboardProps {
  tasks: Task[];
  onNewTask: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, onNewTask }) => {
  const stats = {
    highPriority: tasks.filter(t => t.priority === 'alta').length,
    mediumPriority: tasks.filter(t => t.priority === 'media').length,
    lowPriority: tasks.filter(t => t.priority === 'baixa').length,
    completed: 143, // Simulado
  };

  const urgentTasks = tasks.filter(task => {
    const deadline = new Date(task.deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && task.status !== 'concluida';
  });

  const divisions = [
    { name: '1ª Divisão - Logística', progress: 75 },
    { name: '2ª Divisão - Operações', progress: 60 },
    { name: '3ª Divisão - Planejamento', progress: 85 },
    { name: '4ª Divisão - Recursos Humanos', progress: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl lg:text-3xl font-bold">{stats.highPriority}</div>
              <div className="text-sm opacity-90">Alta Prioridade</div>
            </div>
            <AlertTriangle size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl lg:text-3xl font-bold">{stats.mediumPriority}</div>
              <div className="text-sm opacity-90">Média Prioridade</div>
            </div>
            <Clock size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl lg:text-3xl font-bold">{stats.lowPriority}</div>
              <div className="text-sm opacity-90">Baixa Prioridade</div>
            </div>
            <TrendingUp size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl lg:text-3xl font-bold">{stats.completed}</div>
              <div className="text-sm opacity-90">Concluídas</div>
            </div>
            <CheckCircle size={24} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Urgent Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Tarefas Urgentes</h2>
          <button
            onClick={onNewTask}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Nova Tarefa</span>
          </button>
        </div>

        <div className="space-y-3">
          {urgentTasks.map((task) => {
            const deadline = new Date(task.deadline);
            const today = new Date();
            const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const isOverdue = diffDays < 0;

            const priorityColors = {
              alta: 'border-l-red-500 bg-red-50',
              media: 'border-l-orange-500 bg-orange-50',
              baixa: 'border-l-blue-500 bg-blue-50'
            };

            return (
              <div key={task.id} className={`border-l-4 ${priorityColors[task.priority]} rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'alta' ? 'bg-red-100 text-red-700' :
                    task.priority === 'media' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📋</span>
                    {task.division}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={isOverdue ? '⚠️' : '📅'}></span>
                    <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                      {isOverdue ? `${Math.abs(diffDays)} dias atrasado` : `${diffDays} dias restantes`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Division Progress */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Progresso por Divisão</h3>
        <div className="space-y-4">
          {divisions.map((division, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{division.name}</span>
                <span className="text-sm font-medium text-gray-600">{division.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${division.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
