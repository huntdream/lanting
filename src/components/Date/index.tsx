import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import Icon from 'components/Icon';
import './style.scss';
import Tooltip from 'components/Tooltip';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/zh';

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
  const { i18n } = useTranslation();

  const [dateStr, datetime] = useMemo(() => {
    if (!date) {
      return ['', ''];
    }

    dayjs.locale(i18n.language);

    const momented = dayjs(date);

    let theDate = '';

    if (fromNow && momented.diff(dayjs(), 'day') >= -1) {
      dayjs.extend(relativeTime);
      theDate = momented.fromNow();
    } else {
      theDate = momented.format(format);
    }

    return [theDate, momented.format('YYYY-MM-DD dddd HH:mm')];
  }, [date, format, fromNow, i18n.language]);

  return (
    <div className='lanting-date' {...props}>
      {dateStr && <Icon name='date_range' className='lanting-date-icon' />}
      <Tooltip title={datetime} timeout={1000}>
        <span>{dateStr}</span>
      </Tooltip>
    </div>
  );
};

export default Date;
