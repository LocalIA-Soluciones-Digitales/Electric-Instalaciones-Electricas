"use client";

import { useState } from "react";
import { waLink } from "@/lib/business";
import { trackFormSubmit } from "@/lib/tracking";

export function QuickContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackFormSubmit("quick_contact_form");
    const message = `Hola, soy ${name} (tel: ${phone}). Necesito ayuda con: ${problem}`;
    window.open(waLink(message), "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Solicita presupuesto rápido</h3>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Teléfono</label>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          placeholder="600 000 000"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">¿Qué necesitas?</label>
        <textarea
          required
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          placeholder="Ej: avería eléctrica, cuadro que salta..."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-[#25D366] px-4 py-3 font-bold text-white hover:brightness-110"
      >
        Enviar por WhatsApp
      </button>
    </form>
  );
}

export function BudgetContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    details: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackFormSubmit("budget_contact_form");
    const message = [
      `Solicitud de presupuesto`,
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      form.address ? `Dirección/localidad: ${form.address}` : "",
      `Servicio: ${form.service}`,
      `Detalles: ${form.details}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(message), "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">Presupuesto detallado</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Teléfono</label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email (opcional)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Localidad / dirección</label>
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Servicio que necesitas</label>
        <input
          required
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          placeholder="Ej: instalación eléctrica, cuadro eléctrico, avería..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Cuéntanos más detalles</label>
        <textarea
          required
          rows={4}
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-800"
      >
        Solicitar presupuesto
      </button>
    </form>
  );
}
