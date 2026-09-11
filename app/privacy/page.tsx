import type { Metadata } from "next";
import { LegalPage, LegalSection, Fill } from "@/components/LegalPage";

// TEMPLATE — every <Fill> below must be replaced with ForgeGTM's real details,
// and the finished text reviewed by a qualified lawyer before launch. This is
// a GDPR-shaped skeleton, not legal advice.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ForgeGTM collects, uses and protects personal data collected through this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={<Fill>DD Month YYYY</Fill>}
    >
      <LegalSection heading="Who we are">
        <p>
          This website is operated by <Fill>Registered company name</Fill>,{" "}
          <Fill>Registered address</Fill> (&ldquo;ForgeGTM&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;). We are the controller responsible for personal data
          processed through this site.
        </p>
        <p>
          For any privacy question, contact us at{" "}
          <Fill>privacy@yourdomain.com</Fill>.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          <strong className="font-medium text-ink-soft">
            Information you give us.
          </strong>{" "}
          When you contact us or book a call, we process the details you submit
          — typically your name, work email, company and the content of your
          message.
        </p>
        <p>
          <strong className="font-medium text-ink-soft">
            Information collected automatically.
          </strong>{" "}
          Our hosting and analytics providers may process technical data such as
          IP address, browser type, referring page and pages viewed.
        </p>
      </LegalSection>

      <LegalSection heading="Why we process it and on what basis">
        <p>
          We process enquiry data to respond to you and to carry out
          pre-contractual steps at your request. We process technical data on
          the basis of our legitimate interest in operating a secure, working
          website and understanding how it is used.
        </p>
        <p>
          Where we rely on consent — for example non-essential cookies or
          marketing email — you may withdraw it at any time without affecting
          processing carried out beforehand.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          We share personal data only with processors acting on our
          instructions, such as our hosting, email and analytics providers:{" "}
          <Fill>List your actual processors</Fill>. We do not sell personal
          data.
        </p>
        <p>
          Where a provider processes data outside the EEA or UK, we rely on an
          appropriate transfer mechanism such as the EU Standard Contractual
          Clauses.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          Enquiry correspondence is retained for{" "}
          <Fill>your retention period</Fill>, after which it is deleted or
          anonymised. Data required for legal, tax or accounting purposes is
          retained for the period those obligations require.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Subject to the conditions in applicable law, you have the right to
          access your personal data, to have it corrected or erased, to
          restrict or object to processing, and to data portability.
        </p>
        <p>
          You may also lodge a complaint with a supervisory authority. Our lead
          authority is <Fill>Your supervisory authority</Fill>.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          We use cookies that are strictly necessary to operate the site, and —
          only with your consent — cookies that help us measure usage. You can
          manage your preferences at any time through{" "}
          <Fill>your cookie settings mechanism</Fill> or your browser settings.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy to reflect changes to our practices or
          legal obligations. The date at the top of this page indicates when it
          was last revised.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
