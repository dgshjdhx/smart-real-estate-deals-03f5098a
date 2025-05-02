
import { Deal, DealStatus } from "../types";

// Generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Generate a random date within the last 30 days
const randomRecentDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
};

// Generate a random future date within the next 60 days
const randomFutureDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 60) + 1);
  return date.toISOString();
};

// Create some mock property addresses
const propertyAddresses = [
  "123 Main St, Austin, TX",
  "456 Oak Ave, Houston, TX",
  "789 Pine Rd, Dallas, TX",
  "101 Maple Dr, San Antonio, TX",
  "202 Elm St, Fort Worth, TX",
  "303 Cedar Ln, Arlington, TX",
  "404 Birch Rd, El Paso, TX",
  "505 Walnut Ave, Plano, TX",
  "606 Cherry St, Lubbock, TX",
  "707 Spruce Dr, Irving, TX",
  "808 Aspen Ct, Amarillo, TX",
  "909 Willow Rd, Corpus Christi, TX",
  "1010 Fir Ln, Garland, TX",
  "1111 Magnolia Dr, Laredo, TX",
  "1212 Poplar St, Waco, TX",
];

// Create some mock client names
const clientNames = [
  "John Smith",
  "Emma Johnson",
  "Michael Williams",
  "Sophia Brown",
  "James Davis",
  "Olivia Miller",
  "Robert Wilson",
  "Ava Moore",
  "William Taylor",
  "Isabella Anderson",
  "David Thomas",
  "Mia Jackson",
  "Joseph White",
  "Charlotte Harris",
  "Charles Martin",
];

// Create some mock reminder texts
const reminderTexts = [
  "Call client to discuss offer",
  "Schedule property inspection",
  "Follow up on loan approval",
  "Review contract details",
  "Send documents to title company",
  "Confirm closing date with all parties",
  "Prepare closing gift",
  null,
];

// Create some mock notes
const noteTexts = [
  "Client is motivated to close quickly",
  "Potential inspection issues with roof",
  "Buyer pre-approved for loan",
  "Seller may be flexible on closing date",
  "Multiple offers expected",
  "Property needs minor repairs",
  "Cash offer, no financing contingency",
  null,
];

// Create mock deals data
export const generateMockDeals = (count: number = 15): Deal[] => {
  const deals: Deal[] = [];
  const statuses: DealStatus[] = [
    "Lead",
    "Contacted",
    "Offer Sent",
    "Under Contract",
    "Appraisal",
    "Inspection",
    "Financing",
    "Closing Scheduled",
    "Closed",
  ];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const propertyName = propertyAddresses[i % propertyAddresses.length];
    const clientName = clientNames[i % clientNames.length];
    
    deals.push({
      id: generateId(),
      propertyName,
      clientName,
      status,
      statusUpdatedDate: randomRecentDate(),
      estimatedCloseDate: status === "Closed" ? randomRecentDate() : randomFutureDate(),
      reminder: reminderTexts[Math.floor(Math.random() * reminderTexts.length)],
      notes: noteTexts[Math.floor(Math.random() * noteTexts.length)],
      createdAt: randomRecentDate(),
    });
  }

  return deals;
};

// Export a set of mock deals
export const mockDeals = generateMockDeals(15);
