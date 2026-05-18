import { propertyAPI } from '../../../services/api';

export async function generateMetadata({ params }) {
  try {
    if (!params?.id || params.id === 'undefined') {
      return {
        title: 'Property Details | RentNesto Bangladesh',
        description: 'Find rental properties across Bangladesh on RentNesto.',
      };
    }
    const response = await propertyAPI.getPropertyById(params.id);
    const property = response.data.data.property;

    const title = `${property.title} — ${property.location.district}, ${property.location.division} | RentNesto`;
    const description = `${property.description?.slice(0, 150)}... Rent: ৳${property.rent.amount.toLocaleString()}/${property.rent.period}. Contact owner directly on RentNesto Bangladesh.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: property.photos?.[0]?.url ? [property.photos[0].url] : [],
      },
    };
  } catch {
    return {
      title: 'Property Details | RentNesto Bangladesh',
      description: 'Find rental properties across Bangladesh on RentNesto.',
    };
  }
}