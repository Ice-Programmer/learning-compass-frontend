import { Divider } from 'antd';
import React from 'react';

interface Props {
  gap: number;
}

const MyDivider: React.FC<Props> = (props) => {
  const { gap } = props;
  return <Divider style={{ margin: `${gap}px 0` }} />;
};

export default MyDivider;
