"use client";

import type { GuideQuestion } from "@/lib/leadConfig";

interface GuidedQuestionsProps {
  questions: GuideQuestion[];
  values: Record<string, string>;
  onChange: (questionId: string, optionId: string) => void;
}

export default function GuidedQuestions({ questions, values, onChange }: GuidedQuestionsProps) {
  if (!questions || questions.length === 0) return null;
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, idx) => {
        const selected = values[q.id];
        return (
          <div key={q.id}>
            <p className="mb-2 flex items-start gap-2 text-[15px] font-bold leading-snug text-neutral-900">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-electric-100 text-xs font-extrabold text-electric-600">
                {idx + 1}
              </span>
              <span>{q.question}</span>
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {q.options.map((opt) => {
                const active = selected === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange(q.id, opt.id)}
                    aria-pressed={active}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm md:text-[15px] font-semibold transition-all duration-200 cursor-pointer ${
                      active
                        ? "border-electric-500/60 bg-electric-400/10 text-neutral-900"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-electric-400/50 hover:bg-electric-50/40 hover:text-neutral-900"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        active ? "border-electric-400 bg-electric-400" : "border-neutral-300"
                      }`}
                    >
                      {active && (
                        <i className="ri-check-line text-[11px] text-neutral-950" aria-hidden="true"></i>
                      )}
                    </span>
                    <span className="leading-snug">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
