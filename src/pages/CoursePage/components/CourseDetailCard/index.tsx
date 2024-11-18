import ProcessBadge from '@/components/ProcessBadge';
import CourseDetailTabCard from '@/pages/CoursePage/components/CourseDetailTabCard';
import { getCourseVoByIdUsingGet } from '@/services/learning-compass/courseController';
import { DateTimeUtil } from '@/utils/DateUtil';
import { FormattedMessage, useIntl, useParams } from '@@/exports';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, message, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

const { Paragraph, Title, Text } = Typography;

const CourseInfoCard: React.FC = () => {
  const params = useParams();
  const intl = useIntl();
  const [courseVO, setCourseVO] = useState<API.CourseVO>();

  // 获取课程详细信息
  const getCourseVO = async () => {
    try {
      if (params.courseId) {
        const id = params.courseId;
        const res = await getCourseVoByIdUsingGet({ id } as any);
        if (res.code === 0 && res.data) {
          setCourseVO(res.data);
        } else {
          message.error(
            intl.formatMessage({
              id: 'pages.course.getCourseVO.failure',
              defaultMessage: '登录成功!',
            }) + res.message,
          );
        }
      }
    } catch (e: any) {
      const errorMsg =
        intl.formatMessage({
          id: 'pages.course.getCourseVO.failure',
          defaultMessage: '获取课程信息失败!',
        }) + e.message;
      message.error(errorMsg);
    }
  };

  useEffect(() => {
    getCourseVO().then();
  }, []);

  return (
    <div className="courseInfoCard">
      {courseVO ? (
        <div>
          <Space direction={'vertical'} size="middle">
            <Card>
              <Row gutter={[16, 8]} align="middle">
                <Col xs={24} lg={7} style={{ height: '100%' }}>
                  <img
                    alt={courseVO.name}
                    style={{ width: '100%', height: '180px', borderRadius: '5%' }}
                    src={courseVO.picture}
                  />
                </Col>
                <Col xs={24} lg={16}>
                  <Space direction="vertical">
                    <Title level={4}>{courseVO.name}</Title>
                    <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                      {courseVO.description}
                    </Paragraph>
                    <Space size="middle">
                      <span>
                        <FormattedMessage
                          id="pages.course.info.detail.teacher"
                          defaultMessage="主讲老师:"
                        />
                      </span>
                      <Space>
                        <Avatar
                          size="small"
                          src={courseVO.teacherInfo?.userAvatar}
                          icon={<UserOutlined />}
                          alt="teacher avatar"
                        />
                        <Text strong>{courseVO.teacherInfo?.userName}</Text>
                      </Space>
                    </Space>
                    <Space>
                      <Button type="primary">
                        <FormattedMessage
                          id="pages.course.info.detail.joinCourse"
                          defaultMessage="参加课程"
                        />
                      </Button>
                      <Button>
                        <FormattedMessage
                          id="pages.course.info.detail.shareCourse"
                          defaultMessage="分享课程"
                        />
                      </Button>
                      <Space size="large" style={{ marginLeft: 10 }}>
                        <div>
                          {`${DateTimeUtil.formatDateTime(courseVO.startTime)}
                        to
                        ${DateTimeUtil.formatDateTime(courseVO.startTime)}`}
                        </div>
                        <ProcessBadge startTime={courseVO.startTime} endTime={courseVO.endTime} />
                      </Space>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Card>
            <CourseDetailTabCard courseVO={courseVO} />

          </Space>
        </div>
      ) : null}
    </div>
  );
};

export default CourseInfoCard;
