'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
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
            Privacy Policy
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
            এই গোপনীয়তা নীতি বাংলাদেশের ডিজিটাল নিরাপত্তা আইন ২০১৮ অনুযায়ী প্রণীত
          </div>
        </div>

        <Section title="1. ভূমিকা / Introduction">
          <p>RentNesto ("আমরা") আপনার গোপনীয়তাকে সম্মান করে। এই নীতি ব্যাখ্যা করে যে আমরা কোন তথ্য সংগ্রহ করি, কীভাবে ব্যবহার করি এবং কীভাবে সুরক্ষিত রাখি।</p>
          <p style={{ marginTop: '10px' }}>This Privacy Policy explains how RentNesto collects, uses, and protects your personal information in compliance with the <strong>Digital Security Act 2018</strong> and <strong>ICT Act 2006 (amended 2013)</strong> of Bangladesh.</p>
        </Section>

        <Section title="2. আমরা যে তথ্য সংগ্রহ করি / Information We Collect">
          <p style={{ fontWeight: '600', marginBottom: '8px' }}>আপনি যখন অ্যাকাউন্ট তৈরি করেন:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>পূর্ণ নাম (Full Name)</li>
            <li>ইমেইল ঠিকানা (Email Address)</li>
            <li>মোবাইল নম্বর (Mobile Number)</li>
            <li>অ্যাকাউন্টের ধরন — বাড়ির মালিক বা ভাড়াটিয়া (Account Type)</li>
          </ul>
          <p style={{ fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}>সম্পত্তি তালিকাভুক্ত করার সময়:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>সম্পত্তির ঠিকানা ও বিবরণ (Property address and details)</li>
            <li>যোগাযোগের তথ্য (Contact information)</li>
            <li>সম্পত্তির ছবি (Property photos)</li>
          </ul>
          <p style={{ fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}>স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>IP ঠিকানা (IP Address)</li>
            <li>ব্রাউজার তথ্য (Browser information)</li>
            <li>Google Analytics থেকে ব্যবহারের তথ্য (Usage data via Google Analytics)</li>
          </ul>
        </Section>

        <Section title="3. তথ্য ব্যবহারের উদ্দেশ্য / How We Use Your Information">
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>আপনার অ্যাকাউন্ট পরিচালনা করতে — To manage your account</li>
            <li>সম্পত্তি তালিকা প্রদর্শন করতে — To display property listings</li>
            <li>পাসওয়ার্ড রিসেট ইমেইল পাঠাতে — To send password reset emails</li>
            <li>প্ল্যাটফর্মের নিরাপত্তা নিশ্চিত করতে — To ensure platform security</li>
            <li>আইনি বাধ্যবাধকতা পূরণ করতে — To comply with legal obligations</li>
            <li>প্ল্যাটফর্ম উন্নত করতে — To improve our platform</li>
          </ul>
        </Section>

        <Section title="4. তথ্য শেয়ারিং / Information Sharing">
          <div style={{
            background: '#d1fae5',
            borderLeft: '4px solid #10b981',
            padding: '14px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontWeight: '600',
            color: '#065f46'
          }}>
            ✓ আমরা আপনার ব্যক্তিগত তথ্য কখনো বিক্রি করি না।<br />
            We never sell your personal data to third parties.
          </div>
          <p>আমরা শুধুমাত্র নিম্নলিখিত ক্ষেত্রে তথ্য শেয়ার করি:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', marginTop: '10px' }}>
            <li><strong>User Experience</strong> — ছবি সংরক্ষণের জন্য (Image storage)</li>
            <li><strong>User Experience</strong> — ডেটাবেজ (Database)</li>
            <li><strong>Reset</strong> — ইমেইল পাঠানোর জন্য (Email delivery)</li>
            <li><strong>Analytics</strong> — ওয়েবসাইট ব্যবহার বিশ্লেষণ (Usage analytics)</li>
            <li><strong>আইনি কর্তৃপক্ষ</strong> — বাংলাদেশের আইন অনুযায়ী প্রয়োজন হলে (Legal authorities if required by Bangladesh law)</li>
          </ul>
        </Section>

        <Section title="5. তথ্য সুরক্ষা / Data Security">
          <p>আমরা আপনার তথ্য সুরক্ষিত রাখতে নিম্নলিখিত ব্যবস্থা গ্রহণ করি:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', marginTop: '10px' }}>
            <li>পাসওয়ার্ড এনক্রিপশন — Passwords are encrypted using bcrypt</li>
            <li>HTTPS সংযোগ — All data transmitted over HTTPS</li>
            
          </ul>
          <p style={{ marginTop: '12px', color: '#6b7280' }}>তবে ইন্টারনেটে কোনো পদ্ধতিই ১০০% নিরাপদ নয়। আমরা সর্বোচ্চ নিরাপত্তা নিশ্চিত করার চেষ্টা করি।</p>
        </Section>

        <Section title="6. কুকিজ / Cookies">
          <p>আমরা নিম্নলিখিত উদ্দেশ্যে কুকিজ ব্যবহার করি:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', marginTop: '10px' }}>
            <li>লগইন সেশন বজায় রাখতে — To keep you logged in</li>
            <li>Google Analytics — ওয়েবসাইট ব্যবহার বিশ্লেষণ করতে</li>
          </ul>
          <p style={{ marginTop: '10px' }}>আপনি ব্রাউজার সেটিংস থেকে কুকিজ বন্ধ করতে পারেন, তবে এতে সাইটের কিছু ফিচার কাজ নাও করতে পারে।</p>
        </Section>

        <Section title="7. আপনার অধিকার / Your Rights">
          <p>বাংলাদেশের ডিজিটাল নিরাপত্তা আইন ২০১৮ অনুযায়ী আপনার নিম্নলিখিত অধিকার রয়েছে:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '2', marginTop: '10px' }}>
            <li>আপনার তথ্য দেখার অধিকার — Right to access your data</li>
            <li>আপনার তথ্য সংশোধনের অধিকার — Right to correct your data</li>
            <li>আপনার অ্যাকাউন্ট মুছে ফেলার অধিকার — Right to delete your account</li>
            <li>তথ্য প্রক্রিয়াকরণে আপত্তি জানানোর অধিকার — Right to object to processing</li>
          </ul>
          <p style={{ marginTop: '12px' }}>এই অধিকার প্রয়োগ করতে আমাদের ইমেইল করুন: <a href="mailto:ashaahmed012345@gmail.com" style={{ color: '#2563eb' }}>ashaahmed012345@gmail.com</a></p>
        </Section>

        <Section title="8. তথ্য সংরক্ষণের মেয়াদ / Data Retention">
          <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
            <li>অ্যাকাউন্ট তথ্য — অ্যাকাউন্ট সক্রিয় থাকা পর্যন্ত (Account data — until account deletion)</li>
            <li>সম্পত্তির তথ্য — মালিক কর্তৃক মুছে না দেওয়া পর্যন্ত (Property data — until deleted by owner)</li>
            <li>পাসওয়ার্ড রিসেট টোকেন — ১ ঘণ্টা (Password reset tokens — 1 hour)</li>
          </ul>
        </Section>

        <Section title="9. শিশুদের গোপনীয়তা / Children's Privacy">
          <p>RentNesto ১৮ বছরের কম বয়সীদের জন্য নয়। আমরা জেনেশুনে অপ্রাপ্তবয়স্কদের তথ্য সংগ্রহ করি না।</p>
          <p style={{ marginTop: '10px' }}>RentNesto is not intended for users under 18 years of age. We do not knowingly collect data from minors.</p>
        </Section>

        <Section title="10. নীতি পরিবর্তন / Changes to This Policy">
          <p>আমরা এই নীতি যেকোনো সময় আপডেট করতে পারি। গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে আমরা ইমেইলের মাধ্যমে জানাবো।</p>
          <p style={{ marginTop: '10px' }}>We may update this policy at any time. For significant changes, we will notify you via email.</p>
        </Section>

        <Section title="11. যোগাযোগ / Contact Us">
          <p>গোপনীয়তা সংক্রান্ত যেকোনো প্রশ্নের জন্য:</p>
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
            <p>Bangladesh</p>
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
          <Link href="/terms" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Terms & Conditions</Link>
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