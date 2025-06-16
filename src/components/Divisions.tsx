
import React from 'react';
import { Building, Users, TrendingUp, Clock } from 'lucide-react';
import { Task } from '../types/Task';

interface DivisionsProps {
  tasks: Task[];
}

export const Divisions: React.FC<DivisionsProps> = ({ tasks }) => {
  const divisions = [
    {
      id: 1,
      name: '1ª Divisão - Logística',
      color: 'from-blue-500 to-blue-600',
      members: 15,
      activeTasks: tasks.filter(t => t.division.includes('1ª Divisão')).length,
      completedTasks: 23,
      efficiency: 75,
      description: 'Responsável pela gestão de materiais, transportes e suprimentos'
    },
    {
      id: 2,
      name: '2ª Divisão - Operações',
      color: 'from-green-500 to-green-600',
      members: 18,
      activeTasks: tasks.filter(t => t.division.includes('2ª Divisão')).length,
      completedTasks: 31,
      efficiency: 68,
      description: 'Execução de operações táticas e estratégicas'
    },
    {
      id: 3,
      name: '3ª Divisão - Planejamento',
      color: 'from-purple-500 to-purple-600',
      members: 12,
      activeTasks: tasks.filter(t => t.division.includes('3ª Divisão')).length,
      completedTasks: 19,
      efficiency: 89,
      description: 'Planejamento estratégico e análise operacional'
    },
    {
      id: 4,
      name: '4ª Divisão - Recursos Humanos',
      color: 'from-orange-500 to-orange-600',
      members: 8,
      activeTasks: tasks.filter(t => t.division.includes('4ª Divisão')).length,
      completedTasks: 15,
      efficiency: 72,
      description: 'Gestão de pessoal, treinamentos e capacitação'
    },
    {
      id: 5,
      name: '5ª Divisão - Financeiro',
      color: 'from-red-500 to-red-600',
      members: 6,
      activeTasks: tasks.filter(t => t.division.includes('5ª Divisão')).length,
      completedTasks: 12,
      efficiency: 85,
      description: 'Controle orçamentário e gestão financeira'
    },
    {
      id: 6,
      name: '6ª Divisão - Tecnologia',
      color: 'from-indigo-500 to-indigo-600',
      members: 10,
      activeTasks: tasks.filter(t => t.division.includes('6ª Divisão')).length,
      completedTasks: 28,
      efficiency: 76,
      description: 'Sistemas de informação e suporte tecnológico'
    },
    {
      id: 7,
      name: '7ª Divisão - Jurídico',
      color: 'from-gray-500 to-gray-600',
      members: 5,
      activeTasks: tasks.filter(t => t.division.includes('7ª Divisão')).length,
      completedTasks: 8,
      efficiency: 95,
      description: 'Assessoria jurídica e compliance'
    },
    {
      id: 8,
      name: '8ª Divisão - Comunicações',
      color: 'from-teal-500 to-teal-600',
      members: 7,
      activeTasks: tasks.filter(t => t.division.includes('8ª Divisão')).length,
      completedTasks: 17,
      efficiency: 81,
      description: 'Comunicação interna e externa, relações públicas'
    }
  ];

  const totalMembers = divisions.reduce((sum, div) => sum + div.members, 0);
  const averageEfficiency = Math.round(divisions.reduce((sum, div) => sum + div.efficiency, 0) / divisions.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Building size={24} />
          Gestão de Divisões
        </h1>
        <div className="text-sm text-gray-600">
          {divisions.length} divisões ativas
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{divisions.length}</div>
              <div className="text-sm opacity-90">Divisões Ativas</div>
            </div>
            <Building size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <div className="text-sm opacity-90">Total de Membros</div>
            </div>
            <Users size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{averageEfficiency}%</div>
              <div className="text-sm opacity-90">Eficiência Média</div>
            </div>
            <TrendingUp size={24} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <div className="text-sm opacity-90">Tarefas Ativas</div>
            </div>
            <Clock size={24} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Division Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {divisions.map((division) => (
          <div key={division.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300">
            <div className={`bg-gradient-to-r ${division.color} p-4 rounded-t-xl text-white`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{division.name}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold">{division.efficiency}%</div>
                  <div className="text-sm opacity-90">Eficiência</div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-gray-600 text-sm">{division.description}</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{division.members}</div>
                  <div className="text-xs text-gray-600">Membros</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{division.activeTasks}</div>
                  <div className="text-xs text-gray-600">Ativas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{division.completedTasks}</div>
                  <div className="text-xs text-gray-600">Concluídas</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progresso Geral</span>
                  <span className="text-sm font-medium">{division.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${division.color} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: `${division.efficiency}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  division.efficiency >= 80 ? 'bg-green-100 text-green-700' :
                  division.efficiency >= 60 ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {division.efficiency >= 80 ? 'Excelente' :
                   division.efficiency >= 60 ? 'Bom' : 'Precisa Atenção'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparativo de Performance</h3>
        <div className="space-y-3">
          {divisions.map((division) => (
            <div key={division.id} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-gray-700 truncate">
                {division.name.split(' - ')[0]}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r ${division.color} h-3 rounded-full transition-all duration-1000`}
                  style={{ width: `${division.efficiency}%` }}
                />
              </div>
              <div className="w-12 text-sm font-medium text-gray-600 text-right">
                {division.efficiency}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
