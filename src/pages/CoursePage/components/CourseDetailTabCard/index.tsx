import CourseIntroductionContent from '@/pages/CoursePage/components/CourseDetailTabCard/components/CourseIntroductionContent';
import CourseResourceListContent from '@/pages/CoursePage/components/CourseDetailTabCard/components/CourseResourceListContent';
import CourseNoteListCard from '@/pages/CoursePage/components/CourseNoteListCard';
import { useIntl } from '@@/exports';
import { Card } from 'antd';
import React, { useState } from 'react';

interface Props {
  courseVO: API.CourseVO;
}

const CourseDetailTabCard: React.FC<Props> = (props) => {
  const { courseVO } = props;
  const [activeTabKey, setActiveTabKey] = useState<string>('introduction');

  const intl = useIntl();

  const tabList = [
    {
      key: 'introduction',
      label: intl.formatMessage({
        id: 'pages.course.info.detail.tabs.introduction.name',
        defaultMessage: '介绍',
      }),
    },
    {
      key: 'resource',
      label: intl.formatMessage({
        id: 'pages.course.info.detail.tabs.resource.name',
        defaultMessage: '课程资料',
      }),
    },
    {
      key: 'community',
      label: intl.formatMessage({
        id: 'pages.course.info.detail.tabs.community.name',
        defaultMessage: '问答',
      }),
    },
    {
      key: 'note',
      label: intl.formatMessage({
        id: 'pages.course.info.detail.tabs.note.name',
        defaultMessage: '笔记',
      }),
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    introduction: (
      <CourseIntroductionContent
        introduction={
          courseVO.introduction ??
          intl.formatMessage({
            id: 'pages.course.info.detail.tabs.introduction.null',
            defaultMessage: '暂无内容',
          })
        }
      />
    ),
    resource: <CourseResourceListContent />,
    note: <CourseNoteListCard />,
  };

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <Card
      style={{ width: '100%' }}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
      tabProps={{
        size: 'middle',
      }}
    >
      {contentList[activeTabKey]}
    </Card>
  );
};

export default CourseDetailTabCard;
