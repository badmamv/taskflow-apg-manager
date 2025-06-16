
-- Criar tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  rank TEXT, -- posto/graduação militar
  division TEXT, -- divisão do militar
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de militares (para atribuição de tarefas)
CREATE TABLE public.militares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rank TEXT NOT NULL, -- posto/graduação
  division TEXT NOT NULL, -- divisão
  email TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de tarefas atualizada
CREATE TABLE public.tasks (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  division TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('alta', 'media', 'baixa')),
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_andamento', 'concluida', 'cancelada')),
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  deadline DATE NOT NULL,
  dependencies TEXT,
  responsible_id UUID REFERENCES public.militares(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir alguns militares de exemplo
INSERT INTO public.militares (name, rank, division, email) VALUES
('Ten Cel Silva', 'Tenente Coronel', '1ª Divisão - Logística', 'silva@apg.mil.br'),
('Maj Santos', 'Major', '2ª Divisão - Operações', 'santos@apg.mil.br'),
('Cap Oliveira', 'Capitão', '3ª Divisão - Inteligência', 'oliveira@apg.mil.br'),
('Cap Ferreira', 'Capitão', '4ª Divisão - Recursos Humanos', 'ferreira@apg.mil.br'),
('Maj Costa', 'Major', '5ª Divisão - Comunicações', 'costa@apg.mil.br'),
('Ten Cel Lima', 'Tenente Coronel', '6ª Divisão - Suprimentos', 'lima@apg.mil.br'),
('Cap Rocha', 'Capitão', '7ª Divisão - Tecnologia', 'rocha@apg.mil.br'),
('Maj Alves', 'Major', '8ª Divisão - Segurança', 'alves@apg.mil.br');

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.militares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Políticas RLS para militares (todos os usuários autenticados podem ver)
CREATE POLICY "Authenticated users can view militares" 
  ON public.militares 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Políticas RLS para tasks (todos os usuários autenticados podem ver e criar)
CREATE POLICY "Authenticated users can view tasks" 
  ON public.tasks 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can create tasks" 
  ON public.tasks 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update tasks" 
  ON public.tasks 
  FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can delete tasks" 
  ON public.tasks 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
