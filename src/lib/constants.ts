export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PRICING: '/pricing',
  FEATURES: '/features',
};

export const WASTE_TYPES = {
  ORGANIC: {
    label: 'Organic Waste',
    items: [
      'Food scraps',
      'Garden/yard waste',
      'Biodegradable items'
    ]
  },
  RECYCLABLE: {
    label: 'Recyclable Waste',
    items: [
      'Paper',
      'Plastics',
      'Glass',
      'Metals'
    ]
  },
  GENERAL: {
    label: 'General Waste',
    items: [
      'Non-recyclable items',
      'Mixed waste',
      'Household trash'
    ]
  }
};