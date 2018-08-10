export default function ensureDate (dateA, dateB) {
  dateA.setDate(dateB.getDate())
  dateA.setMonth(dateB.getMonth())
  dateA.setFullYear(dateB.getFullYear())
}
