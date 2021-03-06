import moment from 'moment';

export function formatDate(date) {
  if (!date) return '';
  return moment(date).format('MMMM Do YYYY');
}

export function formatPickerDate(date) {
  if (!date) return '';
  return moment(date).format('YYYY-MM-DD');
}

export function dateDifference(begin, end) {
  const momentBegin = moment(begin);
  const momentEnd = moment(end);

  const days = momentEnd.diff(momentBegin, 'days') + 1;
  const months = momentEnd.diff(momentBegin, 'months');
  const years = momentEnd.diff(momentBegin, 'years');

  if (days < 31) return `${days} days`;
  if (months < 12) return `${months} months`;
  return `${years} years`;
}
