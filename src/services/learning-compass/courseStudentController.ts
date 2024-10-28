// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** studentJoinCourse POST /api/course/student/join */
export async function studentJoinCourseUsingPost(
  body: API.StudentJoinCourseRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/course/student/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
