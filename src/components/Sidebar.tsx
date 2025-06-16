
import React from 'react';
import { X, BarChart3, CheckSquare, Calendar, TrendingUp, Building, Settings } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
  { id: 'calendar', label: 'Cronograma', icon: Calendar },
  { id: 'reports', label: 'Relatórios', icon: TrendingUp },
  { id: 'divisions', label: 'Divisões', icon: Building },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-80
        bg-white/95 backdrop-blur-lg rounded-r-2xl lg:rounded-2xl m-4 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* Close button for mobile */}
          <div className="flex justify-end lg:hidden mb-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    onClose(); // Close sidebar on mobile after selection
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform translate-x-1' 
                      : 'text-gray-700 hover:bg-gray-100 hover:transform hover:translate-x-1'
                    }
                  `}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
