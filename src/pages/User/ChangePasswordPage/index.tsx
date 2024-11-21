import { changePasswordUsingPost } from '@/services/learning-compass/userController';
import { FormattedMessage, history, useIntl } from '@@/exports';
import { ProForm, ProFormText } from '@ant-design/pro-components';
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

const ChangePasswordPage: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <ProForm
          onFinish={async (values: API.UserChangePasswordRequest) => {
            try {
              // 注册
              const res = await changePasswordUsingPost({ ...values });
              if (res.code === 0) {
                message.success(
                  intl.formatMessage({ id: 'pages.user.success', defaultMessage: '注册成功!' }),
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
          <ProFormText.Password
            label={intl.formatMessage({
              id: 'pages.change.password.original',
              defaultMessage: '原始密码',
            })}
            name="originalPassword"
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
              id: 'pages.change.password.new',
              defaultMessage: '新密码',
            })}
            name="newPassword"
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
            width="lg"
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
        </ProForm>
      </div>
    </div>
  );
};
export default ChangePasswordPage;
