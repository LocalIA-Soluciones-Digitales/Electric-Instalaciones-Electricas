"use client";

import { useEffect, useState } from "react";

export const COOKIE_CONSENT_STORAGE_KEY = "cookie_consent_v1";

export function useCookieBannerVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage requires the client mount; avoids SSR hydration mismatch
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  return [visible, setVisible] as const;
}
