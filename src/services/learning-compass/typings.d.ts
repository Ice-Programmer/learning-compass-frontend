declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCourseVO_ = {
    code?: number;
    data?: CourseVO;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListResourceStudentVO_ = {
    code?: number;
    data?: ResourceStudentVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageCourse_ = {
    code?: number;
    data?: PageCourse_;
    message?: string;
  };

  type BaseResponsePageCourseVO_ = {
    code?: number;
    data?: PageCourseVO_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Course = {
    createTime?: string;
    description?: string;
    endTime?: string;
    id?: number;
    introduction?: string;
    isDelete?: number;
    name?: string;
    picture?: string;
    startTime?: string;
    status?: number;
    tags?: string;
    teacherId?: number;
    updateTime?: string;
  };

  type CourseAddRequest = {
    description?: string;
    endTime?: string;
    name?: string;
    picture?: string;
    startTime?: string;
    tagList?: string[];
  };

  type CourseEditRequest = {
    description?: string;
    endTime?: string;
    id?: number;
    name?: string;
    picture?: string;
    startTime?: string;
    tagList?: string[];
  };

  type CourseQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    name?: string;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    signInStudentId?: number;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    teacherId?: number;
  };

  type CourseResourceAddRequest = {
    courseId?: number;
    resourceName?: string;
    resourceType?: number;
    resourceUrl?: string;
  };

  type CourseUpdateRequest = {
    description?: string;
    endTime?: string;
    id?: number;
    name?: string;
    picture?: string;
    startTime?: string;
    status?: number;
    tagList?: string[];
  };

  type CourseVO = {
    description?: string;
    endTime?: string;
    id?: number;
    introduction?: string;
    name?: string;
    picture?: string;
    startTime?: string;
    status?: number;
    tagList?: string[];
    teacherInfo?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type disbandCourseUsingPOSTParams = {
    id?: number;
  };

  type getCourseResourceVOUsingGETParams = {
    /** courseId */
    courseId: number;
  };

  type getCourseVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageCourse_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Course[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCourseVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CourseVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PostAddRequest = {
    content?: string;
    courseId?: number;
    name?: string;
    pictureList?: string[];
    postId?: number;
    postType?: number;
    tagList?: string[];
  };

  type PostQueryRequest = {
    content?: string;
    courseId?: number;
    current?: number;
    favourUserId?: number;
    id?: number;
    ids?: number[];
    isReply?: number;
    name?: string;
    notId?: number;
    pageSize?: number;
    postId?: number;
    postType?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tagList?: string[];
    thumbUserId?: number;
    userId?: number;
  };

  type PostVO = {
    content?: string;
    courseId?: number;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    isReply?: number;
    name?: string;
    pictureList?: string[];
    postId?: number;
    postType?: number;
    tagList?: string[];
    thumbNum?: number;
    updateTime?: string;
    userInfo?: UserVO;
    viewNum?: number;
  };

  type ResourceStudentVO = {
    createTime?: string;
    id?: number;
    isRead?: boolean;
    resourceName?: string;
    resourceType?: number;
    resourceUrl?: string;
    viewNum?: number;
    viewTime?: string;
  };

  type StudentJoinCourseRequest = {
    courseId?: number;
  };

  type StudentViewResourceRequest = {
    resourceId?: number;
  };

  type User = {
    createTime?: string;
    email?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    email?: string;
    id?: number;
    ids?: number[];
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserUpdateMyRequest = {
    email?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    email?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    email?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
