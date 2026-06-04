export const adminRoutes = Object.freeze({
  login: "/?adminLogin=1",
  dashboard: "/admin",
  members: "/admin#members",
  expired: "/admin#expired",
  pricing: "/admin#pricing"
});

export const adminNavItems = Object.freeze([
  { label: "Panel", href: adminRoutes.dashboard },
  { label: "\u00dcyeler", href: adminRoutes.members },
  { label: "Pasif \u00fcyeler", href: adminRoutes.expired },
  { label: "Fiyatlar", href: adminRoutes.pricing }
]);
