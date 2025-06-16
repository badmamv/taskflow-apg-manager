export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cápsulas: {
        Row: {
          COD: number
          DESCRIÇÃO: string | null
          UNIDADE: string | null
          VALOR: number | null
        }
        Insert: {
          COD: number
          DESCRIÇÃO?: string | null
          UNIDADE?: string | null
          VALOR?: number | null
        }
        Update: {
          COD?: number
          DESCRIÇÃO?: string | null
          UNIDADE?: string | null
          VALOR?: number | null
        }
        Relationships: []
      }
      compounds: {
        Row: {
          COD: number
          DESCRIÇÃO: string | null
          "PREÇO G/M": string | null
          "PREÇO MG": string | null
          UNI: string | null
          "Unnamed: 2": string | null
        }
        Insert: {
          COD: number
          DESCRIÇÃO?: string | null
          "PREÇO G/M"?: string | null
          "PREÇO MG"?: string | null
          UNI?: string | null
          "Unnamed: 2"?: string | null
        }
        Update: {
          COD?: number
          DESCRIÇÃO?: string | null
          "PREÇO G/M"?: string | null
          "PREÇO MG"?: string | null
          UNI?: string | null
          "Unnamed: 2"?: string | null
        }
        Relationships: []
      }
      militares: {
        Row: {
          active: boolean
          created_at: string
          division: string
          email: string | null
          id: string
          name: string
          rank: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          division: string
          email?: string | null
          id?: string
          name: string
          rank: string
        }
        Update: {
          active?: boolean
          created_at?: string
          division?: string
          email?: string | null
          id?: string
          name?: string
          rank?: string
        }
        Relationships: []
      }
      packaging: {
        Row: {
          COD: number
          DESCRIÇÃO: string | null
          UNIDADE: string | null
          VALOR: number | null
        }
        Insert: {
          COD: number
          DESCRIÇÃO?: string | null
          UNIDADE?: string | null
          VALOR?: number | null
        }
        Update: {
          COD?: number
          DESCRIÇÃO?: string | null
          UNIDADE?: string | null
          VALOR?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          division: string | null
          email: string | null
          full_name: string | null
          id: string
          rank: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          division?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          rank?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          division?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          rank?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_date: string
          created_at: string
          created_by: string | null
          deadline: string
          dependencies: string | null
          description: string | null
          division: string
          id: string
          priority: string
          responsible_id: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_date?: string
          created_at?: string
          created_by?: string | null
          deadline: string
          dependencies?: string | null
          description?: string | null
          division: string
          id: string
          priority: string
          responsible_id?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_date?: string
          created_at?: string
          created_by?: string | null
          deadline?: string
          dependencies?: string | null
          description?: string | null
          division?: string
          id?: string
          priority?: string
          responsible_id?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_responsible_id_fkey"
            columns: ["responsible_id"]
            isOneToOne: false
            referencedRelation: "militares"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
