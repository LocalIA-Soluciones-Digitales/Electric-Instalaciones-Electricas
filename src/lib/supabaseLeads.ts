import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const LEADS_CLIENTE_ID = process.env.LEADS_CLIENTE_ID;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

export interface LeadForDashboard {
  nombre: string;
  telefono?: string;
  email?: string;
  mensaje?: string;
  origen?: string;
}

/**
 * Best-effort insert into the shared panel-centralizado `leads` table.
 * Never throws: mirrors the archiveLead() pattern in leadStore.ts — this
 * only feeds the external dashboard and must never block/fail a real lead.
 */
export async function insertLeadForDashboard(lead: LeadForDashboard) {
  if (!supabase || !LEADS_CLIENTE_ID) return;

  try {
    await supabase.from("leads").insert({
      cliente_id: LEADS_CLIENTE_ID,
      nombre: lead.nombre,
      telefono: lead.telefono ?? null,
      email: lead.email ?? null,
      mensaje: lead.mensaje ?? null,
      origen: lead.origen ?? null,
    });
  } catch (err) {
    console.error("No se pudo registrar el lead en el panel centralizado:", err);
  }
}
