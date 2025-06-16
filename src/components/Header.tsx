
import React from 'react';
import { Menu, User, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobile }) => {
  return (
    <header className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 lg:p-6 m-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <Menu size={20} />
            </button>
          )}
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg lg:text-xl">
              📋
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow APG
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">Sistema de Gestão de Tarefas</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="font-semibold text-gray-800">Assessoria APG</div>
              <div className="text-sm text-gray-600">8 Divisões Ativas</div>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              APG
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
