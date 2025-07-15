"use client";
import React from "react";
import { useState } from "react";


// Blog
const blogItems = [
  {
    id: 0,
    title: 'Breaking Barriers in Thanjavur: How Meena Turned Her Kitchen into a Profitable Empire',
    description:
      'From murukku to movement: how Meena built a thriving millet-based business from home and became a beacon of hope for women entrepreneurs.',
    date: 'July 9, 2025',
    author: 'Staff Writer',
    image: './assets/images/blogimg/bm5.jpg',
    coverImage: '',
    category: ['Women & Enterprise', 'Food Startups', 'Inspiration'],
    comingSoon: false,
    fullContent: (
      <>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Breaking Barriers in Thanjavur: How Meena Turned Her Kitchen into a Profitable Empire
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            By <span className="font-medium text-gray-700">Staff Writer</span> |{' '}
            <span className="text-pink-600 font-medium">Women & Enterprise</span> | July 2025
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-start">
          <div>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              In a quiet lane of Thanjavur, amidst the scent of agarbatti and jasmine, lives{' '}
              <span className="font-semibold">Meena Subramaniam</span> — a homemaker turned entrepreneur
              who is now inspiring a generation of women to dream beyond the walls of their homes.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              What began as a modest effort to sell her signature millet snacks has grown into{' '}
              <span className="italic font-medium">“Meena’s Millet Magic”</span>, a thriving homegrown
              brand that today serves customers across Tamil Nadu.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              But Meena’s journey didn’t begin with capital or connections. It began with a question —
              one that many women quietly ask themselves: <em>“Can I start something of my own?”</em>
            </p>
          </div>
          <img
            src="/assets/images/blogimg/bm5.jpg"
            alt="Meena in her kitchen"
            className="rounded-xl shadow-md border border-gray-200"
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">The Spark in the Everyday</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          Meena, 34, spent years perfecting traditional recipes passed down from her grandmother.
          Thinai murukku, kambu laddu, ragi mixture — her kitchen was always filled with the crackle
          of frying pans and the fragrance of roasted grains.
        </p>
        <p className="mb-6 text-gray-800 leading-relaxed">
          It wasn’t until her daughter brought home a school project on women-led startups that Meena
          seriously considered turning her culinary skills into a business. “It was like looking in a
          mirror,” Meena recalls. “I saw stories of women like me who started with nothing — and built
          something meaningful.”
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">From Kitchen Table to Business Table</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          With encouragement from her family, Meena took her first step by registering her business
          under the <span className="font-semibold">Udyam MSME scheme</span>, a free government
          registration that opened the door to various small business benefits.
        </p>
        <p className="mb-6 text-gray-800 leading-relaxed">
          She attended a one-day orientation by the Tamil Nadu Startup and Innovation Mission (TANSIM)
          and learned about licensing, branding, and digital marketing. Next came the{' '}
          <span className="font-semibold">FSSAI license</span> and <span className="font-semibold">GST</span> registration,
          even though her turnover didn’t require it yet.
          <br /> <em>“If I was serious, I needed to be professional from day one.”</em>
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Financing the Dream — Without Breaking the Bank</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          Initially, Meena used just <span className="font-semibold">₹20,000</span> from her savings to get
          started. She began small — promoting her snacks on WhatsApp and Instagram.
        </p>
        <p className="mb-6 text-gray-800 leading-relaxed">
          When she was ready to scale, she visited the District Industries Centre and applied under the{' '}
          <span className="italic">UYEGP scheme</span>, where she was eligible for a 25% capital subsidy.
          With a ₹3 lakh loan, she bought packaging equipment, set up hygiene facilities, and hired
          two SHG women.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-start">
          <img
            src="/assets/images/blogimg/bm1.jpg"
            alt="Meena with her team"
            className="rounded-xl shadow-md border border-gray-200"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Scaling with Purpose</h3>
            <p className="text-gray-800 leading-relaxed">
              As orders grew, so did Meena’s vision. Today she employs six women, supplies organic
              stores in Thanjavur and Tiruchirapalli, and even launched an online store with her
              daughter using Shopify.
              <br />
              <br />
              <em>“I still roast every batch of laddu myself,”</em> Meena smiles, “but now we deliver
              with barcoded labels and paper-based eco packaging.”
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Lessons from Meena's Journey</h3>
            <ul className="list-disc list-inside ml-4 mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
              <li>Start Lean: Begin with what you have. Test your product in a small market first.</li>
              <li>
                Use Government Schemes: Tamil Nadu offers numerous programs like UYEGP, NEEDS, and SHG
                bank linkage support.
              </li>

            </ul>
          </div>
        </div>



        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">The Road Ahead</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          Meena dreams of going national — not just to expand her brand but to empower others through
          franchise models. <em>“If we can build a millet revolution from our kitchens,”</em> she says,{' '}
          <span className="font-semibold">“why not?”</span>
        </p>
        <p className="mb-6 text-gray-800 leading-relaxed">
          Her story is not just about snacks. It’s about breaking invisible walls and showing that the
          heart of Tamil Nadu’s economy might just beat strongest in the hands of its women.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Want to Start Like Meena? Here's Your Checklist</h3>
        <ul className="list-disc list-inside ml-4 mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
          <li>✅ Udyam Registration (Free MSME portal)</li>
          <li>✅ FSSAI License for food</li>
          <li>✅ Local Shop License</li>
          <li>✅ Join SHGs for peer support</li>
          <li>✅ Apply for UYEGP / PMEGP loans</li>
          <li>✅ Use free platforms: WhatsApp, Instagram, Meesho</li>
          <li>✅ Attend EDII-TN training with We Can Voice for Women Foundation support</li>
        </ul>
      </>
    ),
  },
  {
    id: 1, // Assuming this would be the next ID after 0
    title: 'Starting a Business for Women in Tamil Nadu: A Complete Guide',
    description:
      'A comprehensive guide for women entrepreneurs in Tamil Nadu, covering registrations, government schemes, funding options, and profitable business ideas.',
    date: 'July 9, 2025',
    author: 'Staff Writer',
    image: '/assets/images/blogimg/bm6.jpg', // Placeholder image, you might need to create this
    coverImage: '',
    category: ['Women & Enterprise', 'Business Guide', 'Startups'],
    comingSoon: false,
    fullContent: (
      <>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🌟 Starting a Business for Women in Tamil Nadu: A Complete Guide
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            By <span className="font-medium text-gray-700">Staff Writer</span> |{' '}
            <span className="text-pink-600 font-medium">Women & Enterprise</span> | July 2025
          </p>
        </div>

        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Tamil Nadu has emerged as one of the leading states in India, promoting women entrepreneurship,
          offering a variety of support schemes, low-interest loans, and a vibrant market ecosystem.
          Whether you want to start small or scale big, the state offers ample opportunity.
        </p>

        {/* --- */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          ✅ Basic Requirements to Start a Business
        </h2>
        <ul className="list-disc list-inside ml-4 mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
          <li>
            <strong>Business Idea & Plan:</strong> Choose a business that aligns with your skills,
            interest, and market demand. Draft a business plan covering products/services, target
            market, budget, location, and marketing strategy.
          </li>
          <li>
            <strong>Capital:</strong> Decide how much initial capital is needed (can start with
            personal savings, government schemes, or bank loans).
          </li>
          <li>
            <strong>Location:</strong> Decide whether you will operate from home, a rented shop, or
            online.
          </li>
          <li>
            <strong>Legal Structure:</strong> Choose the right legal form:
            <ul className="list-circle list-inside ml-8 mt-1 space-y-1">
              <li>Sole Proprietorship (ideal for small businesses)</li>
              <li>Partnership or LLP</li>
              <li>Private Limited Company</li>
              <li>Self Help Group (SHG) based businesses</li>
            </ul>
          </li>
        </ul>

        {/* --- */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          📝 Mandatory Registrations
        </h2>
        <p className="mb-4 text-gray-800 leading-relaxed">
          Here are the common registrations required:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Registration
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-6 text-gray-800">Udyam Registration (MSME)</td>
                <td className="py-4 px-6 text-gray-800">
                  Mandatory for small businesses; enables access to schemes. Free registration on{' '}
                  <a
                    href="https://udyamregistration.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    udyamregistration.gov.in
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">PAN & TAN</td>
                <td className="py-4 px-6 text-gray-800">
                  Required for opening business bank accounts and tax filings.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">GST Registration</td>
                <td className="py-4 px-6 text-gray-800">
                  Required if turnover exceeds ₹40 lakh (₹20 lakh for service businesses). Optional
                  for lower turnover.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Shops & Establishment License</td>
                <td className="py-4 px-6 text-gray-800">
                  Mandatory if you operate a physical shop or office. Obtain from the local
                  municipality.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">FSSAI License</td>
                <td className="py-4 px-6 text-gray-800">
                  Mandatory for food-related businesses.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Trade License</td>
                <td className="py-4 px-6 text-gray-800">Issued by local municipal authorities.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Professional Tax Registration</td>
                <td className="py-4 px-6 text-gray-800">If you have employees.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          💰 Government Assistance & Business Loans
        </h2>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
          1. Tamil Nadu State Government Schemes
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Scheme
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Benefits
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  Tamil Nadu Startup and Innovation Mission (TANSIM)
                </td>
                <td className="py-4 px-6 text-gray-800">
                  Support for startups including mentoring and funding.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  Unemployed Youth Employment Generation Programme (UYEGP)
                </td>
                <td className="py-4 px-6 text-gray-800">
                  Loan up to ₹10 lakh with 25% subsidy for women.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  New Entrepreneur-cum-Enterprise Development Scheme (NEEDS)
                </td>
                <td className="py-4 px-6 text-gray-800">
                  For graduates (21–35 years). Loan up to ₹1 crore with 25% subsidy and training
                  support.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  Self Help Group (SHG) Loans through Tamil Nadu Corporation for Development of Women
                </td>
                <td className="py-4 px-6 text-gray-800">
                  Easy loans to SHGs for starting businesses.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
          2. Central Government Schemes for Women
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Scheme
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-6 text-gray-800">Stand Up India</td>
                <td className="py-4 px-6 text-gray-800">
                  Loan from ₹10 lakh to ₹1 crore for women entrepreneurs from banks.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Mudra Loan (PMMY)</td>
                <td className="py-4 px-6 text-gray-800">
                  Up to ₹10 lakh under Shishu, Kishore, and Tarun categories. No collateral required.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Mahila Coir Yojana</td>
                <td className="py-4 px-6 text-gray-800">
                  Financial support for women in coir industry.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">NSIC Women Scheme</td>
                <td className="py-4 px-6 text-gray-800">
                  Marketing and raw material assistance for MSMEs owned by women.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          💡 Is It Possible to Start a Business Without a Loan?
        </h2>
        <p className="mb-4 text-gray-800 leading-relaxed">
          Yes! Many women entrepreneurs begin without loans by adopting the following strategies:
        </p>
        <ul className="list-disc list-inside ml-4 mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
          <li>
            <strong>Start Small (Low Capital):</strong> Begin from home or online. Use personal
            savings or borrow from family.
          </li>
          <li>
            <strong>Crowdfunding:</strong> Raise funds through platforms like Ketto or Milaap for
            socially impactful ideas.
          </li>
          <li>
            <strong>Partnership with Friends/Family:</strong> Share investment and profits.
          </li>
          <li>
            <strong>Use SHG Platform:</strong> Women Self Help Groups in Tamil Nadu provide internal
            loaning and group savings.
          </li>
          <li>
            <strong>Preorders and Advance Payments:</strong> Sell via Instagram/WhatsApp and take
            advance payments before producing goods.
          </li>
        </ul>

        {/* --- */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          🏆 Most Profitable Business Ideas for Women in Tamil Nadu
        </h2>
        <p className="mb-4 text-gray-800 leading-relaxed">
          Here are some high-profit, low-investment business ideas ideal for women in Tamil Nadu:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Business Type
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Estimated Investment
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Profit Potential
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-6 text-gray-800">Homemade Food / Tiffin Services</td>
                <td className="py-4 px-6 text-gray-800">₹10,000–₹50,000</td>
                <td className="py-4 px-6 text-gray-800">High (Daily income)</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Tailoring & Boutique</td>
                <td className="py-4 px-6 text-gray-800">₹25,000–₹1 lakh</td>
                <td className="py-4 px-6 text-gray-800">High</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  Handmade Products (jewelry, candles, soaps)
                </td>
                <td className="py-4 px-6 text-gray-800">₹10,000–₹30,000</td>
                <td className="py-4 px-6 text-gray-800">Medium to High</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Beauty Parlour / Home Salon</td>
                <td className="py-4 px-6 text-gray-800">₹50,000–₹2 lakh</td>
                <td className="py-4 px-6 text-gray-800">Very High</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Online Reselling (Meesho, Amazon)</td>
                <td className="py-4 px-6 text-gray-800">₹0–₹20,000</td>
                <td className="py-4 px-6 text-gray-800">High (No inventory needed)</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  Digital Marketing Services / Content Writing
                </td>
                <td className="py-4 px-6 text-gray-800">₹10,000</td>
                <td className="py-4 px-6 text-gray-800">High (Service based)</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">Daycare or Playschool</td>
                <td className="py-4 px-6 text-gray-800">₹1–3 lakh</td>
                <td className="py-4 px-6 text-gray-800">Medium</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  Millet-based snacks / Organic Food Business
                </td>
                <td className="py-4 px-6 text-gray-800">₹30,000+</td>
                <td className="py-4 px-6 text-gray-800">High</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-800">
                  Agro-based or Herbal Farming (e.g., Aloe Vera, Mushroom)
                </td>
                <td className="py-4 px-6 text-gray-800">Varies</td>
                <td className="py-4 px-6 text-gray-800">Very High if scaled</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          🛠 Step-by-Step Summary for Starting a Business in Tamil Nadu
        </h2>
        <ul className="list-disc list-inside ml-4 mb-6 text-gray-700 space-y-2 text-lg leading-relaxed">
          <li>Choose your business idea</li>
          <li>Make a business plan</li>
          <li>Get Udyam and other necessary registrations</li>
          <li>Open a current account in your business name</li>
          <li>Apply for subsidies/loans (if needed)</li>
          <li>Market your business (use social media, word of mouth, local networks)</li>
          <li>Scale gradually and track profits</li>
        </ul>

        {/* --- */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          🤝 Final Tips for Women Entrepreneurs
        </h2>
        <ul className="list-disc list-inside ml-4 mb-10 text-gray-700 space-y-2 text-lg leading-relaxed">
          <li>Start small but be consistent</li>
          <li>Use government training programs (e.g., EDII-TN)</li>
          <li>Join women entrepreneur groups for support</li>
          <li>Use the Tamil Nadu Industrial Guidance Bureau for queries</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    title: 'A Complete Guide for Pregnant Women and New Mothers',
    description:
      'From conception to childbirth and beyond, this detailed guide covers essential foods, exercises, and care tips for expecting and new moms.',
    date: 'July 9, 2025',
    author: 'Staff Writer',
    image: '/assets/images/blogimg/bm3.jpg',
    coverImage: '',
    category: ['Motherhood', 'Health & Wellness', 'Pregnancy Guide'],
    comingSoon: false,
    fullContent: (
      <>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            A Complete Guide for Pregnant Women and New Mothers
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            By <span className="font-medium text-gray-700">Staff Writer</span> |{' '}
            <span className="text-pink-600 font-medium">Motherhood</span> | July 2025
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Introduction</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          Pregnancy is a transformative journey in a woman’s life, both physically and emotionally. From the moment a woman conceives until the baby is born and beyond, she needs to follow healthy practices to ensure both her and the baby’s well-being. This guide outlines essential practices, foods, exercises, and tips for pregnant women and new mothers, along with practical examples.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">🍼 Part 1: From the First Month to Childbirth</h3>
        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">1.1 Monthly Guidelines During Pregnancy</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>First Trimester (1–3 Months):</strong> Visit a doctor, begin folic acid, manage morning sickness with small meals and rest. <br />Example: Riya used ginger water and dry toast to ease nausea.</li>
          <li><strong>Second Trimester (4–6 Months):</strong> Focus on iron/calcium-rich foods, begin light exercise, and get routine checkups.</li>
          <li><strong>Third Trimester (7–9 Months):</strong> Prioritize nutrient-dense foods, monitor health, and practice labor prep like breathing exercises and squats. <br />Example: Meena practiced squats and breathing with her physiotherapist.</li>
        </ul>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">1.2 Recommended Foods</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Whole Grains:</strong> Brown rice, oats – energy and fiber</li>
          <li><strong>Vegetables:</strong> Spinach, broccoli – iron and vitamins</li>
          <li><strong>Fruits:</strong> Apples, bananas – hydration and antioxidants</li>
          <li><strong>Proteins:</strong> Eggs, dal, paneer – supports growth</li>
          <li><strong>Dairy:</strong> Milk, curd – calcium and Vitamin D</li>
          <li><strong>Healthy Fats:</strong> Nuts, ghee – brain development</li>
        </ul>
        <p className="text-gray-800 mt-2">Drink 2.5–3 litres of water per day.</p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">1.3 Foods to Avoid</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Raw or undercooked meat/eggs/seafood</li>
          <li>High-mercury fish (e.g., shark, swordfish)</li>
          <li>Unpasteurized dairy, excess caffeine, alcohol, smoking</li>
          <li>Papaya and pineapple in early pregnancy (consult doctor)</li>
        </ul>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">1.4 Safe Exercises</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Walking:</strong> 20–30 min/day – improves circulation</li>
          <li><strong>Prenatal Yoga:</strong> Cat-cow, butterfly pose – flexibility</li>
          <li><strong>Breathing Exercises:</strong> Deep breathing – reduces stress</li>
          <li><strong>Kegels:</strong> Strengthens pelvic muscles</li>
        </ul>
        <p className="text-gray-800 mt-2">Always consult a doctor before starting.</p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">1.5 Tips for a Healthy Delivery</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Stay active with walking and squats (if approved)</li>
          <li>Eat nourishing foods like garlic soup, ghee rice</li>
          <li>Stay calm with meditation or reading</li>
          <li>Practice labor breathing (e.g., Lamaze)</li>
          <li>Limit processed/junk foods</li>
          <li>Emotional support from family is vital</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">🤱 Part 2: After Childbirth – Nutrition for New Mothers</h3>
        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">2.1 Foods That Boost Recovery & Milk Production</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Fenugreek – boosts lactation</li>
          <li>Garlic – anti-inflammatory</li>
          <li>Ragi porridge – calcium & iron</li>
          <li>Moong dal khichdi – light and nourishing</li>
          <li>Dry fruit laddoos – energy booster</li>
          <li>Ajwain water – reduces gas</li>
          <li>Leafy vegetables – iron-rich</li>
        </ul>
        <p className="text-gray-800 mt-2">Example: Priya had ajwain water and ghee laddoos daily to support recovery and breastfeeding.</p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">2.2 Foods to Avoid</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Cold foods & aerated drinks</li>
          <li>Oily, spicy meals</li>
          <li>Caffeine, alcohol, tobacco</li>
          <li>Fried/heavy foods (can upset baby’s digestion)</li>
        </ul>
        <p className="text-gray-800 mt-2">Note: Traditional Indian diets use warm, home-cooked meals with ghee and spices for postpartum healing.</p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">👶 Part 3: Feeding the Baby</h3>
        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">3.1 0–6 Months: Exclusive Breastfeeding</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Only breast milk — no water or formula unless advised</li>
          <li>Feeds 8–12 times/day; rich in nutrients and immunity</li>
          <li>Hold baby upright after feeding to prevent colic</li>
        </ul>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">3.2 6 Months Onward: Complementary Feeding</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>6–7 months:</strong> Mashed banana, rice water, boiled veggies</li>
          <li><strong>7–8 months:</strong> Suji kheer, mashed dal, apple puree</li>
          <li><strong>8–10 months:</strong> Idli, khichdi with vegetables, curd</li>
          <li><strong>10–12 months:</strong> Soft chapati with dal, soft fruits</li>
        </ul>
        <p className="text-gray-800 mt-2">
          Avoid: salt, sugar, honey (till 1 year), cow’s milk, whole nuts, processed foods. Watch for allergies.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Conclusion</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          Motherhood begins not at birth but at conception. With mindful food choices, movement, and emotional care, women can enjoy a safer and smoother journey. The postpartum phase is just as important — a time to heal, bond, and nurture. Every stage, from morning sickness to the baby’s first bite, is a beautiful step in the mother’s story.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: 'Women’s Rights and Legal Protections in India: A Complete Overview',
    description:
      'A thorough guide to key Indian laws protecting women’s rights — from inheritance to workplace safety and protection against domestic violence.',
    date: 'July 9, 2025',
    author: 'Staff Writer',
    image: '/assets/images/blogimg/bm8.jpg',
    coverImage: '',
    category: ['Indian Law', 'Women’s Rights', 'Legal Awareness'],
    comingSoon: false,
    fullContent: (
      <>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Women’s Rights and Legal Protections in India: A Complete Overview
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            By <span className="font-medium text-gray-700">Staff Writer</span> |{' '}
            <span className="text-pink-600 font-medium">Indian Law</span> | July 2025
          </p>
        </div>

        <p className="mb-6 text-gray-800 leading-relaxed">
          India, as a constitutional democracy, guarantees equality and protection for all its citizens, irrespective of gender. Over the years, the country has enacted several progressive laws aimed at empowering women and protecting them from discrimination and abuse. This article explores key legislations that safeguard women's rights in India, focusing on property rights, the POSH Act, and the Protection of Women from Domestic Violence Act (PWDVA).
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">1. Equal Property Rights for Women in India</h3>
        <p className="mb-4 text-gray-800 leading-relaxed">
          <strong>The Hindu Succession (Amendment) Act, 2005</strong><br />
          Traditionally, under Hindu law, women were not treated equally when it came to inheritance of ancestral property. This changed with the 2005 amendment, which gave daughters equal rights as sons.
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Daughters are recognized as coparceners in the Hindu Undivided Family (HUF), just like sons.</li>
          <li>They have equal rights and liabilities in property matters.</li>
          <li>Rights exist by birth, not by marriage or father’s consent.</li>
          <li>Applies even to daughters born before 2005, if the father was alive on or after Sept 9, 2005.</li>
        </ul>
        <p className="mt-2 text-gray-700">
          <strong>Legal Reference:</strong> The Hindu Succession Act, 1956, amended by Act 39 of 2005
        </p>
        <p className="mt-2 text-gray-800">
          <strong>Impact:</strong> A landmark move toward gender equality in property rights, helping eliminate centuries of legal bias.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">2. POSH Act: Sexual Harassment at Workplace</h3>
        <p className="mb-4 text-gray-800 leading-relaxed">
          <strong>The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</strong><br />
          Known as the POSH Act, this law ensures a safe, harassment-free working environment for women.
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Defines sexual harassment to include physical, verbal, and non-verbal misconduct.</li>
          <li>Mandates Internal Complaints Committees (ICC) in all workplaces with 10+ employees.</li>
          <li>Inquiry must be completed within 90 days.</li>
          <li>Applies to both organized and unorganized sectors, including domestic workers.</li>
          <li>Penalties apply for false complaints or non-compliance by employers.</li>
        </ul>
        <p className="mt-2 text-gray-700">
          <strong>Legal Reference:</strong> POSH Act, 2013
        </p>
        <p className="mt-2 text-gray-800">
          <strong>Significance:</strong> Empowers women to report workplace harassment without fear, promoting dignity and equality at work.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">3. Protection from Domestic Violence (PWDVA), 2005</h3>
        <p className="mb-4 text-gray-800 leading-relaxed">
          <strong>The Protection of Women from Domestic Violence Act, 2005</strong><br />
          This civil law offers immediate protection to women facing abuse in domestic settings — including married women, partners, mothers, and sisters.
        </p>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>Recognizes physical, emotional, sexual, and economic abuse.</li>
          <li>Women can seek protection orders, residence rights, maintenance, custody, and compensation.</li>
          <li>No FIR required — civil remedies are available directly through Protection Officers or Magistrates.</li>
          <li>Enables quick resolution without criminal proceedings.</li>
        </ul>
        <p className="mt-2 text-gray-700">
          <strong>Legal Reference:</strong> Protection of Women from Domestic Violence Act, 2005
        </p>
        <p className="mt-2 text-gray-800">
          <strong>Impact:</strong> Establishes that domestic abuse is not just a family matter but a violation of human rights.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Other Notable Laws for Women</h3>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Dowry Prohibition Act, 1961:</strong> Outlaws giving or receiving dowry.</li>
          <li><strong>Maternity Benefit Act, 1961 (amended 2017):</strong> Ensures 26 weeks of paid maternity leave.</li>
          <li><strong>Equal Remuneration Act, 1976:</strong> Equal pay for equal work.</li>
          <li><strong>Prohibition of Child Marriage Act, 2006:</strong> Declares child marriages voidable and punishable.</li>
          <li><strong>Medical Termination of Pregnancy (Amendment) Act, 2021:</strong> Allows abortions up to 24 weeks in special cases.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Conclusion</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          India has made significant legal progress in protecting women’s rights — from ancestral property to safe workspaces and domestic safety. But awareness, enforcement, and cultural change are key. These laws must not only exist on paper but be implemented with urgency and integrity, ensuring that every woman in India can live with dignity, safety, and equality.
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">References</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>The Hindu Succession (Amendment) Act, 2005</li>
          <li>POSH Act, 2013 – Text and Guidelines</li>
          <li>Protection of Women from Domestic Violence Act, 2005</li>
          <li>National Commission for Women – Laws for Women</li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    title: 'Cancer in Women: Risks, Prevention, Early Detection, and Treatment',
    description:
      'Understand why women are more vulnerable to certain types of cancer, and explore key strategies for prevention, screening, and treatment.',
    date: 'July 9, 2025',
    author: 'Staff Writer',
    image: '/assets/images/blogimg/bm9.jpg',
    coverImage: '',
    category: ['Health', 'Women’s Health', 'Cancer Awareness'],
    comingSoon: false,
    fullContent: (
      <>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Cancer in Women: Risks, Prevention, Early Detection, and Treatment
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            By <span className="font-medium text-gray-700">Staff Writer</span> |{' '}
            <span className="text-pink-600 font-medium">Health</span> | July 2025
          </p>
        </div>

        <p className="mb-6 text-gray-800 leading-relaxed">
          Cancer is a major global health issue and one of the leading causes of death among women worldwide. While both men and women are at risk, women are more susceptible to certain types of cancer due to biological, hormonal, genetic, and lifestyle factors. This article explores why women may be more prone to cancer, the common types they face, prevention strategies, early detection methods, and available treatments.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Why Are Women More Susceptible to Cancer?</h3>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Hormonal Factors:</strong> Estrogen and progesterone influence breast and reproductive system cancers.</li>
          <li><strong>Reproductive History:</strong> Early menstruation, late menopause, and not having children raise risks.</li>
          <li><strong>Genetic Predisposition:</strong> BRCA1 and BRCA2 mutations increase breast and ovarian cancer risk.</li>
          <li><strong>Lifestyle Factors:</strong> Smoking, obesity, alcohol, poor diet, and inactivity contribute to cancer risk.</li>
          <li><strong>Infections:</strong> HPV (cervical cancer), Hepatitis B/C (liver cancer).</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Common Types of Cancer in Women</h3>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Breast Cancer:</strong> Most common in women; risks include age, family history, lifestyle, and genetics.</li>
          <li><strong>Cervical Cancer:</strong> Caused by persistent HPV infection; preventable with vaccine and screening.</li>
          <li><strong>Ovarian Cancer:</strong> Often silent; linked to family history and BRCA mutations.</li>
          <li><strong>Endometrial Cancer:</strong> Associated with obesity, PCOS, and estrogen therapy.</li>
          <li><strong>Lung Cancer:</strong> Increasing due to smoking and pollution; high female mortality.</li>
          <li><strong>Colorectal Cancer:</strong> On the rise among young women; linked to diet, lifestyle, and genes.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Can Cancer Be Prevented?</h3>
        <p className="mb-4 text-gray-800 leading-relaxed">Yes—many cancers are preventable with the right strategies.</p>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Vaccination:</strong> HPV and Hepatitis B vaccines reduce risks of cervical and liver cancers.</li>
          <li><strong>Healthy Lifestyle:</strong> Avoid smoking, limit alcohol, maintain weight, eat plant-based diet, and exercise regularly.</li>
          <li><strong>Regular Screening:</strong> Enables early detection and better outcomes for breast, cervical, and colon cancers.</li>
          <li><strong>Genetic Testing:</strong> BRCA screening can help guide preventive steps in high-risk women.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">How to Detect Cancer in the Early Stages</h3>
        <p className="mb-4 text-gray-800 leading-relaxed">Early detection dramatically improves survival. Key methods include:</p>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Mammography:</strong> X-ray screening for breast cancer, recommended for women aged 40–74.</li>
          <li><strong>Pap Smear & HPV Test:</strong> Detects precancerous changes in cervix; start at age 21.</li>
          <li><strong>Pelvic Exam & Ultrasound:</strong> Helpful for detecting ovarian or uterine cancers.</li>
          <li><strong>Colonoscopy:</strong> Start at age 45 to detect colon or rectal cancers early.</li>
          <li><strong>Low-Dose CT Scan:</strong> For lung cancer screening in high-risk individuals.</li>
          <li><strong>Self-Exams:</strong> Regular breast self-awareness can spot changes early.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Cancer Treatment Options</h3>
        <p className="mb-4 text-gray-800 leading-relaxed">Treatment depends on cancer type, stage, and health of the patient. Main approaches include:</p>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li><strong>Surgery:</strong> Removal of tumor; first-line for localized cancers.</li>
          <li><strong>Radiation Therapy:</strong> Destroys cancer cells with high-energy rays.</li>
          <li><strong>Chemotherapy:</strong> Drugs that kill fast-growing cancer cells.</li>
          <li><strong>Hormonal Therapy:</strong> Blocks hormone signals in hormone-sensitive cancers.</li>
          <li><strong>Targeted Therapy:</strong> Focuses on specific cancer cell mutations (e.g., HER2).</li>
          <li><strong>Immunotherapy:</strong> Stimulates immune system to attack cancer cells.</li>
          <li><strong>Precision Medicine:</strong> Tailored treatment based on genetic testing of the tumor.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Conclusion</h3>
        <p className="mb-6 text-gray-800 leading-relaxed">
          Cancer in women is a serious but increasingly manageable health issue when addressed early. Awareness, prevention, regular screenings, and access to timely care are essential. With scientific advances in treatment and personal empowerment through knowledge, more women can survive and thrive beyond a cancer diagnosis.
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">References</h4>
        <ul className="list-disc list-inside ml-4 text-gray-800 space-y-2">
          <li>World Health Organization (WHO) – www.who.int</li>
          <li>American Cancer Society – www.cancer.org</li>
          <li>National Cancer Institute – www.cancer.gov</li>
          <li>Centers for Disease Control and Prevention (CDC)</li>
          <li>International Agency for Research on Cancer (IARC)</li>
        </ul>
      </>
    ),
  },

];

{/* ---------------- BLOG SECTION ---------------- */ }
export default function Blogs() {
  const [selectedBlogIndex, setSelectedBlogIndex] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return (
    <div className="my-10 bg-pink-50 min-h-screen px-4 sm:px-6 py-12 rounded-lg shadow-md">
      {/* Main Blog + Smaller Blogs Layout */}
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Main Blog */}
        {blogItems[0] && (
          <div
            className="flex flex-col sm:flex-row items-center cursor-pointer p-6 rounded hover:bg-white transition max-w-4xl mx-auto"
            onClick={() => {
              setSelectedBlogIndex(0);
              setFullscreen(true);
            }}
          >
            {/* Image container */}
            <div className="w-full sm:w-[400px] h-64 sm:h-68 flex-shrink-0 rounded overflow-hidden">
              <img
                src={blogItems[0].image}
                alt={blogItems[0].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title container */}
            <div className="flex-grow mt-4 sm:mt-0 sm:ml-8 text-center sm:text-left">
              <h2
                className="text-lg font-normal text-pink-700 leading-snug overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  wordBreak: 'break-word',
                }}
              >
                {blogItems[0].title}
              </h2>
            </div>
          </div>
        )}

        {/* Smaller Blogs Grid (3 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {blogItems.slice(1, 5).map((blog, i) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition overflow-hidden flex flex-col sm:flex-row"
              onClick={() => {
                setSelectedBlogIndex(i + 1);
                setFullscreen(true);
              }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full sm:w-48 h-48 object-cover flex-shrink-0"
              />
              <div className="p-3 text-pink-700 font-semibold flex items-center justify-center text-center w-full">
                {blog.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen View */}
      {fullscreen && selectedBlogIndex !== null && (
        <div className="fixed inset-0 z-[60] pt-24 bg-white flex flex-col overflow-auto">
          {/* Content container fills entire screen */}
          <div className="relative z-10 w-full h-full p-6 flex flex-col">
            {/* Blog Content */}
            <div className="flex-grow overflow-y-auto mb-6">
              {blogItems[selectedBlogIndex].fullContent}
            </div>

            {/* Buttons at the Bottom */}
            <div className="flex justify-end gap-4 mt-auto">
              <button
                onClick={() => setFullscreen(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (selectedBlogIndex < blogItems.length - 1) {
                    setSelectedBlogIndex(selectedBlogIndex + 1);
                  }
                }}
                className={`px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition ${selectedBlogIndex === blogItems.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={selectedBlogIndex === blogItems.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
