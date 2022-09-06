// 使用dayjs格式化日期
import dayjs from "dayjs";

export function formatMonthDay(date, formatStr="MM月DD日") {
  return dayjs(date).format(formatStr)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'day')
} 