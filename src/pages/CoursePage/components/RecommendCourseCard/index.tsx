import ProcessBadge from '@/components/ProcessBadge';
import { pageCourseVoUsingPost } from '@/services/learning-compass/courseController';
import { useIntl, useParams } from '@@/exports';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, message, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import './index.less';

const { Paragraph, Text } = Typography;

const RecommendCourseCard: React.FC = () => {
  const intl = useIntl();
  const params = useParams();
  const [recommendCourseList, setRecommendCourseList] = React.useState<API.CourseVO[]>([]);

  /**
   * 获取推荐课程
   * todo 这里可以扩展
   */
  const getRecommendCourseList = async () => {
    try {
      if (params.courseId) {
        const courseQueryRequest: API.CourseQueryRequest = {
          notId: params.courseId as any,
          pageSize: 5,
        };
        const res = await pageCourseVoUsingPost(courseQueryRequest);
        if (res.code === 0 && res.data) {
          setRecommendCourseList(res.data?.records ?? []);
        } else {
          const errorMsg =
            intl.formatMessage({
              id: 'pages.course.recommend.failure',
              defaultMessage: '获取推荐课程失败!',
            }) + res.message;
          message.error(errorMsg);
        }
      }
    } catch (err: any) {
      const errorMsg =
        intl.formatMessage({
          id: 'pages.course.recommend.failure',
          defaultMessage: '获取推荐课程失败!',
        }) + err.message;
      message.error(errorMsg);
    }
  };

  useEffect(() => {
    getRecommendCourseList().then();
  }, []);

  return (
    <Card
      className="recommend-course-card"
      title={intl.formatMessage({
        id: 'pages.course.recommend.title',
        defaultMessage: '推荐课程',
      })}
    >
      {recommendCourseList ? (
        <Space style={{ width: '100%' }} direction="vertical" size="large">
          {recommendCourseList.map((recommendCourse: API.CourseVO) => (
            <Card
              hoverable
              onClick={() => {
                location.href = `/course/detail/${recommendCourse.id}`;
              }}
              key={recommendCourse.id}
              className="courseInfoCard"
              style={{ width: '100%', height: '230px' }}
              cover={
                <img
                  alt="course Image"
                  className="cardImage"
                  src={recommendCourse.picture}
                  style={{ height: 150 }}
                />
              }
            >
              <Flex vertical className="cardContent">
                <Paragraph strong ellipsis={{ rows: 1 }}>
                  {recommendCourse.name}
                </Paragraph>
                <Flex
                  justify="space-between"
                  style={{ width: '92%', position: 'absolute', bottom: 10 }}
                  align="center"
                >
                  <Space>
                    <Avatar src={recommendCourse.teacherInfo?.userAvatar} icon={<UserOutlined />} />
                    <Text strong>{recommendCourse.teacherInfo?.userName}</Text>
                  </Space>
                  <ProcessBadge
                    startTime={recommendCourse.startTime}
                    endTime={recommendCourse.endTime}
                  />
                </Flex>
              </Flex>
            </Card>
          ))}
        </Space>
      ) : null}
    </Card>
  );
};

export default RecommendCourseCard;
