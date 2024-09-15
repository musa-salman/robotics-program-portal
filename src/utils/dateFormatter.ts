import moment from 'moment';

const formatDate = (date: Date) => moment(date).format('DD / MM / YYYY');
const formatDateTimeRange = (startDate: Date, endDate: Date) => {
  const format = 'DD / MM / YYYY';
  const timeFormat = 'HH:mm';
  const startFormat = moment(startDate).format(format);
  const endFormat = moment(endDate).format(format);

  if (startFormat === endFormat) {
    // Same day
    return `${startFormat} ${moment(startDate).format(timeFormat)} - ${moment(endDate).format(timeFormat)}`;
  } else {
    // Different days
    return `${moment(startDate).format(`${format} ${timeFormat}`)} - ${moment(endDate).format(`${format} ${timeFormat}`)}`;
  }
};
export default formatDate;
export { formatDateTimeRange };
