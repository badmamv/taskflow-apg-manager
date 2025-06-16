
import React from 'react';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';
import { Task } from '../types/Task';

interface ReportsProps {
  tasks: Task[];
}

export const Reports: React.FC<ReportsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = 143; // Simulado
  const pendingTasks = tasks.filter(t => t.status === 'pendente').length;
  const inProgressTasks = tasks.filter(t => t.status === 'em_andamento').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / (completedTasks + totalTasks)) * 100) : 0;

  const priorityStats = {
    alta: tasks.filter(t => t.priority === 'alta').length,
    media: tasks.filter(t => t.priority === 'media').length,
    baixa: tasks.filter(t => t.priority === 'baixa').length,
  };

  const divisionStats = [
    { name: '1ª Divisão - Logística', tasks: 12, completed: 9, efficiency: 75 },
    { name: '2ª Divisão - Operações', tasks: 15, completed: 9, efficiency: 60 },
    { name: '3ª Divisão - Planejamento', tasks: 8, completed: 7, efficiency: 88 },
    { name: '4ª Divisão - RH', tasks: 10, completed: 6, efficiency: 60 },
    { name: '5ª Divisão - Financeiro', tasks: 6, completed: 5, efficiency: 83 },
    { name: '6ª Divisão - Tecnologia', tasks: 11, completed: 8, efficiency: 73 },
    { name: '7ª Divisão - Jurídico', tasks: 4, completed: 4, efficiency: 100 },
    { name: '8ª Divisão - Comunicações', tasks: 9, completed: 7, efficiency: 78 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BarChart3 size={24} />
          Relatórios
        </h1>
        <div className="text-sm text-gray-600">
          Atualizado agora
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{totalTasks + completedTasks}</div>
              <div className="text-sm opacity-90">Total de Tarefas</div>
            </div>
            <Clock size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <div className="text-sm opacity-90">Concluídas</div>
            </div>
            <TrendingUp size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{inProgressTasks}</div>
              <div className="text-sm opacity-90">Em Andamento</div>
            </div>
            <Clock size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="text-sm opacity-90">Taxa de Conclusão</div>
            </div>
            <BarChart3 size={24} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição por Prioridade</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="font-medium">Alta Prioridade</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-red-600">{priorityStats.alta}</span>
              <div className="w-24 bg-red-100 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(priorityStats.alta / totalTasks) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="font-medium">Média Prioridade</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-orange-600">{priorityStats.media}</span>
              <div className="w-24 bg-orange-100 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(priorityStats.media / totalTasks) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="font-medium">Baixa Prioridade</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-blue-600">{priorityStats.baixa}</span>
              <div className="w-24 bg-blue-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(priorityStats.baixa / totalTasks) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Division Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users size={20} />
          Performance por Divisão
        </h3>
        <div className="space-y-4">
          {divisionStats.map((division, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{division.name}</span>
                <div className="text-right">
                  <span className="text-sm text-gray-600">
                    {division.completed}/{division.tasks} tarefas
                  </span>
                  <div className="text-sm font-medium text-gray-800">
                    {division.efficiency}% eficiência
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    division.efficiency >= 80 ? 'bg-green-500' :
                    division.efficiency >= 60 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${division.efficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendência Semanal</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => {
            const height = Math.floor(Math.random() * 60) + 20;
            return (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-600 mb-2">{day}</div>
                <div className="flex items-end justify-center h-16">
                  <div 
                    className="w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{Math.floor(height / 10)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
