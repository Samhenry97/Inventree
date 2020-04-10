import moment from 'moment';

export default {
  bookReports(conn, data) {
    if (data.startDate && data.endDate) {
      generateRanges(data.startDate, data.endDate);
    }
  },
  itemReports(conn, data) {

  }
};


function generateRanges(startDate, endDate) {
  const mstart = moment(startDate);
  const mend = moment(endDate);

  const days = mend.diff(mstart, 'days');
  const months = mend.diff(mstart, 'months');
  const years = mend.diff(mstart, 'years');
  const duration = moment.duration(mend.diff(mstart));

  console.warn(duration.asMonths());
}
