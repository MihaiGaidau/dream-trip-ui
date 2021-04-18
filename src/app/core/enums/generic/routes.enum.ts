enum HomeRoutes {
  home = 'home',
  services = 'services',
  about = 'about',
  contacts = 'contacts',
  faq = 'faq',
  search = 'search'
}

export type AirlineRoutes = typeof AirlineRoutes;
export const AirlineRoutes = {
  ...HomeRoutes
};
