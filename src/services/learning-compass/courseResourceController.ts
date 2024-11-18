// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addCourseResource POST /api/course/resource/add */
export async function addCourseResourceUsingPost(
  body: API.CourseResourceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/course/resource/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCourse POST /api/course/resource/delete */
export async function deleteCourseUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/course/resource/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCourseResourceVO GET /api/course/resource/get/vo/${param0} */
export async function getCourseResourceVoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseResourceVOUsingGETParams,
  options?: { [key: string]: any },
) {
  const { courseId: param0, ...queryParams } = params;
  return request<API.BaseResponseListResourceStudentVO_>(`/api/course/resource/get/vo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
