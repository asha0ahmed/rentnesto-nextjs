'use client';

import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        padding: '48px 40px'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/">
            <img src="/logo.png" alt="RentNesto Logo" style={{ height: '50px', marginBottom: '20px' }} />
          </Link>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginBottom: '8px' }}>
            Terms & Conditions
          </h1>
          <p style={{ color: '#6b7280', fontSize: '15px' }}>
            Last updated: January 2026
          </p>
          <div style={{
            marginTop: '16px',
            background: '#dbeafe',
            borderRadius: '8px',
            padding: '12px 20px',
            color: '#1e40af',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            এই শর্তাবলী বাংলাদেশের তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬ (সংশোধিত ২০১৩) অনুযায়ী প্রণীত
          </div>
        </div>

        <Section title="1. গ্রহণযোগ্যতা / Acceptance of Terms">
          <p>RentNesto ("আমরা", "আমাদের") ব্যবহার করে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তাহলে অনুগ্রহ করে আমাদের প্ল্যাটফর্ম ব্যবহার বন্ধ করুন।</p>
          <p style={{ marginTop: '10px' }}>By accessing or using RentNesto, you agree to be bound by these Terms & Conditions. These terms comply with the <strong>Information and Communication Technology (ICT) Act 2006 (amended 2013)</strong> and the <strong>Digital Security Act 2018</strong> of Bangladesh.</p>
        </Section>

        <Section title="2. প্ল্যাটফর্মের বিবরণ / About the Platform">
          <p>RentNesto বাংলাদেশে বাড়ির মালিক এবং ভাড়াটিয়াদের সংযুক্ত করার একটি অনলাইন প্ল্যাটফর্ম। আমরা শুধুমাত্র একটি মাধ্যম — আমরা সরাসরি কোনো সম্পত্তি ভাড়া দিই না।</p>
          <p style={{ marginTop: '10px' }}>RentNesto is an online platform that connects property owners and tenants in Bangladesh. We are a marketplace only and do not own, manage, or rent any properties listed on our platform.</p>
        </Section>

        <Section title="3. ব্যবহারকারীর দায়িত্ব / User Responsibilities">
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>আপনাকে অবশ্যই সঠিক এবং সত্য তথ্য প্রদান করতে হবে।</li>
            <li>You must be at least <strong>18 years old</strong> to use this platform.</li>
            <li>বাড়ির মালিকরা তাদের সম্পত্তির বৈধ মালিক বা অনুমোদিত প্রতিনিধি হতে হবে।</li>
            <li>Property owners must have legal rights to list the property.</li>
            <li>ভুয়া বা বিভ্রান্তিকর তথ্য প্রদান সম্পূর্ণ নিষিদ্ধ এবং এটি বাংলাদেশের ডিজিটাল নিরাপত্তা আইন ২০১৮ অনুযায়ী শাস্তিযোগ্য অপরাধ।</li>
            <li>Providing false or misleading information is strictly prohibited and may constitute an offence under the <strong>Digital Security Act 2018</strong>.</li>
          </ul>
        </Section>

        <Section title="4. নিষিদ্ধ কার্যক্রম / Prohibited Activities">
          <p style={{ marginBottom: '10px' }}>নিম্নলিখিত কার্যক্রম সম্পূর্ণভাবে নিষিদ্ধ:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>ভুয়া বিজ্ঞাপন বা প্রতারণামূলক তথ্য প্রচার করা</li>
            <li>Posting fake listings or fraudulent information</li>
            <li>অন্য ব্যবহারকারীকে হয়রানি বা ভয় দেখানো</li>
            <li>Harassing or threatening other users</li>
            <li>অবৈধ উদ্দেশ্যে প্ল্যাটফর্ম ব্যবহার করা</li>
            <li>Using the platform for any illegal purpose</li>
            <li>অন্যের ব্যক্তিগত তথ্য অনুমতি ছাড়া সংগ্রহ বা ব্যবহার করা</li>
            <li>Collecting or misusing other users' personal data without consent</li>
            <li>স্প্যাম বা ম্যালওয়্যার ছড়ানো</li>
            <li>Distributing spam or malware</li>
          </ul>
          <p style={{ marginTop: '12px', color: '#dc2626', fontWeight: '600' }}>
            এই নিয়ম লঙ্ঘন করলে অ্যাকাউন্ট স্থায়ীভাবে বন্ধ করা হবে এবং প্রয়োজনে আইনি ব্যবস্থা নেওয়া হবে।
          </p>
        </Section>

        <Section title="5. আর্থিক লেনদেন / Financial Transactions">
          <div style={{
            background: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <p style={{ fontWeight: '700', color: '#92400e', fontSize: '16px' }}>
              ⚠️ গুরুত্বপূর্ণ সতর্কতা
            </p>
            <p style={{ color: '#78350f', marginTop: '8px' }}>
              বাড়ির মালিকের সাথে কোনো আর্থিক লেনদেনের পূর্বে অবশ্যই সশরীরে উপস্থিত হয়ে বাসা দেখার অনুরোধ করা হল। অনলাইনে অগ্রিম টাকা পাঠাবেন না।
            </p>
          </div>
          <p>RentNesto কোনো আর্থিক লেনদেনে সরাসরি অংশগ্রহণ করে না। বাড়ির মালিক ও ভাড়াটিয়ার মধ্যে যেকোনো আর্থিক চুক্তি সম্পূর্ণভাবে তাদের নিজেদের দায়িত্বে হবে।</p>
          <p style={{ marginTop: '10px' }}>RentNesto is not a party to any financial transaction between owners and tenants. All payments and agreements are solely between the parties involved.</p>
        </Section>

        <Section title="6. দায়বদ্ধতার সীমা / Limitation of Liability">
          <p>RentNesto নিম্নলিখিত বিষয়ে দায়ী নয়:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', marginTop: '10px' }}>
            <li>তালিকাভুক্ত সম্পত্তির তথ্যের সত্যতা</li>
            <li>Accuracy of property listings provided by owners</li>
            <li>মালিক বা ভাড়াটিয়ার আচরণ</li>
            <li>Any disputes between owners and tenants</li>
            <li>আর্থিক ক্ষতি বা প্রতারণা</li>
            <li>Any financial loss due to fraudulent listings</li>
          </ul>
        </Section>

        <Section title="7. অ্যাকাউন্ট বন্ধ / Account Termination">
          <p>আমরা যেকোনো সময় বিনা নোটিশে নিম্নলিখিত কারণে অ্যাকাউন্ট বন্ধ করার অধিকার রাখি:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', marginTop: '10px' }}>
            <li>এই শর্তাবলী লঙ্ঘন করলে</li>
            <li>Violation of these terms</li>
            <li>প্রতারণামূলক কার্যক্রম পরিচালনা করলে</li>
            <li>Fraudulent or illegal activity</li>
            <li>অন্য ব্যবহারকারীকে হয়রানি করলে</li>
            <li>Harassment of other users</li>
          </ul>
        </Section>

        <Section title="8. প্রযোজ্য আইন / Governing Law">
          <p>এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত হবে, বিশেষত:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', marginTop: '10px' }}>
            <li>তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬ (সংশোধিত ২০১৩)</li>
            <li>ICT Act 2006 (amended 2013)</li>
            <li>ডিজিটাল নিরাপত্তা আইন ২০১৮</li>
            <li>Digital Security Act 2018</li>
            <li>ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯</li>
            <li>Consumer Rights Protection Act 2009</li>
          </ul>
          <p style={{ marginTop: '12px' }}>Any disputes shall be subject to the jurisdiction of the courts of Bangladesh.</p>
        </Section>

        <Section title="9. যোগাযোগ / Contact Us">
          <p>যেকোনো প্রশ্ন বা অভিযোগের জন্য আমাদের সাথে যোগাযোগ করুন:</p>
          <div style={{
            background: '#f9fafb',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '12px'
          }}>
            <p><strong>Md Kamil Ahmed</strong></p>
            <p>Founder, RentNesto</p>
            <p>Email: <a href="mailto:ashaahmed012345@gmail.com" style={{ color: '#2563eb' }}>ashaahmed012345@gmail.com</a></p>
            <p>Website: <a href="https://rentnesto.xyz" style={{ color: '#2563eb' }}>rentnesto.xyz</a></p>
          </div>
        </Section>

        {/* Footer links */}
        <div style={{
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>← Back to Home</Link>
          <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Privacy Policy</Link>
          <Link href="/properties" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Browse Properties</Link>
        </div>

      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{
      marginBottom: '32px',
      paddingBottom: '32px',
      borderBottom: '1px solid #f3f4f6'
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1e40af',
        marginBottom: '14px',
        paddingBottom: '8px',
        borderBottom: '2px solid #dbeafe'
      }}>
        {title}
      </h2>
      <div style={{ color: '#374151', lineHeight: '1.8', fontSize: '15px' }}>
        {children}
      </div>
    </div>
  );
}