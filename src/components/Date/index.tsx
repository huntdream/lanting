import React, { useMemo } from 'react';
import moment from 'moment';
import Icon from 'components/Icon';
import './style.scss';
import Tooltip from 'components/Tooltip';

interface DateProps {
  date?: string;
  format?: string;
  fromNow?: boolean;
}

const Date: React.FC<DateProps> = ({
  date,
  format = 'YYYY-MM-DD',
  fromNow,
  ...props
}) => {
  const [dateStr, datetime] = useMemo(() => {
    if (!date) {
      return ['', ''];
    }

    const momented = moment(date);

    let theDate = '';

    if (fromNow && momented.diff(moment(), 'day') >= -1) {
      theDate = momented.fromNow();
    } else {
      theDate = momented.format(format);
    }

    return [theDate, momented.format('YYYY-MM-DD HH:mm')];
  }, [date, format, fromNow]);

  return (
    <Tooltip title={datetime}>
      <div className='lanting-date' {...props}>
        {dateStr && <Icon className='lanting-date-icon'>date_range</Icon>}
        <span>{dateStr}</span>
      </div>
    </Tooltip>
  );
};

export default Date;
