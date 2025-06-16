
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  division: string;
  priority: 'alta' | 'media' | 'baixa';
  status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';
  assigned_date: string;
  deadline: string;
  dependencies: string | null;
  responsible_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Militar {
  id: string;
  name: string;
  rank: string;
  division: string;
  email: string | null;
  active: boolean;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [militares, setMilitares] = useState<Militar[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchMilitares = async () => {
    try {
      const { data, error } = await supabase
        .from('militares')
        .select('*')
        .eq('active', true)
        .order('rank', { ascending: true });

      if (error) throw error;
      setMilitares(data || []);
    } catch (error) {
      console.error('Error fetching militares:', error);
    }
  };

  useEffect(() => {
    if (user) {
      Promise.all([fetchTasks(), fetchMilitares()]).finally(() => {
        setLoading(false);
      });
    }
  }, [user]);

  const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    if (!user) throw new Error('User must be authenticated');

    const taskId = `APG-${new Date().getFullYear()}-${String(tasks.length + 1).padStart(3, '0')}`;
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        ...taskData,
        id: taskId,
        created_by: user.id,
      }])
      .select()
      .single();

    if (error) throw error;
    
    setTasks(prev => [data, ...prev]);
    return data;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    setTasks(prev => prev.map(task => task.id === id ? data : task));
    return data;
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return {
    tasks,
    militares,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
};
