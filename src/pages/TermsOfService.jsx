import './LegalPage.css';

export default function TermsOfService({ onBack }) {
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
        <h1 className="legal-page__title">Terms of Service</h1>
        <p className="legal-page__effective">Effective: March 30, 2026</p>

        {/* 1. Acceptance of Terms */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the website and services provided by Achilles
            Analytics ("we," "us," or "our"), you agree to be bound by these
            Terms of Service. If you do not agree to these terms, you must not
            access or use our services.
          </p>
        </section>

        {/* 2. Description of Service */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">2. Description of Service</h2>
          <p>
            Achilles Analytics operates an open-source intelligence (OSINT)
            platform and provides analytical tools and consulting services. Our
            services include intelligence collection, data analysis, risk
            assessment, and structured foresight derived from publicly available
            information sources.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any aspect
            of the service at any time without prior notice.
          </p>
        </section>

        {/* 3. Acceptable Use */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">3. Acceptable Use</h2>
          <p>
            You agree to use our services only for lawful purposes and in
            compliance with all applicable laws and regulations. Specifically,
            you must not:
          </p>
          <ul>
            <li>
              Use our services for illegal surveillance, harassment, stalking,
              or any activity that violates the privacy rights of individuals
            </li>
            <li>
              Engage in unauthorized data collection, scraping, or harvesting of
              personal information through our platform
            </li>
            <li>
              Attempt to gain unauthorized access to our systems, networks, or
              other users' accounts
            </li>
            <li>
              Use intelligence outputs to facilitate unlawful discrimination,
              intimidation, or coercion
            </li>
            <li>
              Redistribute, resell, or sublicense our services or outputs
              without prior written authorization
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate access for any user
            found to be in violation of these terms.
          </p>
        </section>

        {/* 4. Account Responsibilities */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">4. Account Responsibilities</h2>
          <p>
            If you create an account on our platform, you are responsible for
            maintaining the confidentiality of your credentials and for all
            activities conducted under your account. You agree to notify us
            immediately of any unauthorized use of your account or any other
            breach of security.
          </p>
          <p>
            We are not liable for any loss or damage arising from your failure
            to safeguard your account credentials.
          </p>
        </section>

        {/* 5. Intellectual Property */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">5. Intellectual Property</h2>
          <p>
            All content, analysis, methodologies, software, designs, and
            materials available through our website and platform are the
            exclusive property of Achilles Analytics or its licensors and are
            protected by applicable intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative
            works from any of our proprietary content without express written
            permission.
          </p>
        </section>

        {/* 6. Disclaimer */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">6. Disclaimer</h2>
          <p>
            Intelligence outputs, assessments, and analyses provided through our
            services are analytical assessments based on available open-source
            information. They are not actionable directives, legal advice, or
            guarantees of accuracy.
          </p>
          <p>
            Users must exercise independent professional judgment when
            interpreting or acting upon any intelligence product. Achilles
            Analytics does not warrant that its assessments are complete,
            current, or free from error. The operational environment is dynamic,
            and intelligence assessments reflect conditions at the time of
            analysis.
          </p>
          <p>
            Our services are provided "as is" and "as available" without
            warranties of any kind, either express or implied, including but not
            limited to warranties of merchantability, fitness for a particular
            purpose, or non-infringement.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Achilles
            Analytics and its officers, directors, employees, and agents shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages, including but not limited to loss of profits,
            data, business opportunities, or goodwill, arising from or related
            to your use of our services.
          </p>
          <p>
            In no event shall our total aggregate liability exceed the amount
            paid by you, if any, for access to our services during the twelve
            (12) months preceding the claim.
          </p>
        </section>

        {/* 8. Governing Law */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">8. Governing Law</h2>
          <p>
            These Terms of Service are governed by and construed in accordance
            with the laws of Canada and the applicable provincial laws. Any
            disputes arising under or in connection with these terms shall be
            subject to the exclusive jurisdiction of the courts of Canada.
          </p>
        </section>

        {/* 9. Termination */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">9. Termination</h2>
          <p>
            Either party may terminate access to services at any time. We may
            suspend or terminate your access immediately, without prior notice or
            liability, if we determine that you have breached these Terms of
            Service.
          </p>
          <p>
            Upon termination, your right to use our services ceases immediately.
            Provisions of these terms that by their nature should survive
            termination shall remain in effect, including intellectual property,
            disclaimer, and limitation of liability sections.
          </p>
        </section>

        {/* 10. Changes to Terms */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time.
            Changes will be effective upon posting the updated terms on our
            website. Your continued use of our services after changes are posted
            constitutes acceptance of the revised terms.
          </p>
          <p>
            We encourage you to review these terms periodically for any updates.
          </p>
        </section>

        {/* 11. Contact */}
        <section className="legal-page__section">
          <h2 className="legal-page__section-title">11. Contact</h2>
          <p>
            For questions or concerns regarding these Terms of Service, contact
            us at:
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
