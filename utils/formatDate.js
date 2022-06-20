import { utcToZonedTime } from 'date-fns-tz'

export default function formatDate(epoch) {
  if (isNaN(epoch)) return `-`
  let zonedDate = utcToZonedTime(new Date(epoch), 'Asia/Jakarta')

  const hour = zonedDate.getHours() > 9 ? zonedDate.getHours() : `0${zonedDate.getHours()}`
  const minute = zonedDate.getMinutes() > 9 ? zonedDate.getMinutes() : `0${zonedDate.getMinutes()}`

  return `${zonedDate.getDate()}/${zonedDate.getMonth()}/${zonedDate.getFullYear()} - ${hour}:${minute}`
}
