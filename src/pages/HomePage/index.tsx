import { ArrowRightOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';
import { Space, Typography } from 'antd';
import React from 'react';
import './index.less';

const { Title, Paragraph, Text } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <div className="home">
        <Space size={40} direction="vertical" className="homeContent">
          <Paragraph style={{ maxWidth: 530 }}>
            <Title style={{ color: 'white' }}>
              <FormattedMessage id="pages.home.content.title" defaultMessage="学有所成，卓尔不凡" />
            </Title>
            <Text style={{ color: 'white', fontSize: 20 }}>
              <Text strong={true} style={{ color: 'white', fontSize: 35 }}>
                Learn Compass{' '}
              </Text>
              <FormattedMessage
                id="pages.home.content.content"
                defaultMessage="在线学习网站，帮助你掌握时间，提升人生"
              />
            </Text>
          </Paragraph>
          <button type="button" className="welcomeButton">
            <Space>
              <FormattedMessage id="pages.home.button.title" defaultMessage="开启学习之旅" />
              <ArrowRightOutlined />
            </Space>
          </button>
        </Space>
      </div>
    </>
  );
};

export default Home;
