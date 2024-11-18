// 初始化插件
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // 用于处理 UTC 时间
import timezone from 'dayjs/plugin/timezone'; // 用于处理时区

dayjs.extend(utc);
dayjs.extend(timezone);


export const DateTimeUtil = {
  /**
   * 将 ISO 8601 格式的时间字符串转换为 年月日小时分钟 的格式
   * @param {string} dateTimeString - ISO 8601 格式的时间字符串
   * @returns {string} - 格式化后的时间字符串
   */
  formatDateTime: (dateTimeString: any) => {
    return dayjs(dateTimeString).format('YYYY-MM-DD');
  },

  /**
   * 格式化帖子时间
   * @param {string} dateTimeString - ISO 8601 格式的时间字符串
   * @returns {string} - 格式化后的时间字符串
   */
  formatPostDateTime: (dateTimeString: any) => {
    const now = dayjs();
    const postDate = dayjs(dateTimeString);
    const diffDays = now.diff(postDate, 'day');

    if (diffDays === 0) {
      return '今天 ' + postDate.format('HH:mm');
    } else if (diffDays === 1) {
      return '昨天 ' + postDate.format('HH:mm');
    } else if (diffDays <= 7) {
      return `${diffDays}天前 ${postDate.format('HH:mm')}`;
    } else {
      return postDate.format('YYYY-MM-DD HH:mm');
    }
  }
};

