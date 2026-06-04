export function calculateMembershipEndDate(startDate, durationMonths) {
  const parsedDuration = Number(durationMonths);

  if (!startDate || !Number.isInteger(parsedDuration) || parsedDuration <= 0) {
    throw new Error("A valid startDate and positive durationMonths value are required.");
  }

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + parsedDuration);

  return endDate;
}
