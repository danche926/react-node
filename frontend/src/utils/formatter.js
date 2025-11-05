// src/utils/format.js

/**
 * 格式化价格
 * @param {number|string} value - 原始价格
 * @param {string} currency - 货币符号，默认为 "¥"
 */
export function formatPrice(value, currency = "¥") {
  if (isNaN(value)) return "-";
  return `${currency}${Number(value).toFixed(2)}`;
}

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @param {string} locale - 本地化格式，默认为 zh-CN
 */
export function formatDate(date, locale = "zh-CN") {
  if (!date) return "-";
  return new Date(date).toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * 截断文本
 * @param {string} text 文本
 * @param {number} length 最大长度
 */
export function truncateText(text, length = 20) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
}

/**
 * 生成唯一 ID
 */
export function uuid() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}
