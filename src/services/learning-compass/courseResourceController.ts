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
