import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type CredentialsMap = Record<string, Record<string, string>>;
type SavedMap = Record<string, boolean>;

export function useIntegrations() {
  const [userId, setUserId] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedMap>({});
  const [savedCredentials, setSavedCredentials] = useState<CredentialsMap>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setUserId(user.id);

    const { data } = await supabase.from("integrations").select("provider, credentials, api_key");
    if (data) {
      const map: SavedMap = {};
      const credsMap: CredentialsMap = {};
      data.forEach((row: { provider: string; credentials: unknown; api_key: string | null }) => {
        map[row.provider] = true;
        const creds = (row.credentials && typeof row.credentials === "object")
          ? (row.credentials as Record<string, string>)
          : {};
        if (Object.keys(creds).length === 0 && row.api_key) {
          credsMap[row.provider] = { api_key: row.api_key };
        } else {
          credsMap[row.provider] = creds;
        }
      });
      setSaved(map);
      setSavedCredentials(credsMap);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (
      providerId: string,
      finalCreds: Record<string, string>,
      secondaryKey: string | null,
    ): Promise<{ ok: boolean; error?: string }> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { ok: false, error: "Usuário não autenticado." };

      const firstValue = Object.values(finalCreds)[0] ?? "";
      const apiSecret = secondaryKey ? finalCreds[secondaryKey] ?? null : null;

      const { error } = await supabase.from("integrations").upsert(
        {
          user_id: user.id,
          provider: providerId,
          api_key: firstValue,
          api_secret: apiSecret,
          credentials: finalCreds,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,provider" },
      );

      if (error) return { ok: false, error: error.message };

      setSaved((prev) => ({ ...prev, [providerId]: true }));
      setSavedCredentials((prev) => ({ ...prev, [providerId]: finalCreds }));
      return { ok: true };
    },
    [],
  );

  return { userId, saved, savedCredentials, loading, refresh, save };
}
