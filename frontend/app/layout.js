import './globals.css';
import './index.css';
import './Home.css';
import Providers from './providers';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'RentNesto - Rental Home in Bangladesh',
  description: 'Find apartments, hostels, sublets and rental properties across Bangladesh. Easy and trusted rental platform.',
  keywords: 'rental properties bangladesh, apartment dhaka, hostel, sublet, room for rent, বাসা ভাড়া',
  openGraph: {
    title: 'RentNesto - Rental Home in Bangladesh',
    description: 'Find apartments, hostels, sublets and rental properties across Bangladesh.',
    url: 'https://rentnesto.xyz',
    siteName: 'RentNesto',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://rentnesto.xyz',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-26NMK5BYWG"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-26NMK5BYWG');
          `
        }} />
      </head>
      <body>
        <Providers>
          <Navbar />
          <div className="App">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}