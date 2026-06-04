export const memberStatuses = Object.freeze({
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled"
});

export function resolveMembershipStatus({ endDate, cancelled = false, now = new Date() }) {
  if (cancelled) {
    return memberStatuses.CANCELLED;
  }

  if (!endDate) {
    return memberStatuses.ACTIVE;
  }

  return new Date(endDate).getTime() < now.getTime() ? memberStatuses.EXPIRED : memberStatuses.ACTIVE;
}
