
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/Dashboard';
import { TaskList } from '../components/TaskList';
import { TaskModal } from '../components/TaskModal';
import { Calendar } from '../components/Calendar';
import { Reports } from '../components/Reports';
import { Divisions } from '../components/Divisions';
import { Settings } from '../components/Settings';
import { Task } from '../types/Task';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'APG-2024-001',
      title: 'Relatório Mensal de Logística',
      description: 'Consolidação dos dados de movimentação de materiais do mês anterior',
      division: '1ª Divisão - Logística',
      priority: 'alta',
      assigned: '2024-06-01',
      deadline: '2024-06-20',
      status: 'em_andamento',
      dependencies: 'Aguarda dados da 6ª Divisão'
    },
    {
      id: 'APG-2024-002',
      title: 'Atualização do Sistema de Comunicações',
      description: 'Implementação de novos protocolos de segurança',
      division: '8ª Divisão - Comunicações',
      priority: 'media',
      assigned: '2024-06-05',
      deadline: '2024-06-25',
      status: 'pendente',
      dependencies: 'Aprovação do orçamento'
    },
    {
      id: 'APG-2024-003',
      title: 'Treinamento de Pessoal - Q2',
      description: 'Organização do cronograma de capacitação para o segundo trimestre',
      division: '4ª Divisão - Recursos Humanos',
      priority: 'alta',
      assigned: '2024-06-10',
      deadline: '2024-06-30',
      status: 'em_andamento',
      dependencies: 'Coordenação com instrutores externos'
    }
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const id = `APG-2024-${String(tasks.length + 1).padStart(3, '0')}`;
    setTasks([{ ...newTask, id }, ...tasks]);
    setIsTaskModalOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard tasks={tasks} onNewTask={() => setIsTaskModalOpen(true)} />;
      case 'tasks':
        return <TaskList tasks={tasks} onNewTask={() => setIsTaskModalOpen(true)} />;
      case 'calendar':
        return <Calendar tasks={tasks} />;
      case 'reports':
        return <Reports tasks={tasks} />;
      case 'divisions':
        return <Divisions tasks={tasks} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard tasks={tasks} onNewTask={() => setIsTaskModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="max-w-7xl mx-auto">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)}
          isMobile={true}
        />
        
        <div className="flex">
          <Sidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          
          <main className="flex-1 p-4 lg:p-6">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl min-h-[calc(100vh-200px)]">
              {renderContent()}
            </div>
          </main>
        </div>

        <TaskModal 
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={addTask}
        />
      </div>
    </div>
  );
};

export default Index;
