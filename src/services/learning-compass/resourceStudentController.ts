// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** studentViewResource POST /api/resource/student/view */
export async function studentViewResourceUsingPost(
  body: API.StudentViewResourceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/resource/student/view', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
