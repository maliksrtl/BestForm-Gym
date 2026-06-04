export const adminRoutes = Object.freeze({
  login: "/admin/login",
  members: "/admin/members",
  newMember: "/admin/members/new",
  memberDetail: (memberId = ":id") => `/admin/members/${memberId}`
});

export const adminNavItems = Object.freeze([
  { label: "Üyeler", href: adminRoutes.members },
  { label: "Yeni üye", href: adminRoutes.newMember }
]);
