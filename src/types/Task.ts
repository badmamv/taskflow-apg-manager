
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

export interface Division {
  id: string;
  name: string;
  progress: number;
  taskCount: number;
  color: string;
}

export interface Stats {
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
  completed: number;
}
