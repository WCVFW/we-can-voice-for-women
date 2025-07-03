export default function FAQ() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-inter text-gray-800">
      <h1 className="text-4xl font-bold text-pink-700 mb-10 text-center lg:text-left">
        Frequently Asked Questions (FAQ)
      </h1>

      <section className="space-y-8 text-lg leading-relaxed">
        <p>
          <strong>We Can Voice for Women Foundation</strong>
        </p>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">1. What is We Can Voice for Women Foundation?</h2>
          <p>
            We are a grassroots NGO working to empower women and girls through education, healthcare, economic independence, and legal support. We focus on underserved communities in Chennai and surrounding regions.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">2. How can I donate to the foundation?</h2>
          <p>
            You can donate online through our official website or contact us directly for bank transfer and offline donation options.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">3. Are donations tax-deductible?</h2>
          <p>
            Yes, donations to We Can Voice for Women Foundation are eligible for tax deductions under applicable Indian tax laws. Receipts are issued upon confirmation of donation.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">4. Can I volunteer with the foundation?</h2>
          <p>
            Absolutely! We welcome volunteers from diverse backgrounds to contribute time, skills, and energy to our various programs. Visit our website or contact us to learn more.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">5. What programs do you run?</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Education and literacy for girls</li>
            <li>Health and hygiene awareness</li>
            <li>Vocational training and employment support</li>
            <li>Legal aid and counseling for women in crisis</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">6. Where do you operate?</h2>
          <p>
            Our primary operations are in Chennai, Tamil Nadu. We are expanding our outreach to nearby districts and rural regions in South India.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">7. How is my donation used?</h2>
          <p>
            100% of your donation is directed toward field programs, including education, healthcare, livelihood training, and crisis support for women and girls.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">8. Can I sponsor a specific project or beneficiary?</h2>
          <p>
            Yes, we offer options for targeted donations or sponsorships. Please contact us to discuss available opportunities.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">9. How do you ensure transparency and accountability?</h2>
          <p>
            We publish annual reports, maintain financial audits, and provide detailed program updates to stakeholders and donors.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-xl text-pink-700">10. How do I contact the Foundation?</h2>
          <p className="whitespace-pre-line">
            📍 Address:
            32, 1st Main Road, Ayyappa Nagar,, Virugambakkam, Chennai, Tamil Nadu 600092
          </p>
          <p>📞 Phone: +91 94448 88197</p>
          <p>
            ✉️ Email:{" "}
            <a
              href="mailto:support@wecanvoiceforwomen.org"
              className="underline text-pink-700"
            >
              support@wecanvoiceforwomen.org
            </a>
          </p>
          <p>
            🌐 Website:{" "}
            <a
              href="https://wecanvoiceforwomen.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-pink-700"
            >
              wecanvoiceforwomen.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}