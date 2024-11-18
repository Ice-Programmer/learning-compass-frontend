import MdViewer from '@/components/MdViewer';
import React from 'react';

interface Props {
  introduction: string;
}

const CourseIntroductionContent: React.FC<Props> = (props) => {
  const { introduction } = props;
  return <MdViewer value={introduction} />;
};

export default CourseIntroductionContent;
