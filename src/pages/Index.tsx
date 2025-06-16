
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/Dashboard';
import { TaskList } from '../components/TaskList';
import { TaskModal } from '../components/TaskModal';
import { Calendar } from '../components/Calendar';
import { Reports } from '../components/Reports';
import { Divisions } from '../components/Divisions';
import { Settings } from '../components/Settings';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { tasks, loading: tasksLoading } = useTasks();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleNewTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const renderContent = () => {
    if (tasksLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Carregando tarefas...</div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard tasks={tasks} onNewTask={handleNewTask} />;
      case 'tasks':
        return <TaskList onNewTask={handleNewTask} onEditTask={handleEditTask} />;
      case 'calendar':
        return <Calendar tasks={tasks} />;
      case 'reports':
        return <Reports tasks={tasks} />;
      case 'divisions':
        return <Divisions tasks={tasks} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard tasks={tasks} onNewTask={handleNewTask} />;
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
          onClose={handleCloseModal}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
};

export default Index;
