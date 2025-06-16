
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Task, Militar } from '@/types/Task';

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
      
      // Type cast the data to ensure proper typing
      const typedTasks = (data || []).map(task => ({
        ...task,
        priority: task.priority as 'alta' | 'media' | 'baixa',
        status: task.status as 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
      }));
      
      setTasks(typedTasks);
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
    
    // Type cast the returned data
    const typedTask = {
      ...data,
      priority: data.priority as 'alta' | 'media' | 'baixa',
      status: data.status as 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
    };
    
    setTasks(prev => [typedTask, ...prev]);
    return typedTask;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Type cast the returned data
    const typedTask = {
      ...data,
      priority: data.priority as 'alta' | 'media' | 'baixa',
      status: data.status as 'pendente' | 'em_andamento' | 'concluida' | 'cancelada'
    };
    
    setTasks(prev => prev.map(task => task.id === id ? typedTask : task));
    return typedTask;
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
