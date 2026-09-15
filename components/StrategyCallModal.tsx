"use client";

import { useActionState, useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { submitStrategyCall } from "@/app/actions/strategy-call";
import {
  type FieldErrors,
  initialStrategyCallState,
  readStrategyCallFields,
  validateStrategyCall,
} from "@/lib/strategy-call";
import type { Dictionary } from "@/lib/i18n/en";
import type { Locale } from "@/lib/i18n/config";
import { CONTACT_EMAIL, withContactEmail } from "@/lib/site";

/**
 * "Book a Strategy Call" modal.
 *
 * Built on the native <dialog> element rather than a hand-rolled overlay:
 * showModal() gives focus trapping, Escape-to-close, focus restoration and an
 * inert background for free, and the browser implements those correctly in
 * ways hand-written traps usually do not. Only body scroll-locking has to be
 * added, since <dialog> does not do that part.
 *
 * Opening is driven by the URL hash. Every "Book a Strategy Call" call to
 * action across the site is already a link to #contact, so routing on the hash
 * means the navbar, hero, footer, FAQ and page CTAs all open this without a
 * single change to any of them — and the modal stays linkable.
 *
 * Submission reuses the existing Server Action, validation and database path
 * unchanged. Nothing here talks to the network directly.
 */

const HASH = "#contact";

/** Labels sit above every control; uppercase, tracked, muted — per the design. */
function Label({ htmlFor, children, required }: { htmlFor: string; children: string; required?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 block text-[12.5px] font-semibold tracking-[0.12em] text-muted uppercase"
    >
      {children}
      {required && <span className="ml-1 text-muted-soft">*</span>}
    </label>
  );
}

const FIELD =
  "w-full rounded-[16px] border border-border bg-surface-2 px-5 py-[18px] text-[15px] text-ink transition-colors duration-200 placeholder:text-muted-soft focus:border-accent focus:bg-surface focus:outline-none";

function ErrorText({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-2 text-[12.5px] text-red-600">
      {text}
    </p>
  );
}

export function StrategyCallModal({ t, lang }: { t: Dictionary; lang: Locale }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState(
    submitStrategyCall,
    initialStrategyCallState
  );
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [budget, setBudget] = useState("");
  const uid = useId();

  const f = t.contact.form;
  const errors: FieldErrors = { ...state.errors, ...clientErrors };
  const errorId = (field: string) => `${uid}-${field}-error`;
  const messageFor = (field: keyof FieldErrors) => {
    const key = errors[field];
    return key ? f.errors[key] : undefined;
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  /**
   * Opening is driven by clicks on any link to #contact, intercepted in the
   * capture phase before Next's router sees them.
   *
   * Listening for `hashchange` alone is not enough: the navbar, hero, footer
   * and page CTAs are next/link, which navigates with pushState, and pushState
   * does not fire a hashchange event. Only the plain <a> in the FAQ would ever
   * have triggered it. Intercepting the click covers both kinds of link and
   * still leaves every call to action untouched.
   */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Leave modified clicks alone — they mean "open in a new tab/window".
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      // Resolve against the current URL so "#contact" and "/en/#contact" both
      // match, and anything off-site or pointing elsewhere is ignored.
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.hash !== HASH) return;

      event.preventDefault();
      setOpen(true);
    };

    // Capture phase: this has to run before next/link's own click handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // A direct link to /en#contact should still open it on arrival, and manual
  // hash edits should still work.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === HASH) setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      // The browser focuses the dialog itself; move to the first field so a
      // keyboard user starts where they would expect to type.
      firstFieldRef.current?.focus({ preventScroll: true });
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // <dialog> makes the background inert but does not stop it scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /** Fires for Escape and for close(); the single place the hash is cleared. */
  const handleClose = useCallback(() => {
    setOpen(false);
    if (window.location.hash === HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const succeeded = state.status === "success";

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      aria-labelledby={`${uid}-title`}
      // Clicking the backdrop (the dialog element itself, outside the panel)
      // closes, matching what people expect of a modal.
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      className="modal-dialog m-auto w-[min(100vw-1.5rem,1040px)] max-h-[min(92svh,900px)] overflow-hidden rounded-[var(--radius-modal)] border border-border bg-surface p-0 text-ink backdrop:bg-ink/55 backdrop:backdrop-blur-[3px]"
    >
      <div className="flex max-h-[inherit] flex-col">
        {/* Header */}
        <div className="relative shrink-0 px-6 pt-8 pb-6 sm:px-10 md:px-14 md:pt-12 md:pb-8 lg:px-16">
          <p className="text-[14px] font-bold tracking-[0.24em] text-accent uppercase sm:text-[16px]">
            {f.modalEyebrow}
          </p>
          <h2
            id={`${uid}-title`}
            className="mt-2.5 pr-12 text-[28px] leading-[1.08] font-bold tracking-[-0.035em] text-ink sm:text-[36px] md:text-[46px]"
          >
            {f.modalTitle}
          </h2>

          <button
            type="button"
            onClick={close}
            aria-label={f.close}
            className="ease-premium absolute top-6 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:right-8 md:top-11 md:right-12 lg:right-14"
          >
            <X size={22} />
          </button>
        </div>

        {/* Full-bleed divider, as in the design */}
        <div className="h-px shrink-0 bg-border" />

        {/* Body — the only part that scrolls when the viewport is short */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10 md:px-14 md:py-10 lg:px-16">
          {succeeded ? (
            <div className="modal-enter flex flex-col items-start py-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Check size={24} />
              </span>
              <h3 className="mt-6 text-[26px] font-bold tracking-[-0.03em] text-ink md:text-[30px]">
                {f.successTitle}
              </h3>
              <p className="text-body mt-3 max-w-xl text-muted">{f.successBody}</p>
              <p className="text-meta mt-5 max-w-xl text-muted-soft">
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

              <button
                type="button"
                onClick={close}
                className="ease-premium mt-9 inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span>{f.close}</span>
              </button>
            </div>
          ) : (
            <form
              action={formAction}
              noValidate
              onSubmit={(event) => {
                const form = event.currentTarget;
                const found = validateStrategyCall(
                  readStrategyCallFields(new FormData(form)),
                  { budgetOptions: f.budgetOptions }
                );
                setClientErrors(found);
                if (Object.keys(found).length > 0) {
                  event.preventDefault();
                  const first = Object.keys(found)[0];
                  form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
                }
              }}
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

              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`${uid}-name`} required>
                    {f.name}
                  </Label>
                  <input
                    ref={firstFieldRef}
                    id={`${uid}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={f.namePlaceholder}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? errorId("name") : undefined}
                    className={FIELD}
                  />
                  <ErrorText id={errorId("name")} text={messageFor("name")} />
                </div>

                <div>
                  <Label htmlFor={`${uid}-email`} required>
                    {f.email}
                  </Label>
                  <input
                    id={`${uid}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={f.emailPlaceholder}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? errorId("email") : undefined}
                    className={FIELD}
                  />
                  <ErrorText id={errorId("email")} text={messageFor("email")} />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor={`${uid}-company`}>{f.company}</Label>
                <input
                  id={`${uid}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder={f.companyPlaceholder}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? errorId("company") : undefined}
                  className={FIELD}
                />
                <ErrorText id={errorId("company")} text={messageFor("company")} />
              </div>

              {/*
                Budget is a radio group, not a listbox: real radios keep arrow-key
                navigation, screen-reader semantics and form submission working
                without re-implementing any of it. The inputs are visually hidden
                and the label carries the pill styling.
              */}
              <fieldset className="mt-6">
                <legend className="mb-2.5 text-[12.5px] font-semibold tracking-[0.12em] text-muted uppercase">
                  {f.budget}
                </legend>
                <div className="flex flex-wrap gap-3">
                  {f.budgetOptions.map((option) => {
                    const selected = budget === option;
                    return (
                      <label
                        key={option}
                        className={`ease-premium cursor-pointer rounded-full border px-6 py-3.5 text-[15px] transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2 ${
                          selected
                            ? "border-accent bg-accent text-white"
                            : "border-border bg-surface text-ink-soft hover:border-ink/25"
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={option}
                          checked={selected}
                          onChange={() => setBudget(option)}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                <ErrorText id={errorId("budget")} text={messageFor("budget")} />
              </fieldset>

              <div className="mt-6">
                <Label htmlFor={`${uid}-goal`} required>
                  {f.goal}
                </Label>
                <textarea
                  id={`${uid}-goal`}
                  name="goal"
                  rows={5}
                  placeholder={f.goalPlaceholder}
                  aria-invalid={!!errors.goal}
                  aria-describedby={errors.goal ? errorId("goal") : undefined}
                  className={`${FIELD} min-h-[160px] resize-y rounded-[20px] leading-relaxed`}
                />
                <ErrorText id={errorId("goal")} text={messageFor("goal")} />
              </div>

              {state.status === "error" && state.messageKey && (
                <p
                  role="alert"
                  className="mt-6 rounded-[16px] border border-red-200 bg-red-50 px-5 py-4 text-[13.5px] text-red-700"
                >
                  {withContactEmail(f.errors[state.messageKey])}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="ease-premium mt-8 inline-flex h-[84px] w-full items-center justify-center gap-3 rounded-full bg-ink text-[17px] font-semibold text-white transition-all duration-300 hover:bg-ink-soft hover:shadow-[0_18px_40px_-16px_rgba(10,10,13,0.55)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 md:h-[100px] md:text-[19px]"
              >
                {pending && <Loader2 size={19} className="animate-spin" />}
                <span>{pending ? f.submitting : f.submit}</span>
                {!pending && <ArrowRight size={19} />}
              </button>

              <p className="mt-5 text-center text-[12.5px] text-muted-soft">
                {f.reassurance}
              </p>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
