import './LegalPage.css';

export default function PrivacyPolicy({ onBack }) {
  return (
    <div className="legal-page">
      {/* ─── Top bar ─── */}
      <div className="legal-page__topbar">
        <a
          href="/"
          className="legal-page__back"
          onClick={(e) => {
            if (onBack) { e.preventDefault(); onBack(); }
          }}
        >
          &larr; Back to Home
        </a>
        <span className="legal-page__wordmark">Achilles Analytics</span>
      </div>

      {/* ─── Content ─── */}
      <div className="legal-page__content">
        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__effective">Effective: March 30, 2026</p>

        {/* 1. Introduction */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">1. Introduction</h2>
          <p>
            Achilles Analytics ("we," "us," or "our") is a Canadian open-source
            intelligence (OSINT) and analytical services company. We provide a
            platform and consulting services that transform fragmented data into
            structured foresight for organizations operating in complex
            information environments.
          </p>
          <p>
            This Privacy Policy describes how we collect, use, and protect your
            personal information when you interact with our website at
            achillesanalytics.ca and our services.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">2. Information We Collect</h2>
          <p>
            We collect minimal personal information, limited to what you
            voluntarily provide:
          </p>
          <ul>
            <li>
              <strong>Contact form submissions.</strong> Your name, email
              address, and message content. Our contact form uses a direct
              mailto: link; no data is stored on our servers from form
              submissions.
            </li>
            <li>
              <strong>Platform usage data.</strong> If you access our
              analytical platform, we may collect usage data necessary for
              service delivery, security, and performance.
            </li>
          </ul>
          <p>
            We do not use cookies, tracking pixels, or any third-party analytics
            services on our website.
          </p>
        </section>

        {/* 3. How We Use Your Information */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">3. How We Use Your Information</h2>
          <p>
            Personal information collected is used exclusively for:
          </p>
          <ul>
            <li>Responding to your inquiries and facilitating business communication</li>
            <li>Delivering and improving our platform and analytical services</li>
            <li>Ensuring the security and integrity of our systems</li>
            <li>Complying with applicable legal obligations</li>
          </ul>
        </section>

        {/* 4. Third Parties */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">4. Third Parties</h2>
          <p>
            We do not share, sell, or disclose your personal information to any
            third parties for marketing or advertising purposes. We do not use
            third-party analytics, advertising networks, or tracking services.
          </p>
          <p>
            All fonts and assets used on this website are self-hosted. No
            external requests are made to third-party content delivery networks
            when you visit our site.
          </p>
          <p>
            Personal information may be disclosed only when required by law,
            court order, or governmental regulation.
          </p>
        </section>

        {/* 5. Data Storage & Security */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">5. Data Storage & Security</h2>
          <p>
            All data associated with our services is stored and processed within
            Canada. We implement industry-standard technical and organizational
            safeguards to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction.
          </p>
          <p>
            While no method of transmission or storage is entirely secure, we
            take reasonable measures to ensure the protection of your data
            commensurate with its sensitivity.
          </p>
        </section>

        {/* 6. Your Rights */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">6. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Request access to any personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Withdraw consent for processing where consent is the legal basis</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:contact@achilles-analytics.com">
              contact@achilles-analytics.com
            </a>.
            We will respond to all requests within 30 days.
          </p>
        </section>

        {/* 7. Quebec Law 25 */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">7. Quebec Law 25 Compliance</h2>
          <p>
            In accordance with Quebec's Act Respecting the Protection of
            Personal Information in the Private Sector (Law 25), Achilles
            Analytics has designated a privacy officer responsible for overseeing
            compliance with applicable privacy legislation.
          </p>
          <p>
            We are committed to transparency regarding our data practices and
            will conduct privacy impact assessments as required. Inquiries or
            complaints regarding our privacy practices may be directed to our
            privacy officer at{' '}
            <a href="mailto:contact@achilles-analytics.com">
              contact@achilles-analytics.com
            </a>.
          </p>
        </section>

        {/* 8. International Users (GDPR) */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">8. International Users (GDPR)</h2>
          <p>
            If you are located in the European Union or European Economic Area,
            you have additional rights under the General Data Protection
            Regulation (GDPR), including:
          </p>
          <ul>
            <li>The right to data portability</li>
            <li>The right to restrict processing</li>
            <li>The right to object to processing</li>
            <li>The right to lodge a complaint with a supervisory authority</li>
          </ul>
          <p>
            Where we process your personal information, we do so on the legal
            basis of legitimate interest (responding to your inquiries and
            providing our services) or your explicit consent. You may withdraw
            consent at any time by contacting us.
          </p>
        </section>

        {/* 9. Changes to This Policy */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy to reflect changes in our
            practices or applicable law. When we make material changes, we will
            update the effective date at the top of this page. We encourage you
            to review this policy periodically.
          </p>
        </section>

        {/* 10. Contact */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">10. Contact</h2>
          <p>
            For questions, concerns, or requests regarding this Privacy Policy
            or our data practices, contact us at:
          </p>
          <p>
            <a href="mailto:contact@achilles-analytics.com">
              contact@achilles-analytics.com
            </a>
          </p>
          <p>
            Achilles Analytics<br />
            Canada
          </p>
        </section>
      </div>

      {/* ─── Footer mark ─── */}
      <div className="legal-page__footer">
        <p className="legal-page__footer-text">
          &copy; 2026 Achilles Analytics &middot; All rights reserved
        </p>
      </div>
    </div>
  );
}
