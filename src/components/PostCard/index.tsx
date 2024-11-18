import { DateTimeUtil } from '@/utils/DateUtil';
import { useIntl } from '@@/exports';
import { EyeOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';
import { Avatar, Flex, List, Space, Typography } from 'antd';
import React from 'react';
import './index.less';

const { Title, Paragraph, Text } = Typography;

interface Props {
  postVO: API.PostVO;
}

const IconText = ({
  icon,
  text,
  onClick,
}: {
  icon: React.FC;
  text: string;
  onClick: () => void;
}) => (
  <Space onClick={onClick} style={{ cursor: 'pointer' }}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PostCard: React.FC<Props> = (props) => {
  const intl = useIntl();
  /**
   * 课程资料类型枚举
   */
  const UserRoleEnum = {
    student: {
      name: intl.formatMessage({ id: 'user.role.student', defaultMessage: '学生' }),
      value: 'student',
    },
    teacher: {
      name: intl.formatMessage({ id: 'user.role.teacher', defaultMessage: '教师' }),
      value: 'teacher',
    },
    admin: {
      name: intl.formatMessage({ id: 'user.role.admin', defaultMessage: '管理员' }),
      value: 'admin',
    },
    'super-admin': {
      name: intl.formatMessage({ id: 'user.role.super-admin', defaultMessage: '超级管理员' }),
      value: 'super-admin',
    },
    ban: {
      name: intl.formatMessage({ id: 'user.role.ban', defaultMessage: '被封号' }),
      value: 'ban',
    },
    user: {
      name: intl.formatMessage({ id: 'user.role.user', defaultMessage: '普通用户' }),
      value: 'user',
    },
  } as any;

  const thumbPost = async (postId: number) => {};
  const favourPost = async (postId: number) => {};

  const { postVO } = props;
  return (
    <div className="postCardItem">
      <List.Item
        actions={[
          <IconText
            onClick={() => thumbPost(postVO.postId ?? 0)}
            icon={StarOutlined}
            text={postVO.thumbNum?.toString() ?? '0'}
            key="list-vertical-star-o"
          />,
          <IconText
            onClick={() => favourPost(postVO.postId ?? 0)}
            icon={LikeOutlined}
            text={postVO.favourNum?.toString() ?? '0'}
            key="list-vertical-like-o"
          />,
          <IconText
            onClick={() => {}}
            icon={MessageOutlined}
            text="2"
            key="list-vertical-message"
          />,
        ]}
      >
        <Flex align="center" gap={10}>
          <Avatar size={40} src={postVO.userInfo?.userAvatar} />
          <Flex vertical>
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>{postVO.userInfo?.userName}</span>
            <Text type="secondary">
              {`
                ${UserRoleEnum[postVO.userInfo?.userRole ?? 'user'].name}
                 ·
                ${DateTimeUtil.formatPostDateTime(postVO.createTime)}
                 ·
              `}
              <span>
                <EyeOutlined />{' '}
                <FormattedMessage
                  id={'pages.course.info.detail.tabs.note.view.name'}
                  defaultMessage="浏览量"
                />{' '}
                {postVO.viewNum}
              </span>
            </Text>
          </Flex>
        </Flex>
        <Title className="title" level={4}>
          {postVO.name}
        </Title>
        <Paragraph
          type="secondary"
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: intl.formatMessage({
              id: 'component.post.expandable.symbol',
              defaultMessage: '展开',
            }),
          }}
        >
          {postVO.content}
        </Paragraph>
      </List.Item>
    </div>
  );
};

export default PostCard;
