import { getDynamicContent } from '@/lib/getDynamicContent';
import EngagementClient from '@/components/EngagementClient';

export default async function EngagementPage() {
  // Fetch dynamic content server-side
  const content = await getDynamicContent();

  return (
    <EngagementClient
      serviceDescription={content.serviceDescription}
      esiDescription={content.esiDescription}
      agencyDescription={content.agencyDescription}
      ksoDescription={content.ksoDescription}
      transactionDescription={content.transactionDescription}
      triptychDescription={content.triptychDescription}
      marketObservation={content.marketObservation}
    />
  );
}
