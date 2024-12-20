import { useIntl } from '@@/exports';
import { Badge } from 'antd';
import React from 'react';

interface Props {
  startTime: any;
  endTime: any;
}

const ProcessBadge: React.FC<Props> = (competitionTime: any) => {
  const intl = useIntl();
  const startTime = new Date(competitionTime.startTime);
  const endTime = new Date(competitionTime.endTime);
  const currentTime = new Date();
  console.log(currentTime);
  console.log(endTime);
  if (currentTime < startTime) {
    return (
      <Badge
        status="default"
        text={intl.formatMessage({
          id: 'component.ProcessBadge.default',
          defaultMessage: '未开始',
        })}
      />
    );
  }
  if (currentTime >= startTime && currentTime <= endTime) {
    return (
      <Badge
        status="processing"
        text={intl.formatMessage({
          id: 'component.ProcessBadge.processing',
          defaultMessage: '进行中',
        })}
      />
    );
  }
  if (currentTime > endTime) {
    return (
      <Badge
        status="error"
        text={intl.formatMessage({
          id: 'component.ProcessBadge.error',
          defaultMessage: '已结束',
        })}
      />
    );
  }
  return null;
};

export default ProcessBadge;
