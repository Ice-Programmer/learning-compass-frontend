import CourseInfoCard from '@/components/CourseInfoCard';
import { pageCourseVoUsingPost } from '@/services/learning-compass/courseController';
import { useIntl } from '@umijs/max';
import { Divider, Input, List } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const { Search } = Input;

const CourseListPage: React.FC = () => {
  const intl = useIntl();
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const [searchParam, setSearchParam] = useState<API.CourseQueryRequest>({
    ...initSearchParam,
  });
  const [total, setTotal] = useState<number>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [courseList, setCourseLIst] = useState<API.CourseVO[]>();

  const getCourseVOList = async () => {
    setSearchLoading(true);
    try {
      const res = await pageCourseVoUsingPost(searchParam);
      if (res.code === 0) {
        setCourseLIst(res.data?.records ?? []);
        setTotal(res.data?.total ?? 0);
      }
    } catch (error: any) {
      console.log(error);
    }
    setSearchLoading(false);
  };

  useEffect(() => {
    getCourseVOList().then();
  }, [searchParam]);

  return (
    <>
      <Search
        placeholder={intl.formatMessage({
          id: 'pages.course.search.placeholder',
          defaultMessage: '请输入搜索内容',
        })}
        className={styles.searchButton}
        enterButton={intl.formatMessage({
          id: 'pages.course.search.button',
          defaultMessage: '搜索',
        })}
        size="large"
        loading={searchLoading}
        onSearch={(value) => {
          setSearchParam({
            ...initSearchParam,
            searchText: value,
          });
        }}
      />

      <Divider />

      <List
        grid={{
          gutter: 18,
          column: 4,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
        }}
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
        dataSource={courseList}
        renderItem={(courseVO: API.CourseVO) => (
          <List.Item key={courseVO.id}>
            <CourseInfoCard courseVO={courseVO} width={300} height={330} imgHeight={200} />
          </List.Item>
        )}
      />
    </>
  );
};

export default CourseListPage;
