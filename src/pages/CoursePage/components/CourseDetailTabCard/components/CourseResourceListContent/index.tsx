import { getCourseResourceVoUsingGet } from '@/services/learning-compass/courseResourceController';
import { studentViewResourceUsingPost } from '@/services/learning-compass/resourceStudentController';
import { DateTimeUtil } from '@/utils/DateUtil';
import { useIntl, useParams } from '@@/exports';
import { FormattedMessage } from '@umijs/max';
import { List, message, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

const CourseResourceListContent: React.FC = () => {
  const intl = useIntl();

  const params = useParams();
  const [initLoading, setInitLoading] = useState(true);
  const [resourceVOList, setResourceVOList] = useState<API.ResourceStudentVO[]>([]);

  /**
   * 获取课程资料
   */
  const getCourseResourceVO = async () => {
    setInitLoading(true);
    try {
      if (params.courseId) {
        const id = params.courseId;
        const res = await getCourseResourceVoUsingGet({ courseId: id as any });
        if (res.code === 0 && res.data) {
          setResourceVOList(res.data);
        } else {
          const errorMsg =
            intl.formatMessage({
              id: 'pages.course.getCourseResource.failure',
              defaultMessage: '获取课程相关资料失败!',
            }) + res.message;
          message.error(errorMsg);
        }
      }
    } catch (e: any) {
      const errorMsg =
        intl.formatMessage({
          id: 'pages.course.getCourseResource.failure',
          defaultMessage: '获取课程相关资料失败!',
        }) + e.message;
      message.error(errorMsg);
    } finally {
      setInitLoading(false);
    }
  };

  const viewResource = async (resourceId: number) => {
    try {
      const res = await studentViewResourceUsingPost({ resourceId });
      if (res.code === 0) {
        message.success(
          intl.formatMessage({
            id: 'pages.course.downloadCourseResource.success',
            defaultMessage: '下载课程资料成功!',
          }),
        );
      } else {
        const errorMsg =
          intl.formatMessage({
            id: 'pages.course.downloadCourseResource.failure',
            defaultMessage: '下载课程资料失败!',
          }) + res.message;
        message.error(errorMsg);
      }
    } catch (err: any) {
      const errorMsg =
        intl.formatMessage({
          id: 'pages.course.downloadCourseResource.failure',
          defaultMessage: '下载课程资料失败!',
        }) + err.message;
      message.error(errorMsg);
    }
  };

  useEffect(() => {
    getCourseResourceVO().then();
  }, []);

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={resourceVOList}
      renderItem={(resourceVO: API.ResourceStudentVO) => (
        <List.Item
          key={resourceVO.id}
          actions={[
            <a
              key="download"
              href={resourceVO.resourceUrl}
              onClick={() => {
                viewResource(resourceVO.id ?? 0);
              }}
            >
              <FormattedMessage
                id="pages.course.info.detail.tabs.resource.download.label"
                defaultMessage="下载"
              />
            </a>,
          ]}
        >
          <Skeleton avatar title={false} loading={initLoading} active>
            <List.Item.Meta
              title={
                <span>
                  {resourceVO.resourceName}
                  {'   '}
                  {resourceVO.isRead ? <span>✅</span> : null}
                </span>
              }
            />
            {resourceVO.isRead ? (
              <span>
                <FormattedMessage
                  id="pages.course.info.detail.tabs.resource.download.viewTime"
                  defaultMessage="最近下载时间: "
                />
                {DateTimeUtil.formatDateTime(resourceVO.viewTime)}
              </span>
            ) : null}
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default CourseResourceListContent;
