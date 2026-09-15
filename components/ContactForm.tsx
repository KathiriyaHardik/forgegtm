"use client";

import { useActionState, useId, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { submitStrategyCall } from "@/app/actions/strategy-call";
import {
  type FieldErrors,
  initialStrategyCallState,
  isFreeEmailDomain,
  readStrategyCallFields,
  validateStrategyCall,
} from "@/lib/strategy-call";
import type { Dictionary } from "@/lib/i18n/en";
import type { Locale } from "@/lib/i18n/config";
import { CONTACT_EMAIL, withContactEmail } from "@/lib/site";

const FIELD_BASE =
  "w-full rounded-inset border bg-white px-4 py-3 text-[14px] text-ink transition-colors duration-200 placeholder:text-muted-soft focus:border-accent focus:outline-none";

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8' fill='none'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%236b6f76' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

function fieldClass(hasError: boolean) {
  return `${FIELD_BASE} ${hasError ? "border-red-400" : "border-border"}`;
}

function ErrorText({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-[12.5px] text-red-600">
      {text}
    </p>
  );
}

export function ContactForm({ t, lang }: { t: Dictionary; lang: Locale }) {
  const [state, formAction, pending] = useActionState(
    submitStrategyCall,
    initialStrategyCallState
  );

  // Client-side copy of the same rules, for feedback before a round trip.
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [freeEmailNotice, setFreeEmailNotice] = useState(false);
  const uid = useId();

  const f = t.contact.form;
  const errors: FieldErrors = { ...state.errors, ...clientErrors };
  const errorId = (field: string) => `${uid}-${field}-error`;
  const messageFor = (field: keyof FieldErrors) => {
    const key = errors[field];
    return key ? f.errors[key] : undefined;
  };

  if (state.status === "success") {
    return (
      <div className="rounded-panel border border-border bg-white p-8 md:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check size={20} />
        </span>
        <h3 className="text-h3 mt-6 text-ink">{f.successTitle}</h3>
        <p className="text-body mt-3 text-muted">{f.successBody}</p>
        <p className="text-meta mt-6 text-muted-soft">
          {/* Same reasoning as the button: text wrapped so it is never a bare
              sibling of the link. Only promise a confirmation email when one
              actually went out. */}
          <span>
            {state.confirmationSent === false
              ? f.successNoEmail
              : f.successFallback}{" "}
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          <span>.</span>
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(event) => {
        const form = event.currentTarget;
        const found = validateStrategyCall(
          readStrategyCallFields(new FormData(form)),
          { budgetOptions: f.budgetOptions, goalOptions: f.goalOptions }
        );
        setClientErrors(found);
        if (Object.keys(found).length > 0) {
          event.preventDefault();
          const first = Object.keys(found)[0];
          form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        }
      }}
      className="rounded-panel border border-border bg-white p-6 md:p-8"
    >
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Do not fill this in</label>
        <input
          id={`${uid}-hp`}
          type="text"
          name="company_website_confirm"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="locale" value={lang} readOnly />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${uid}-name`}
            className="text-meta mb-2 block font-medium text-ink-soft"
          >
            {f.name} <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={f.namePlaceholder}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={fieldClass(!!errors.name)}
          />
          <ErrorText id={errorId("name")} text={messageFor("name")} />
        </div>

        <div>
          <label
            htmlFor={`${uid}-email`}
            className="text-meta mb-2 block font-medium text-ink-soft"
          >
            {f.email} <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={f.emailPlaceholder}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={fieldClass(!!errors.email)}
            onBlur={(event) =>
              setFreeEmailNotice(
                !!event.target.value && isFreeEmailDomain(event.target.value)
              )
            }
          />
          <ErrorText id={errorId("email")} text={messageFor("email")} />
          {!errors.email && freeEmailNotice && (
            <p className="mt-1.5 text-[12.5px] text-muted-soft">
              {f.freeEmailNotice}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-company`}
            className="text-meta mb-2 block font-medium text-ink-soft"
          >
            {f.company} <span className="text-accent">*</span>
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={f.companyPlaceholder}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? errorId("company") : undefined}
            className={fieldClass(!!errors.company)}
          />
          <ErrorText id={errorId("company")} text={messageFor("company")} />
        </div>

        <div>
          <label
            htmlFor={`${uid}-website`}
            className="text-meta mb-2 block font-medium text-ink-soft"
          >
            {f.website}
          </label>
          <input
            id={`${uid}-website`}
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder={f.websitePlaceholder}
            aria-invalid={!!errors.website}
            aria-describedby={errors.website ? errorId("website") : undefined}
            className={fieldClass(!!errors.website)}
          />
          <ErrorText id={errorId("website")} text={messageFor("website")} />
        </div>

        <div>
          <label
            htmlFor={`${uid}-jobTitle`}
            className="text-meta mb-2 block font-medium text-ink-soft"
          >
            {f.jobTitle}
          </label>
          <input
            id={`${uid}-jobTitle`}
            name="jobTitle"
            type="text"
            autoComplete="organization-title"
            placeholder={f.jobTitlePlaceholder}
            aria-invalid={!!errors.jobTitle}
            aria-describedby={errors.jobTitle ? errorId("jobTitle") : undefined}
            className={fieldClass(!!errors.jobTitle)}
          />
          <ErrorText id={errorId("jobTitle")} text={messageFor("jobTitle")} />
        </div>

        <div>
          <label
            htmlFor={`${uid}-budget`}
            className="text-meta mb-2 block font-medium text-ink-soft"
          >
            {f.budget}
            <span className="ml-1 font-normal text-muted-soft">{f.optional}</span>
          </label>
          <select
            id={`${uid}-budget`}
            name="budget"
            defaultValue=""
            aria-invalid={!!errors.budget}
            className={`${fieldClass(!!errors.budget)} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{ backgroundImage: SELECT_CHEVRON }}
          >
            <option value="">{f.budgetPlaceholder}</option>
            {f.budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ErrorText id={errorId("budget")} text={messageFor("budget")} />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${uid}-goal`}
          className="text-meta mb-2 block font-medium text-ink-soft"
        >
          {f.goal} <span className="text-accent">*</span>
        </label>
        <select
          id={`${uid}-goal`}
          name="goal"
          defaultValue=""
          aria-invalid={!!errors.goal}
          aria-describedby={errors.goal ? errorId("goal") : undefined}
          className={`${fieldClass(!!errors.goal)} appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          style={{ backgroundImage: SELECT_CHEVRON }}
        >
          <option value="">{f.goalPlaceholder}</option>
          {f.goalOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ErrorText id={errorId("goal")} text={messageFor("goal")} />
      </div>

      <div className="mt-5">
        <label
          htmlFor={`${uid}-message`}
          className="text-meta mb-2 block font-medium text-ink-soft"
        >
          {f.message}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          placeholder={f.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={`${fieldClass(!!errors.message)} resize-y`}
        />
        <ErrorText id={errorId("message")} text={messageFor("message")} />
      </div>

      {state.status === "error" && state.messageKey && (
        <p
          role="alert"
          className="rounded-inset mt-5 border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
        >
          {withContactEmail(f.errors[state.messageKey])}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="group ease-premium inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[13.5px] font-medium whitespace-nowrap text-white transition-all duration-300 hover:bg-ink-soft hover:shadow-[0_14px_30px_-14px_rgba(10,10,13,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {/*
            Every child here is an element, and the label keeps the same
            position in both states. Bare text nodes swapped between branches
            are what break when a translator or extension re-parents them into
            an injected wrapper: React still holds the original text node, so
            removing it throws "node is not a child of this node". Elements
            survive that, because React removes the element it owns.
          */}
          {pending && <Loader2 size={15} className="animate-spin" />}
          <span>{pending ? f.submitting : f.submit}</span>
          {!pending && (
            <ArrowRight
              size={15}
              className="ease-premium transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </button>

        <p className="text-[12.5px] text-muted-soft">{f.reassurance}</p>
      </div>
    </form>
  );
}
