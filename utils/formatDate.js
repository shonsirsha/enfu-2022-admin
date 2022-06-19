import { utcToZonedTime } from 'date-fns-tz'

export default function formatDate(epoch) {
  if (isNaN(epoch)) return `-`
  let zonedDate = utcToZonedTime(new Date(epoch), 'Asia/Jakarta')

  return `${zonedDate.getDate()}/${zonedDate.getMonth()}/${zonedDate.getFullYear()} - ${zonedDate.getHours()}:${zonedDate.getMinutes()}`
}
