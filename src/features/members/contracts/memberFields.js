import { memberStatuses } from "@/src/features/members/domain/memberStatus";

export const memberFormFields = Object.freeze([
  "fullName",
  "phone",
  "email",
  "membershipStartDate",
  "membershipDurationMonths",
  "status",
  "notes"
]);

export const memberTableColumns = Object.freeze([
  "fullName",
  "phone",
  "membershipStartDate",
  "membershipEndDate",
  "status"
]);

export const memberStatusOptions = Object.freeze([
  { label: "Aktif", value: memberStatuses.ACTIVE },
  { label: "Süresi dolmuş", value: memberStatuses.EXPIRED },
  { label: "İptal", value: memberStatuses.CANCELLED }
]);
