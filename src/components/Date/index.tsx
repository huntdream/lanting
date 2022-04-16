import React, { useMemo } from 'react';
import moment from 'moment';
import Icon from 'components/Icon';
import './style.scss';

interface DateProps {
  date?: string;
  format?: string;
  fromNow?: boolean;
}

const Date: React.FC<DateProps> = ({
  date,
  format = 'YYYY-MM-DD',
  fromNow,
}) => {
  const [dateStr, datetime] = useMemo(() => {
    const momented = moment(date);

    let theDate = '';

    if (fromNow) {
      theDate = momented.fromNow();
    } else {
      theDate = momented.format(format);
    }

    return [theDate, momented.format('YYYY-MM-DD HH:mm')];
  }, [date, format, fromNow]);

  return (
    <div className='lanting-date' title={datetime}>
      <Icon className='lanting-date-icon'>date_range</Icon>
      {dateStr}
    </div>
  );
};

export default Date;
