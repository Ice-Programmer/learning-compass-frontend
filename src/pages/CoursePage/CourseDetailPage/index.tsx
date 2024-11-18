import CourseDetailCard from '@/pages/CoursePage/components/CourseDetailCard';
import CourseResourceCard from '@/pages/CoursePage/components/CourseResourceCard';
import RecommendCourseCard from '@/pages/CoursePage/components/RecommendCourseCard';
import { FormattedMessage } from '@@/exports';
import { AlertTwoTone, DatabaseTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { Col, Row, Tabs } from 'antd';
import React from 'react';
import './index.less';

const CourseDetailPage: React.FC = () => {
  return (
    <div className="courseInfo">
      <Row>
        <Col span={23} style={{ width: '100%', height: 100}}>
          <Tabs
            size="large"
            tabPosition="left"
            items={[
              {
                key: '1',
                label: (
                  <span>
                    <InfoCircleTwoTone />{' '}
                    <FormattedMessage id="pages.course.info.detail" defaultMessage="课程信息" />
                  </span>
                ),
                children: <CourseDetailCard />,
              },
              {
                key: '2',
                label: (
                  <span>
                    <DatabaseTwoTone />{' '}
                    <FormattedMessage id="pages.course.info.resource" defaultMessage="课程资料" />
                  </span>
                ),
                children: <CourseResourceCard />,
              },
              {
                key: '3',
                label: (
                  <span>
                    <AlertTwoTone />{' '}
                    <FormattedMessage id="pages.course.info.score" defaultMessage="课程分数" />
                  </span>
                ),
              },
            ]}
          />
        </Col>
        <Col lg={5} sm={0} xs={0} md={0} style={{position: 'absolute', top: 32, right: 40, width: '80%'}}>
          <RecommendCourseCard />
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetailPage;
