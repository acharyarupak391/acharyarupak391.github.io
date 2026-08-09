"use client";

import { useRef, useState, useCallback } from "react";
import { Twitter, Linkedin, Github, Send, Check, ChevronDown } from "lucide-react";
import { Tag } from "./tag";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const relationshipOptions = [
  { value: "friend", label: "We're Friends" },
  { value: "colleague", label: "Work Colleagues" },
  { value: "recruiter", label: "Recruiter/HR" },
  { value: "client", label: "Potential Client" },
  { value: "visitor", label: "Just A Visitor" },
  { value: "other", label: "Other" },
];

const purposeOptions = [
  { value: "hi", label: "Just saying Hi" },
  { value: "hire", label: "Looking to Hire You" },
  { value: "collaborate", label: "Let's Build Something Together" },
  { value: "freelance", label: "Freelance Project" },
  { value: "coffee", label: "Virtual Coffee Chat" },
  { value: "feedback", label: "Sharing Some Feedback" },
  { value: "other", label: "Something Else..." },
];

interface FormState {
  name: string;
  email: string;
  relationship: string;
  purpose: string;
  message: string;
  socialTwitter: string;
  socialLinkedin: string;
  socialGithub: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  relationship: "visitor",
  purpose: "hi",
  message: "",
  socialTwitter: "",
  socialLinkedin: "",
  socialGithub: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [relationshipOpen, setRelationshipOpen] = useState(false);
  const [purposeOpen, setPurposeOpen] = useState(false);
  const relRef = useRef<HTMLDivElement | null>(null);
  const purpRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const requiredFilled =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.relationship !== "" &&
    form.purpose !== "" &&
    form.message.trim() !== "";

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requiredFilled || submitted || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to send your message.");
      }

      setSubmitted(true);
      toast({
        title: "Message transmitted",
        description: "Thanks for reaching out — I'll get back to you shortly.",
      });
      setTimeout(() => {
        setForm(initialState);
        setSubmitted(false);
      }, 4000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message.";
      setSubmitError(message);
      toast({
        title: "Transmission failed",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdowns on outside click or Escape
  const handleBlur = (e: React.FocusEvent) => {
    if (!relRef.current?.contains(e.relatedTarget as Node)) {
      setRelationshipOpen(false);
    }
    if (!purpRef.current?.contains(e.relatedTarget as Node)) {
      setPurposeOpen(false);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, type: "relationship" | "purpose") => {
      if (e.key === "Escape") {
        if (type === "relationship") setRelationshipOpen(false);
        if (type === "purpose") setPurposeOpen(false);
        return;
      }
      const options = type === "relationship" ? relationshipOptions : purposeOptions;
      const currentValue = type === "relationship" ? form.relationship : form.purpose;
      const currentIdx = options.findIndex((o) => o.value === currentValue);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = currentIdx < options.length - 1 ? currentIdx + 1 : 0;
        update(type, options[nextIdx].value);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : options.length - 1;
        update(type, options[prevIdx].value);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (type === "relationship") setRelationshipOpen((v) => !v);
        else setPurposeOpen((v) => !v);
      }
    },
    [form.relationship, form.purpose],
  );

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      className="surface-deep text-ink-inverse p-6 md:p-8 lg:p-10 flex flex-col gap-6"
      aria-label="Contact form"
      noValidate
    >
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-rule-inverse-soft">
        <div>
          <Tag variant="accent">FORM // 06.F</Tag>
          <h3 className="mt-3 font-display text-2xl md:text-3xl uppercase tracking-tight leading-tight text-ink-inverse">
            Send Me A Message
          </h3>
        </div>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint whitespace-nowrap hidden sm:block">
          {"// ENC · TLS"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <Field label="Your Name" required>
          <input
            type="text"
            name="name"
            placeholder="What should I call you?"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" required>
          <input
            type="email"
            name="email"
            placeholder="you@awesome.com"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </Field>

        {/* Relationship — custom combobox, fully keyboard accessible */}
        <Field label="Our Relationship" required>
          <div ref={relRef} className="relative">
            <button
              type="button"
              role="combobox"
              aria-expanded={relationshipOpen}
              aria-haspopup="listbox"
              aria-controls="relationship-listbox"
              aria-label="How do we know each other?"
              onClick={() => {
                setRelationshipOpen((v) => !v);
                setPurposeOpen(false);
              }}
              onKeyDown={(e) => handleKeyDown(e, "relationship")}
              className={cn(inputClass, "flex items-center justify-between text-left")}
            >
              <span className={form.relationship ? "text-ink-inverse" : "text-ink-inverse-faint"}>
                {form.relationship
                  ? relationshipOptions.find((o) => o.value === form.relationship)?.label
                  : "How do we know each other?"}
              </span>
              <ChevronDown
                aria-hidden="true"
                size={14}
                className={cn(
                  "text-ink-inverse-faint transition-transform duration-200 ml-2 shrink-0",
                  relationshipOpen && "rotate-180",
                )}
              />
            </button>
            {relationshipOpen && (
              <ul
                role="listbox"
                id="relationship-listbox"
                className="absolute z-30 top-full left-0 right-0 mt-1 surface-dark border border-rule-inverse-soft max-h-60 overflow-y-auto"
              >
                {relationshipOptions.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={form.relationship === opt.value}
                      onClick={() => {
                        update("relationship", opt.value);
                        setRelationshipOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                        form.relationship === opt.value
                          ? "bg-accent text-ink-inverse"
                          : "text-ink-inverse-soft hover:bg-surface-dark hover:text-ink-inverse",
                      )}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>

        {/* Purpose — custom combobox */}
        <Field label="Purpose" required>
          <div ref={purpRef} className="relative">
            <button
              type="button"
              role="combobox"
              aria-expanded={purposeOpen}
              aria-haspopup="listbox"
              aria-controls="purpose-listbox"
              aria-label="What brings you here?"
              onClick={() => {
                setPurposeOpen((v) => !v);
                setRelationshipOpen(false);
              }}
              onKeyDown={(e) => handleKeyDown(e, "purpose")}
              className={cn(inputClass, "flex items-center justify-between text-left")}
            >
              <span className={form.purpose ? "text-ink-inverse" : "text-ink-inverse-faint"}>
                {form.purpose
                  ? purposeOptions.find((o) => o.value === form.purpose)?.label
                  : "What brings you here?"}
              </span>
              <ChevronDown
                aria-hidden="true"
                size={14}
                className={cn(
                  "text-ink-inverse-faint transition-transform duration-200 ml-2 shrink-0",
                  purposeOpen && "rotate-180",
                )}
              />
            </button>
            {purposeOpen && (
              <ul
                role="listbox"
                id="purpose-listbox"
                className="absolute z-30 top-full left-0 right-0 mt-1 surface-dark border border-rule-inverse-soft max-h-60 overflow-y-auto"
              >
                {purposeOptions.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={form.purpose === opt.value}
                      onClick={() => {
                        update("purpose", opt.value);
                        setPurposeOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                        form.purpose === opt.value
                          ? "bg-accent text-ink-inverse"
                          : "text-ink-inverse-soft hover:bg-surface-dark hover:text-ink-inverse",
                      )}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Field>
      </div>

      {/* Message */}
      <Field label="Your Message" required>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me everything... or at least something interesting!"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(inputClass, "resize-y min-h-[120px]")}
        />
      </Field>

      {/* Socials */}
      <Field label="Your Socials (If you like)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SocialInput
            icon={<Twitter size={14} />}
            placeholder="@handle"
            value={form.socialTwitter}
            onChange={(v) => update("socialTwitter", v)}
            name="socialTwitter"
          />
          <SocialInput
            icon={<Linkedin size={14} />}
            placeholder="username"
            value={form.socialLinkedin}
            onChange={(v) => update("socialLinkedin", v)}
            name="socialLinkedin"
          />
          <SocialInput
            icon={<Github size={14} />}
            placeholder="username"
            value={form.socialGithub}
            onChange={(v) => update("socialGithub", v)}
            name="socialGithub"
          />
        </div>
      </Field>

      {/* Submit */}
      <div className="pt-4 border-t border-rule-inverse-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span
          className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint"
          aria-live="polite"
        >
          {submitError
            ? `// ${submitError}`
            : requiredFilled
            ? "// READY TO TRANSMIT"
            : "// FILL REQUIRED FIELDS"}
        </span>
        <button
          type="submit"
          disabled={!requiredFilled || submitted || isSubmitting}
          className={cn(
            "group inline-flex items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors whitespace-nowrap",
            submitted
              ? "bg-signal text-ink-inverse"
              : isSubmitting
              ? "bg-accent/60 text-ink-inverse cursor-wait"
              : requiredFilled
              ? "bg-accent text-ink-inverse hover:bg-accent-soft hover:text-surface-deep"
              : "bg-surface-dark text-ink-inverse-faint cursor-not-allowed border border-rule-inverse-soft",
          )}
        >
          {submitted ? (
            <>
              <Check size={16} />
              <span>Message Sent</span>
            </>
          ) : (
            <>
              <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
              <Send
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

const inputClass = cn(
  "w-full bg-surface-dark border border-rule-inverse-soft px-4 py-3",
  "font-mono text-sm text-ink-inverse placeholder:text-ink-inverse-faint",
  "focus:outline-none focus:border-accent transition-colors",
);

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-inverse-soft flex items-center gap-1">
        {label}
        {required && <span className="text-accent-soft">*</span>}
      </label>
      {children}
    </div>
  );
}

function SocialInput({
  icon,
  placeholder,
  value,
  onChange,
  name,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-inverse-faint pointer-events-none">
        {icon}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputClass, "pl-9")}
      />
    </div>
  );
}
