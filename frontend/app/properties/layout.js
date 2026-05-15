export const metadata = {
  title: 'Browse Rental Properties in Bangladesh - RentNesto',
  description: 'Find apartments, hostels, sublets, rooms and houses for rent across Bangladesh. Search by location, price and property type.',
  keywords: 'rental properties bangladesh, apartment for rent dhaka, hostel bangladesh, sublet dhaka, room for rent, বাসা ভাড়া, ফ্লাট ভাড়া, হোস্টেল, সাবলেট',
  openGraph: {
    title: 'Browse Rental Properties in Bangladesh - RentNesto',
    description: 'Find apartments, hostels, sublets, rooms and houses for rent across Bangladesh.',
    url: 'https://rentnesto.xyz/properties',
    siteName: 'RentNesto',
    type: 'website',
    images: [
      {
        url: 'https://rentnesto.xyz/logo.png',
        width: 800,
        height: 600,
        alt: 'RentNesto - Browse Rental Properties in Bangladesh',
      }
    ],
  },
  alternates: {
    canonical: 'https://rentnesto.xyz/properties',
  }
};

export default function PropertiesLayout({ children }) {
  return children;
}