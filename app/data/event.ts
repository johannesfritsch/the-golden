export type Location = {
    city: string;
    country: {
        name: string;
        code: string;
    };
    latitude: number;
    longitude: number;
}

export type Event = {
    id: string;
    name: string;
    state: 'draft' | 'waitlist' | 'boarding' | 'boarding_closed' | 'boarding_full' | 'boarding_cancelled' | 'boarding_completed';
    type: 'first_come' | 'peer_reviewed';
    windowStart: string;
    windowEnd: string;
    properties: {
        icon: string;
        title: string;
        description: string;
    }[],
    days: {
        min: number;
        max: number;
    },
    nights: {
        min: number;
        max: number;
    },
    capacity: {
        min: number;
        max: number;
    },
    venue: {
        id: string;
        name: string;
        images: string[];
        location: Location;
    };
    rooms: {
        id: string;
        name: string;
        images: string[],
        capacity: number;
    }[];
    slots: {
        id: string;
        available: boolean;
        start: string;
        end: string;
        rooms: {
            id: string;
            name: string;
            images: string[],
            capacity: number;
            differentLocation?: {
                name: string;
                distance: number;
                location: Location;
            };
            offers: {
                capacity: number;
                price: {
                    value: number;
                    currency: string;
                    currencySymbol: string;
                }
            }[];
        }[];
    }[];
    images: string[];
    description: {
        short: string;
        long: string;
    };
    minPrice: {
        value: number;
        currency: string;
        currencySymbol: string;
    };
};

export const sampleEvents: Event[] = [
  {
    id: '98c61b45-3567-4bad-812a-2a43308efa0e',
    name: "3-day luxury in Northern Italy '25",
    state: 'boarding',
    type: 'peer_reviewed',
    windowStart: '2024-09-14 08:00:00',
    windowEnd: '2024-09-27 23:59:00',
    properties: [
      {
        icon: 'thumbs-up',
        title: 'Super Luxury',
        description:
          'Nostrud eiusmod dolor amet minim. Nostrud occaecat deserunt nulla anim voluptate. Dolor veniam excepteur magna ipsum laboris.',
      },
    ],
    capacity: { min: 25, max: 50 },
    days: { min: 3, max: 3 },
    nights: { min: 2, max: 2 },
    venue: {
      id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
      name: 'Euridge Manor',
      images: [
        'https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg',
        'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg',
      ],
      location: {
        city: 'Cotswolds',
        country: { name: 'United Kingdom', code: 'UK' },
        latitude: 51.4964,
        longitude: -2.2679,
      },
    },
    rooms: [
      { id: 'r1', name: 'Bedroom #1', images: [], capacity: 2 },
      { id: 'r2', name: 'Bedroom #2', images: [], capacity: 2 },
    ],
    slots: [
      {
        id: '8ecdfb11-67b2-423d-bce8-f0ce2a820a77',
        available: true,
        start: '2025-06-01',
        end: '2025-06-03',
        rooms: [
          {
            id: 'r1',
            name: 'Bedroom #1',
            images: [],
            capacity: 2,
            offers: [
              { capacity: 1, price: { value: 2499, currency: 'EUR', currencySymbol: '€' } },
              { capacity: 2, price: { value: 3499, currency: 'EUR', currencySymbol: '€' } },
            ],
          },
        ],
      },
    ],
    images: [
      'https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg',
      'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg',
    ],
    description: {
      short: 'Euridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor.',
      long: 'Euridge Manor long description...'
    },
    minPrice: { value: 2499, currency: 'EUR', currencySymbol: '€' },
  },
];
