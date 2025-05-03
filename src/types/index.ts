export type DealStatus = 
  | 'Lead'
  | 'Contacted'
  | 'Offer Sent'
  | 'Under Contract'
  | 'Appraisal'
  | 'Inspection'
  | 'Financing'
  | 'Closing Scheduled'
  | 'Closed';

export type SubscriptionTier = 'Free' | 'Pro' | 'Broker';

export interface Deal {
  id: string;
  propertyName: string;
  clientName: string;
  status: DealStatus;
  statusUpdatedDate: string;
  estimatedCloseDate: string | null;
  reminder: string | null;
  notes: string | null;
  createdAt: string;
  user_id?: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptionTier: SubscriptionTier;
  joinDate: string;
}

export const MAX_DEALS: Record<SubscriptionTier, number> = {
  'Free': 3,
  'Pro': 30,
  'Broker': Infinity
};

export const SUBSCRIPTION_PRICES: Record<SubscriptionTier, number> = {
  'Free': 0,
  'Pro': 10,
  'Broker': 20
};

export const ALL_STATUSES: DealStatus[] = [
  'Lead',
  'Contacted',
  'Offer Sent',
  'Under Contract',
  'Appraisal',
  'Inspection',
  'Financing',
  'Closing Scheduled',
  'Closed'
];

export const StatusColors: Record<DealStatus, string> = {
  'Lead': 'status-lead',
  'Contacted': 'status-contacted',
  'Offer Sent': 'status-offerSent',
  'Under Contract': 'status-underContract',
  'Appraisal': 'status-appraisal',
  'Inspection': 'status-inspection',
  'Financing': 'status-financing',
  'Closing Scheduled': 'status-closingScheduled',
  'Closed': 'status-closed'
};
