export type Location = {
    city: string;
    country: {
        name: string;
        code: string;
    };
    latitude: number;
    longitude: number;
}

export type EventPropertyIcon = "link" | "search" | "image" | "menu" | "radio" | "minus" | "plus" | "info" | "check" | "book" | "pause" | "frown" | "mail" | "home" | "star" | "filter" | "meh" | "save" | "user" | "phone" | "paperclip" | "inbox" | "lock" | "cloud" | "eye" | "camera" | "delete" | "heart" | "chrome" | "github" | "upload" | "download" | "unlock" | "play" | "tag" | "calendar" | "database" | "key" | "flag" | "layout" | "printer" | "tool" | "gift" | "wifi" | "edit" | "codepen" | "gitlab" | "youtube" | "twitter" | "dribbble" | "instagram" | "slack" | "align-left" | "align-right" | "archive" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "battery" | "bell" | "bookmark" | "box" | "briefcase" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "circle" | "clipboard" | "clock" | "code" | "compass" | "copy" | "credit-card" | "crop" | "facebook" | "feather" | "folder" | "globe" | "grid" | "layers" | "linkedin" | "list" | "log-out" | "map" | "mic" | "moon" | "mouse-pointer" | "music" | "pie-chart" | "rss" | "scissors" | "share" | "shield" | "shopping-bag" | "shopping-cart" | "shuffle" | "tablet" | "thermometer" | "thumbs-down" | "thumbs-up" | "trash" | "tv" | "users" | "video" | "voicemail" | "external-link" | "activity" | "airplay" | "alert-circle" | "alert-octagon" | "alert-triangle" | "align-center" | "align-justify" | "anchor" | "aperture" | "arrow-down-circle" | "arrow-down-left" | "arrow-down-right" | "arrow-left-circle" | "arrow-right-circle" | "arrow-up-circle" | "arrow-up-left" | "arrow-up-right" | "at-sign" | "award" | "bar-chart" | "bar-chart-2" | "battery-charging" | "bell-off" | "bluetooth" | "bold" | "book-open" | "camera-off" | "cast" | "check-circle" | "check-square" | "chevrons-down" | "chevrons-left" | "chevrons-right" | "chevrons-up" | "cloud-drizzle" | "cloud-lightning" | "cloud-off" | "cloud-rain" | "cloud-snow" | "codesandbox" | "coffee" | "columns" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "cpu" | "crosshair" | "disc" | "divide" | "divide-circle" | "divide-square" | "dollar-sign" | "download-cloud" | "droplet" | "edit-2" | "edit-3" | "eye-off" | "fast-forward" | "figma" | "file" | "file-minus" | "file-plus" | "file-text" | "film" | "folder-minus" | "folder-plus" | "framer" | "git-branch" | "git-commit" | "git-merge" | "git-pull-request" | "hard-drive" | "hash" | "headphones" | "help-circle" | "hexagon" | "italic" | "life-buoy" | "link-2" | "loader" | "log-in" | "map-pin" | "maximize" | "maximize-2" | "message-circle" | "message-square" | "mic-off" | "minimize" | "minimize-2" | "minus-circle" | "minus-square" | "monitor" | "more-horizontal" | "more-vertical" | "move" | "navigation" | "navigation-2" | "octagon" | "package" | "pause-circle" | "pen-tool" | "percent" | "phone-call" | "phone-forwarded" | "phone-incoming" | "phone-missed" | "phone-off" | "phone-outgoing" | "play-circle" | "plus-circle" | "plus-square" | "pocket" | "power" | "refresh-ccw" | "refresh-cw" | "repeat" | "rewind" | "rotate-ccw" | "rotate-cw" | "send" | "server" | "settings" | "share-2" | "shield-off" | "sidebar" | "skip-back" | "skip-forward" | "slash" | "sliders" | "smartphone" | "smile" | "speaker" | "square" | "stop-circle" | "sun" | "sunrise" | "sunset" | "target" | "terminal" | "toggle-left" | "toggle-right" | "trash-2" | "trello" | "trending-down" | "trending-up" | "triangle" | "truck" | "twitch" | "type" | "umbrella" | "underline" | "upload-cloud" | "user-check" | "user-minus" | "user-plus" | "user-x" | "video-off" | "volume" | "volume-1" | "volume-2" | "volume-x" | "watch" | "wifi-off" | "wind" | "x" | "x-circle" | "x-octagon" | "x-square" | "zap" | "zap-off" | "zoom-in" | "zoom-out";

export type Event = {
    id: string;
    name: string;
    state: 'draft' | 'waitlist' | 'boarding' | 'boarding_closed' | 'boarding_full' | 'boarding_cancelled' | 'boarding_completed';
    type: 'first_come' | 'peer_reviewed';
    windowStart: string;
    windowEnd: string;
    properties: {
        icon: EventPropertyIcon;
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

export const sampleEvents: Event[] = [{
    id: '98c61b45-3567-4bad-812a-2a43308efa0e',
    name: '3-day luxury in Northern Italy \'25',
    state: 'boarding',
    type: 'peer_reviewed',
    windowStart: '2024-09-14 08:00:00',
    windowEnd: '2024-09-27 23:59:00',
    properties: [{
        icon: 'thumbs-up',
        title: 'Super Luxury',
        description: 'Nostrud eiusmod dolor amet minim. Nostrud occaecat deserunt nulla anim voluptate. Dolor veniam excepteur magna ipsum laboris.'
    }],
    capacity: {
        min: 25,
        max: 50,
    },
    days: {
        min: 3,
        max: 3,
    },
    nights: {
        min: 2,
        max: 2,
    },
    venue: {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Euridge Manor',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        location: {
            city: 'Cotswolds',
            country: {
                name: 'United Kingdom',
                code: 'UK'
            },
            latitude: 51.4964,
            longitude: -2.2679,
        }
    },
    rooms: [{
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #1',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }, {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #2',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }, {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #3',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }, {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #4',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }, {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #5',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }],
    slots: [{
        id: '8ecdfb11-67b2-423d-bce8-f0ce2a820a77',
        available: true,
        start: '2025-06-01',
        end: '2025-06-03',
        rooms: [{
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #1',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }, {
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #2',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }, {
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #3',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }, {
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #4',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }, {
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #5',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }],
    }],
    images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: {
        short: 'Euridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor. Incididunt et velit duis duis aliquip est culpa incididunt.',
        long: "Euridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor. Incididunt et velit duis duis aliquip est culpa incididunt veniam eu cupidatat. Occaecat voluptate voluptate ullamco excepteur sit veniam sunt aliqua.\n\nEuridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor. Incididunt et velit duis duis aliquip est culpa incididunt veniam eu cupidatat. Occaecat voluptate voluptate ullamco excepteur sit veniam sunt aliqua.Euridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor. Incididunt et velit duis duis aliquip est culpa incididunt veniam eu cupidatat. Occaecat voluptate voluptate ullamco excepteur sit veniam sunt aliqua.\n\nEuridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor. Incididunt et velit duis duis aliquip est culpa incididunt veniam eu cupidatat. Occaecat voluptate voluptate ullamco excepteur sit veniam sunt aliqua."
    },
    minPrice: { value: 2499, currency: 'EUR', currencySymbol: '€' },
}, {
    id: 'ddb53104-f632-404f-9dad-0541339fd886',
    name: 'Birthday Party',
    state: 'boarding',
    type: 'peer_reviewed',
    windowStart: '2024-09-17 08:00:00',
    windowEnd: '2024-09-27 23:59:00',
    properties: [{
        icon: 'thumbs-up',
        title: 'Birthday Party',
        description: 'Nostrud eiusmod dolor tempor aute cillum ad sint amet minim. Nostrud non pariatur amet minim occaecat deserunt nulla anim voluptate. Dolor veniam excepteur magna ipsum laboris.'
    }],
    capacity: {
        min: 25,
        max: 50,
    },
    days: {
        min: 3,
        max: 3,
    },
    nights: {
        min: 2,
        max: 2,
    },
    venue: {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Euridge Manor',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        location: {
            city: 'Cotswolds',
            country: {
                name: 'United Kingdom',
                code: 'UK'
            },
            latitude: 51.4964,
            longitude: -2.2679,
        }
    },
    rooms: [{
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #1',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }],
    slots: [{
        id: '6ed9c809-0b5d-44ff-bb90-f070a6f32d2b',
        available: false,
        start: '2025-07-01',
        end: '2025-07-03',
        rooms: [{
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #1',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }],
    }],
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: {
        short: 'Euridge Manor is a stunning venue in Cotswolds.',
        long: 'Euridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor'
    },
    minPrice: { value: 2499, currency: 'EUR', currencySymbol: '€' },
}, {
    id: 'f1cafde5-051f-4498-b1c2-5eba8954d20e',
    name: 'Birthday Party',
    state: 'boarding',
    type: 'first_come',
    windowStart: '2025-08-01',
    windowEnd: '2025-08-10',
    properties: [{
        icon: 'thumbs-up',
        title: 'Birthday Party',
        description: 'Nostrud eiusmod dolor tempor aute cillum ad sint amet minim. Nostrud non pariatur amet minim occaecat deserunt nulla anim voluptate. Dolor veniam excepteur magna ipsum laboris.'
    }],
    capacity: {
        min: 25,
        max: 50,
    },
    days: {
        min: 3,
        max: 3,
    },
    nights: {
        min: 2,
        max: 2,
    },
    venue: {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Euridge Manor',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        location: {
            city: 'Cotswolds',
            country: {
                name: 'United Kingdom',
                code: 'UK'
            },
            latitude: 51.4964,
            longitude: -2.2679,
        }
    },
    rooms: [{
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #1',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }, {
        id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
        name: 'Bedroom #2',
        images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
        capacity: 2,
    }],
    slots: [{
        id: 'a79c716a-e887-4dc4-b555-6b63c7c31775',
        available: false,
        start: '2025-08-01',
        end: '2025-08-03',
        rooms: [{
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #1',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }, {
            id: 'b681e5f1-c665-4fae-b674-d3ca418160bb',
            name: 'Bedroom #2',
            images: ['https://www.functioncentral.co.uk/images/gallery/_headerImageMobile/1-Euridge-Manor-Wedding.jpg', 'https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
            capacity: 2,
            offers: [{
                capacity: 1,
                price: { value: 2499, currency: 'EUR', currencySymbol: '€' },
            }, {
                capacity: 2,
                price: { value: 3499, currency: 'EUR', currencySymbol: '€' },
            }],
        }],
    }],
    images: ['https://wedlockers.com.au/assets/Uploads/Luxury-wedding-location-Linnaeus-Farm-Berry.jpg'],
    description: {
        short: 'Euridge Manor is a stunning venue in Cotswolds.',
        long: 'Euridge Manor is a stunning venue in Cotswolds. It is a beautiful wedding at Euridge Manor'
    },
    minPrice: { value: 2499, currency: 'EUR', currencySymbol: '€' },
}];