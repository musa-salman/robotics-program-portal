import moment from 'moment';

const formatDate = (date: Date) => moment(date).format('DD / MM / YYYY');

export default formatDate;
