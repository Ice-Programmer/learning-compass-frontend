import { SwapRightOutlined, UserOutlined } from '@ant-design/icons';
import { FormattedMessage, history } from '@umijs/max';
import { Avatar, Button, Card, Flex, Space, Typography } from 'antd';
import React from 'react';
import './index.less';

const { Text, Title } = Typography;

interface Props {
  courseVO: API.CourseVO;
  width: number;
  height: number;
  imgHeight: number;
}

const colorList = [
  'red',
  'magenta',
  'volcano',
  'orange',
  'gold',
  'lime',
  'cyan',
  'green',
  'blue',
  'geekblue',
  'purple',
];
//
const CourseInfoCard: React.FC<Props> = (props) => {
  const { courseVO, width, height, imgHeight } = props;

  const onButtonClick = () => {
    history.push(`/course/detail/${courseVO.id}`);
  };

  return (
    <Card
      className="courseInfoCard"
      style={{ width: width, height: height }}
      cover={
        <img
          alt="course Image"
          className="cardImage"
          src={courseVO.picture}
          style={{ height: imgHeight }}
        />
      }
    >
      <Flex vertical className="cardContent">
        <Title level={4}>{courseVO.name}</Title>
        <Flex
          justify="space-between"
          style={{ width: '92%', position: 'absolute', bottom: 10 }}
          align="center"
        >
          <Space>
            <Avatar src={courseVO.teacherInfo?.userAvatar} icon={<UserOutlined />} />
            <Text strong>{courseVO.teacherInfo?.userName}</Text>
          </Space>

          <Button type="primary" shape="round" onClick={onButtonClick}>
            <FormattedMessage id="component.courseCard.enterButton" defaultMessage="去了解" />
            <SwapRightOutlined />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
export default CourseInfoCard;
