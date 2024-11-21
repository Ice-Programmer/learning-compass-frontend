import { userRegisterUsingPost } from '@/services/learning-compass/userController';
import { FormattedMessage, history, useIntl } from '@@/exports';
import { ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-components';
import { message } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
    form: {
      width: '100%',
      height: '100%',
      justifyItems: 'center',
      marginTop: '10%',
    },
  };
});

const RegisterPage: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();

  const userType = [
    {
      value: 'student',
      label: intl.formatMessage({ id: 'user.role.student', defaultMessage: '学生' }),
    },
    {
      value: 'teacher',
      label: intl.formatMessage({ id: 'user.role.teacher', defaultMessage: '老师' }),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <StepsForm
          onFinish={async (values: API.UserRegisterRequest) => {
            try {
              // 注册
              const res = await userRegisterUsingPost({ ...values });
              if (res.code === 0) {
                message.success(
                  intl.formatMessage({ id: 'pages.register.success', defaultMessage: '注册成功!' }),
                );
                history.push('/user/login');
                return;
              } else {
                message.error(
                  intl.formatMessage({
                    id: 'pages.register.failure',
                    defaultMessage: '注册失败，请重试',
                  }) + res.message,
                );
                history.push('/user/login');
              }
            } catch (error) {
              console.log(error);
            }
            return Promise.resolve(true);
          }}
        >
          <StepsForm.StepForm
            name="userInfo"
            title={intl.formatMessage({
              id: 'pages.register.account.step.one',
              defaultMessage: '用户信息',
            })}
          >
            <ProFormText
              label={intl.formatMessage({
                id: 'pages.register.account.name',
                defaultMessage: '账户',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '请输入用户名',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
              name="userAccount"
            />
            <ProFormSelect
              label={intl.formatMessage({
                id: 'pages.register.account.user.role',
                defaultMessage: '身份',
              })}
              name="userRole"
              rules={[
                {
                  required: true,
                },
              ]}
              options={userType}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="step2"
            title={intl.formatMessage({
              id: 'pages.register.step.two',
              defaultMessage: '设置密码',
            })}
          >
            <ProFormText.Password
              label={intl.formatMessage({
                id: 'pages.register.password.name',
                defaultMessage: '密码',
              })}
              name="userPassword"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              label={intl.formatMessage({
                id: 'pages.register.password.check',
                defaultMessage: '确认密码',
              })}
              name="checkPassword"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </div>
    </div>
  );
};
export default RegisterPage;
