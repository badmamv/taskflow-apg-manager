
export interface Task {
  id: string;
  title: string;
  description: string;
  division: string;
  priority: 'alta' | 'media' | 'baixa';
  assigned: string;
  deadline: string;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'atrasada';
  dependencies?: string;
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
