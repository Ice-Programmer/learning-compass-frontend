import MyDivider from '@/components/MyDivider';
import PostCard from '@/components/PostCard';
import { PostTypeEnum } from '@/enums/PostTypeEnum';
import { SortOrderEnum } from '@/enums/SortOrderEnum';
import { pagePostVoUsingPost } from '@/services/learning-compass/postController';
import { useIntl, useParams } from '@@/exports';
import { EditOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const CourseNoteListCard: React.FC = () => {
  const intl = useIntl();
  const params = useParams();

  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const [searchParam, setSearchParam] = useState<API.PostQueryRequest>({
    ...initSearchParam,
  });
  const [noteList, setNoteList] = useState<API.PostVO[]>();
  const [total, setTotal] = useState<number>();
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('all');
  // todo 骨架屏
  const [loading, setLoading] = useState<boolean>(false);
  const action = useRef<ActionType>();

  /**
   * 获取笔记列表
   */
  const getNoteList = async () => {
    setLoading(true);
    try {
      if (params.courseId) {
        const id = params.courseId;
        const postQueryRequest: API.PostQueryRequest = {
          ...searchParam,
          courseId: id as any,
          postType: PostTypeEnum.LEARNING_NOTE.value,
        };
        const res = await pagePostVoUsingPost(postQueryRequest);
        if (res.code === 0 && res.data) {
          setNoteList(res.data?.records ?? []);
          setTotal(res.data?.total ?? 0);
        } else {
          const errorMsg =
            intl.formatMessage({
              id: 'pages.course.info.detail.tabs.getList.failure',
              defaultMessage: '获取笔记列表失败!',
            }) + res.message;
          message.error(errorMsg);
        }
      }
    } catch (e: any) {
      const errorMsg =
        intl.formatMessage({
          id: 'pages.course.info.detail.tabs.getList.failure',
          defaultMessage: '获取笔记列表失败!',
        }) + e.message;
      message.error(errorMsg);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNoteList().then();
  }, [searchParam]);
  return (
    <ProList<API.PostVO>
      rowKey="name"
      actionRef={action}
      itemLayout="vertical"
      dataSource={noteList}
      split={true}
      pagination={{
        onChange: (page, pageSize) => {
          console.log(page);
          setSearchParam({
            ...searchParam,
            current: page,
            pageSize,
          });
        },
        pageSize: searchParam.pageSize,
        current: searchParam.current,
        total: total,
      }}
      renderItem={(note: API.PostVO) => (
        <div key={note.id}>
          <PostCard postVO={note} />
          <MyDivider gap={1} />
        </div>
      )}
      toolbar={{
        // todo 选择过滤信息
        menu: {
          activeKey,
          items: [
            {
              key: 'all',
              label: (
                <FormattedMessage
                  id="pages.course.info.detail.tabs.note.all.name"
                  defaultMessage="全部笔记"
                />
              ),
            },
            {
              key: 'new',
              label: (
                <FormattedMessage
                  id="pages.course.info.detail.tabs.note.new.name"
                  defaultMessage="最新"
                />
              ),
            },
            {
              key: 'hot',
              label: (
                <FormattedMessage
                  id="pages.course.info.detail.tabs.note.hot.name"
                  defaultMessage="最热"
                />
              ),
            },
          ],
          onChange(key) {
            if (key === 'new') {
              setSearchParam({
                ...searchParam,
                sortField: 'createTime',
                sortOrder: SortOrderEnum['SORT_ORDER_DESC'].value,
              });
            }
            if (key === 'hot') {
              setSearchParam({
                ...searchParam,
                sortField: 'viewNum',
                sortOrder: SortOrderEnum['SORT_ORDER_DESC'].value,
              });
            }
            if (key === 'all') {
              setSearchParam({
                ...initSearchParam,
              });
            }
            setActiveKey(key);
          },
        },
        search: {
          placeholder: intl.formatMessage({
            id: 'pages.course.info.detail.tabs.search.placeholder',
            defaultMessage: '请输入',
          }),
          onSearch: (value: string) => {
            setSearchParam({
              ...searchParam,
              searchText: value,
            });
          },
        },
        actions: [
          <Button type="primary" key="primary">
            <EditOutlined />
            <FormattedMessage
              id="pages.course.info.detail.tabs.add.buttonName"
              defaultMessage="写笔记"
            />
          </Button>,
        ],
      }}
    />
  );
};

export default CourseNoteListCard;
