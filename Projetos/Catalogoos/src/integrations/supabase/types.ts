export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      clicks: {
        Row: {
          created_at: string
          event_source_url: string | null
          fbc: string | null
          fbp: string | null
          id: string
          ip_address: string | null
          lead_id: string | null
          link_id: string
          query_params: Json | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_source_url?: string | null
          fbc?: string | null
          fbp?: string | null
          id?: string
          ip_address?: string | null
          lead_id?: string | null
          link_id: string
          query_params?: Json | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_source_url?: string | null
          fbc?: string | null
          fbp?: string | null
          id?: string
          ip_address?: string | null
          lead_id?: string | null
          link_id?: string
          query_params?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "links"
            referencedColumns: ["id"]
          },
        ]
      }
      conversions: {
        Row: {
          city_hash: string | null
          click_id: string
          country_hash: string | null
          created_at: string
          dob_hash: string | null
          email_hash: string | null
          emq_score: number | null
          external_id_hash: string | null
          external_order_id: string | null
          first_name_hash: string | null
          gender_hash: string | null
          ghl_sync_status: string
          id: string
          last_name_hash: string | null
          last_sync_attempt_at: string | null
          meta_sync_status: string
          next_retry_at: string | null
          phone_hash: string | null
          purchase_value: number
          retry_count: number
          state_hash: string | null
          status: string
          sync_logs: string | null
          zip_hash: string | null
        }
        Insert: {
          city_hash?: string | null
          click_id: string
          country_hash?: string | null
          created_at?: string
          dob_hash?: string | null
          email_hash?: string | null
          emq_score?: number | null
          external_id_hash?: string | null
          external_order_id?: string | null
          first_name_hash?: string | null
          gender_hash?: string | null
          ghl_sync_status?: string
          id?: string
          last_name_hash?: string | null
          last_sync_attempt_at?: string | null
          meta_sync_status?: string
          next_retry_at?: string | null
          phone_hash?: string | null
          purchase_value?: number
          retry_count?: number
          state_hash?: string | null
          status?: string
          sync_logs?: string | null
          zip_hash?: string | null
        }
        Update: {
          city_hash?: string | null
          click_id?: string
          country_hash?: string | null
          created_at?: string
          dob_hash?: string | null
          email_hash?: string | null
          emq_score?: number | null
          external_id_hash?: string | null
          external_order_id?: string | null
          first_name_hash?: string | null
          gender_hash?: string | null
          ghl_sync_status?: string
          id?: string
          last_name_hash?: string | null
          last_sync_attempt_at?: string | null
          meta_sync_status?: string
          next_retry_at?: string | null
          phone_hash?: string | null
          purchase_value?: number
          retry_count?: number
          state_hash?: string | null
          status?: string
          sync_logs?: string | null
          zip_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversions_click_id_fkey"
            columns: ["click_id"]
            isOneToOne: false
            referencedRelation: "clicks"
            referencedColumns: ["id"]
          },
        ]
      }
      identities: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          dob: string | null
          email: string | null
          external_id: string | null
          fbc: string | null
          fbp: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          lead_id: string
          phone: string | null
          state: string | null
          updated_at: string
          user_id: string | null
          zip: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          external_id?: string | null
          fbc?: string | null
          fbp?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          lead_id: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
          zip?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          dob?: string | null
          email?: string | null
          external_id?: string | null
          fbc?: string | null
          fbp?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          lead_id?: string
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      integrations: {
        Row: {
          api_key: string
          api_secret: string | null
          credentials: Json
          id: string
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key?: string
          api_secret?: string | null
          credentials?: Json
          id?: string
          provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          api_secret?: string | null
          credentials?: Json
          id?: string
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          consent_accepted_at: string | null
          consent_version: string | null
          created_at: string
          dob: string | null
          email: string
          event_source_url: string | null
          fbc: string | null
          fbclid: string | null
          fbp: string | null
          first_name: string
          ga4_sync_status: string
          ghl_sync_status: string
          id: string
          last_name: string | null
          meta_sync_status: string
          phone: string
          sync_logs: Json | null
          telegram_invite_link: string | null
          telegram_joined: boolean
          telegram_joined_at: string | null
          user_agent: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          variant: string
        }
        Insert: {
          consent_accepted_at?: string | null
          consent_version?: string | null
          created_at?: string
          dob?: string | null
          email: string
          event_source_url?: string | null
          fbc?: string | null
          fbclid?: string | null
          fbp?: string | null
          first_name: string
          ga4_sync_status?: string
          ghl_sync_status?: string
          id?: string
          last_name?: string | null
          meta_sync_status?: string
          phone: string
          sync_logs?: Json | null
          telegram_invite_link?: string | null
          telegram_joined?: boolean
          telegram_joined_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          variant: string
        }
        Update: {
          consent_accepted_at?: string | null
          consent_version?: string | null
          created_at?: string
          dob?: string | null
          email?: string
          event_source_url?: string | null
          fbc?: string | null
          fbclid?: string | null
          fbp?: string | null
          first_name?: string
          ga4_sync_status?: string
          ghl_sync_status?: string
          id?: string
          last_name?: string | null
          meta_sync_status?: string
          phone?: string
          sync_logs?: Json | null
          telegram_invite_link?: string | null
          telegram_joined?: boolean
          telegram_joined_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          variant?: string
        }
        Relationships: []
      }
      links: {
        Row: {
          channel: string
          created_at: string
          destination_url: string
          id: string
          product_name: string
          slug: string
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          channel: string
          created_at?: string
          destination_url: string
          id?: string
          product_name: string
          slug: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          channel?: string
          created_at?: string
          destination_url?: string
          id?: string
          product_name?: string
          slug?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          id: string
          name: string
          price: number
          sku_or_external_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          price?: number
          sku_or_external_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          price?: number
          sku_or_external_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      taxonomies: {
        Row: {
          created_at: string
          id: string
          type: string
          user_id: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          type: string
          user_id: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: string
          user_id?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_cron_status: {
        Args: never
        Returns: {
          active: boolean
          jobid: number
          jobname: string
          last_run_finished: string
          last_run_return: string
          last_run_started: string
          last_run_status: string
          runtime_ms: number
          schedule: string
        }[]
      }
      get_emq_stats_24h: {
        Args: never
        Returns: {
          avg_emq_score: number
          signal_coverage: Json
          total_conversions: number
        }[]
      }
      get_landing_tracking: {
        Args: never
        Returns: {
          gtm_container_id: string
          meta_pixel_id: string
        }[]
      }
      get_link_by_slug: {
        Args: { _slug: string }
        Returns: {
          destination_url: string
          id: string
          user_id: string
        }[]
      }
      get_retry_queue_stats: {
        Args: never
        Returns: {
          failed_max_retries: number
          next_retry_at: string
          pending_retries: number
        }[]
      }
      process_conversion_retries: { Args: never; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
