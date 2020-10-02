import React, { useMemo } from 'react';
import moment from 'moment';
import Icon from 'components/Icon';
import './style.scss';

interface DateProps {
  date?: string;
  format?: string;
}

const Date: React.FC<DateProps> = ({ date, format = 'YYYY-MM-DD' }) => {
  const formattedDate = useMemo(() => {
    return moment(date).format(format);
  }, [date, format]);

  return (
    <div className='lanting-date' title={date}>
      <Icon className='lanting-date-icon'>date_range</Icon>
      {formattedDate}
    </div>
  );
};

export default Date;
