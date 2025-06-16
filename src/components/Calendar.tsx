
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Task } from '../types/Task';

interface CalendarProps {
  tasks: Task[];
}

export const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getTasksForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return tasks.filter(task => task.deadline === dateStr);
  };

  const upcomingTasks = tasks
    .filter(task => {
      const taskDate = new Date(task.deadline);
      const diffTime = taskDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarIcon size={24} />
          Cronograma
        </h1>
        <div className="text-sm text-gray-600">
          {tasks.length} tarefas no sistema
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayWeekday }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2 h-20" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const date = index + 1;
              const isToday = today.getDate() === date && 
                            today.getMonth() === currentDate.getMonth() && 
                            today.getFullYear() === currentDate.getFullYear();
              const dayTasks = getTasksForDate(date);

              return (
                <div
                  key={date}
                  className={`p-2 h-20 border rounded-lg ${
                    isToday ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                  } hover:bg-gray-50 transition-colors`}
                >
                  <div className={`text-sm font-medium ${
                    isToday ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {date}
                  </div>
                  {dayTasks.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {dayTasks.slice(0, 2).map((task, idx) => (
                        <div
                          key={idx}
                          className={`text-xs px-1 py-0.5 rounded ${
                            task.priority === 'alta' ? 'bg-red-100 text-red-700' :
                            task.priority === 'media' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {task.title.substring(0, 15)}...
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayTasks.length - 2} mais
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Próximos 7 Dias</h3>
          <div className="space-y-3">
            {upcomingTasks.map((task) => {
              const deadline = new Date(task.deadline);
              const diffTime = deadline.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              return (
                <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'alta' ? 'bg-red-100 text-red-700' :
                      task.priority === 'media' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.division}</p>
                  <div className="text-xs text-gray-500">
                    {diffDays === 0 ? 'Hoje' : diffDays === 1 ? 'Amanhã' : `Em ${diffDays} dias`}
                  </div>
                </div>
              );
            })}
            {upcomingTasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>Nenhuma tarefa nos próximos 7 dias</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
