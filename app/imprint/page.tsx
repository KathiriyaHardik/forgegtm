import type { Metadata } from "next";
import { LegalPage, LegalSection, Fill } from "@/components/LegalPage";

// TEMPLATE — an imprint carries legally mandated disclosures (in Germany,
// § 5 DDG / § 18 MStV). Every <Fill> must be replaced with real registered
// details and checked by a qualified lawyer for your jurisdiction.

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal disclosures and company information for ForgeGTM.",
  alternates: { canonical: "/imprint" },
  robots: { index: true, follow: true },
};

export default function ImprintPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Imprint"
      lastUpdated={<Fill>DD Month YYYY</Fill>}
    >
      <LegalSection heading="Company details">
        <p>
          <Fill>Registered company name</Fill>
          <br />
          <Fill>Street and number</Fill>
          <br />
          <Fill>Postcode, city</Fill>
          <br />
          <Fill>Country</Fill>
        </p>
      </LegalSection>

      <LegalSection heading="Represented by">
        <p>
          <Fill>Name of managing director / owner</Fill>
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Email: <Fill>hello@yourdomain.com</Fill>
          <br />
          Telephone: <Fill>+00 000 0000000</Fill>
        </p>
      </LegalSection>

      <LegalSection heading="Register entry">
        <p>
          Register court: <Fill>Registering court</Fill>
          <br />
          Registration number: <Fill>Registration number</Fill>
        </p>
      </LegalSection>

      <LegalSection heading="VAT identification number">
        <p>
          <Fill>VAT ID</Fill>
        </p>
      </LegalSection>

      <LegalSection heading="Responsible for editorial content">
        <p>
          <Fill>Name and address of responsible person</Fill>
        </p>
      </LegalSection>

      <LegalSection heading="Online dispute resolution">
        <p>
          The European Commission provides a platform for online dispute
          resolution at{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            className="text-accent underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
          . We are <Fill>willing / not willing</Fill> to participate in dispute
          resolution proceedings before a consumer arbitration board.
        </p>
      </LegalSection>

      <LegalSection heading="Liability for content and links">
        <p>
          We take care to keep the content of this site accurate and current,
          but we accept no liability for its completeness or accuracy. Our site
          contains links to external websites over whose content we have no
          control, and for which the respective operator is responsible.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
