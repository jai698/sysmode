import React, { useEffect, useState } from 'react';
import { Table, Select, Space, Typography, Spin, Card } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const ListingDetails = () => {
  const [data, setData] = useState({
    automated: [],
    not_automated: [],
    cl_automated: null
  });
  const [loading, setLoading] = useState(true);
  const [empType, setEmpType] = useState('job');
  const [account, setAccount] = useState('pv');

  useEffect(() => {
    fetchListings();
  }, [empType, account]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trollgold.org/get_auto_listings?emp_type=${empType}&account=${account}`,
        {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOaXRlc2giLCJleHAiOjE3MzIzNjk5ODZ9.zztWR5PBVY3LHejYaGdBUjgY1q0uHQXGkegYJQIrCa0'
          }
        }
      );

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const FilterControls = () => (
    <Card style={{ marginBottom: '24px' }}>
      <Space size="large">
        <div>
          <Typography.Text strong>Employment Type: </Typography.Text>
          <Select 
            value={empType} 
            onChange={setEmpType}
            style={{ width: 120, marginLeft: 8 }}
          >
            <Option value="job">Job</Option>
            <Option value="internship">Internship</Option>
          </Select>
        </div>
        <div>
          <Typography.Text strong>Account: </Typography.Text>
          <Select 
            value={account} 
            onChange={setAccount}
            style={{ width: 120, marginLeft: 8 }}
          >
            <Option value="pv">PV</Option>
            <Option value="sa">SA</Option>
          </Select>
        </div>
      </Space>
    </Card>
  );

  const automatedColumns = [
    {
      title: 'Listing Name',
      dataIndex: 'listing_name',
      key: 'listing_name',
      width: 200,
    },
    {
      title: 'Listing Number',
      dataIndex: 'listing_number',
      key: 'listing_number',
      width: 120,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectname',
      key: 'projectname',
      width: 150,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: 'Assignment Links',
      dataIndex: 'assignment_link',
      key: 'assignment_link',
      width: 200,
      render: (links) => (
        <Space wrap>
          {links?.map((link, index) => (
            <a 
              key={index} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ whiteSpace: 'nowrap' }}
            >
              <LinkOutlined /> Assignment {index + 1}
            </a>
          ))}
        </Space>
      ),
    },
    {
      title: 'Review Links',
      dataIndex: 'review_link',
      key: 'review_link',
      width: 200,
      render: (links) => (
        <Space wrap>
          {links?.map((link, index) => (
            <a 
              key={index} 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ whiteSpace: 'nowrap' }}
            >
              <LinkOutlined /> Review {index + 1}
            </a>
          ))}
        </Space>
      ),
    },
  ];

  const notAutomatedColumns = [
    {
      title: 'Listing Name',
      dataIndex: 'listing_name',
      key: 'listing_name',
    },
    {
      title: 'Listing Number',
      dataIndex: 'listing_number',
      key: 'listing_number',
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Automated Listings</Title>
      <Table 
        dataSource={data.automated} 
        columns={automatedColumns}
        rowKey="listing_number"
        scroll={{ x: true }}
      />

      <Title level={2} style={{ marginTop: '24px' }}>Not Automated Listings</Title>
      <Table 
        dataSource={data.not_automated} 
        columns={notAutomatedColumns}
        rowKey="listing_number"
      />

      {data.cl_automated && (
        <>
          <Title level={2} style={{ marginTop: '24px' }}>CL Automated</Title>
          <Table 
            dataSource={[data.cl_automated]} 
            columns={automatedColumns}
            rowKey="listing_number"
          />
        </>
      )}
    </div>
  );
};

export default AutoListings;