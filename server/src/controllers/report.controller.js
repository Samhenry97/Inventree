import moment from 'moment';
import { Item } from '../models/item';
import { Checkout } from '../models/checkout';

export default {
  async itemReports(conn, data) {
    const reports = [];
    if (data.startDate && data.endDate) {
      const ranges = generateRanges(data.startDate, data.endDate);
      reports.push(await reportNewItems(ranges));
    }
    return reports;
  }
};


function generateRanges(startDate, endDate) {
  const mstart = moment(startDate);
  const mend = moment(endDate);

  const days = mend.diff(mstart, 'days');
  const months = mend.diff(mstart, 'months');

  if (days <= 31) return generateDayRanges(startDate, endDate);
  if (months <= 31) return generateMonthRanges(startDate, endDate);
  return generateYearRanges(startDate, endDate);
}

function generateDayRanges(startDate, endDate) {
  const format = 'MMM Do YY';
  const mstart = moment(startDate);
  const mend = moment(endDate).endOf('day');

  let curstart = mstart.clone().startOf('day');
  let curend = moment.min(curstart.clone().endOf('day'), mend.clone());
  const res = [{ label: curstart.format(format), start: curstart.toDate(), end: curend.toDate() }];
  while (!curend.isSame(mend)) {
    curstart = curstart.add(1, 'day');
    curend = moment.min(curstart.clone().endOf('day'), mend.clone());
    res.push({ label: curstart.format(format), start: curstart.toDate(), end: curend.toDate() });
  }

  return res;
}

function generateMonthRanges(startDate, endDate) {
  const format = 'MMM YY';
  const mstart = moment(startDate);
  const mend = moment(endDate);

  let curstart = mstart.clone();
  let curend = moment.min(curstart.clone().endOf('month'), mend.clone());
  const res = [{ label: curstart.format(format), start: curstart.toDate(), end: curend.toDate() }];
  while (!curend.isSame(mend)) {
    curstart = curstart.add(1, 'month').startOf('month');
    curend = moment.min(curstart.clone().endOf('month'), mend.clone());
    res.push({ label: curstart.format(format), start: curstart.toDate(), end: curend.toDate() });
  }

  return res;
}

function generateYearRanges(startDate, endDate) {
  const format = 'YYYY';
  const mstart = moment(startDate);
  const mend = moment(endDate);

  let curstart = mstart.clone();
  let curend = moment.min(curstart.clone().endOf('year'), mend.clone());
  const res = [{ label: curstart.format(format), start: curstart.toDate(), end: curend.toDate() }];
  while (!curend.isSame(mend)) {
    curstart = curstart.add(1, 'year').startOf('year');
    curend = moment.min(curstart.clone().endOf('year'), mend.clone());
    res.push({ label: curstart.format(format), start: curstart.toDate(), end: curend.toDate() });
  }

  return res;
}

async function reportNewItems(ranges) {
  const labels = ranges.map(range => range.label);
  const data = [];
  for (const range of ranges) {
    const total = await Item.count({ createdAt: { $gte: range.start, $lte: range.end } });
    data.push(total);
  }

  return {
    labels,
    datasets: [{
      label: 'Total Items Added',
      data
    }]
  };
}

async function reportReadBooks(ranges) {
  const labels = ranges.map(range => range.label);
  const data = [];
  for (const range of ranges) {
    const total = await Checkout.count({ dateIn: { $gte: range.start, $lte: range.end } });
    data.push(total);
  }

  return {
    labels,
    datasets: [{
      label: 'Total Books Read',
      data
    }]
  };
}
