import { doPostFavourUsingPost } from '@/services/learning-compass/postFavourController';
import { doThumbUsingPost } from '@/services/learning-compass/postThumbController';
import { DateTimeUtil } from '@/utils/DateUtil';
import { useIntl } from '@@/exports';
import {
  EyeOutlined,
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';
import { Avatar, Flex, List, message, Space, Typography } from 'antd';
import React, { useState } from 'react';
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
    <Text style={{ userSelect: 'none' }} type={'secondary'}>
      {text}
    </Text>
  </Space>
);

const LikeFilledWithBlue = () => {
  return <LikeFilled style={{ color: '#1677ff' }} />;
};

const StarFilledWithBlue = () => {
  return <StarFilled style={{ color: '#1677ff' }} />;
};
const PostCard: React.FC<Props> = (props) => {
  const { postVO } = props;
  const intl = useIntl();
  const [hasThumb, setHasThumb] = useState<boolean>(postVO.hasThumb ?? false);
  const [thumbNum, setThumbNum] = useState<number>(postVO.thumbNum ?? 0);
  const [hasFavour, setHasFavour] = useState<boolean>(postVO.hasFavour ?? false);
  const [favourNum, setFavourNum] = useState<number>(postVO.favourNum ?? 0);

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

  const thumbPost = async (postId: number) => {
    try {
      const res = await doThumbUsingPost({ postId: postId });
      if (res.code === 0) {
        if (res.data === 1) {
          setHasThumb(true);
          setThumbNum(thumbNum + 1);
          message.success(
            intl.formatMessage({
              id: 'pages.note.thumb.do',
              defaultMessage: '点赞成功!',
            }),
          );
        } else if (res.data === -1) {
          setHasThumb(false);
          setThumbNum(thumbNum - 1);
          message.success(
            intl.formatMessage({
              id: 'pages.note.thumb.cancel',
              defaultMessage: '取消点赞成功!',
            }),
          );
        }
      } else {
        const errorMsg =
          intl.formatMessage({
            id: 'pages.note.thumb.failure',
            defaultMessage: '点赞失败!',
          }) + res.message;
        message.error(errorMsg);
      }
    } catch (err: any) {
      const errorMsg =
        intl.formatMessage({
          id: 'pages.note.thumb.failure',
          defaultMessage: '点赞失败!',
        }) + err.message;
      message.error(errorMsg);
    }
  };

  const favourPost = async (postId: number) => {
    try {
      const res = await doPostFavourUsingPost({ postId: postId });
      if (res.code === 0) {
        if (res.data === 1) {
          setHasFavour(true);
          setFavourNum(favourNum + 1);
          message.success(
            intl.formatMessage({
              id: 'pages.note.favour.do',
              defaultMessage: '收藏成功!',
            }),
          );
        } else if (res.data === -1) {
          setHasFavour(false);
          setFavourNum(favourNum - 1);
          message.success(
            intl.formatMessage({
              id: 'pages.note.favour.cancel',
              defaultMessage: '取消收藏成功!',
            }),
          );
        }
      } else {
        const errorMsg =
          intl.formatMessage({
            id: 'pages.note.favour.failure',
            defaultMessage: '收藏失败!',
          }) + res.message;
        message.error(errorMsg);
      }
    } catch (err: any) {
      const errorMsg =
        intl.formatMessage({
          id: 'pages.note.favour.failure',
          defaultMessage: '收藏失败!',
        }) + err.message;
      message.error(errorMsg);
    }
  };
  return (
    <div className="postCardItem">
      <List.Item
        actions={[
          <IconText
            onClick={() => thumbPost(postVO.id ?? 0)}
            icon={hasThumb ? LikeFilledWithBlue : LikeOutlined}
            text={thumbNum.toString() ?? '0'}
            key="list-vertical-like-o"
          />,
          <IconText
            onClick={() => favourPost(postVO.id ?? 0)}
            icon={hasFavour ? StarFilledWithBlue : StarOutlined}
            text={favourNum.toString() ?? '0'}
            key="list-vertical-star-o"
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
