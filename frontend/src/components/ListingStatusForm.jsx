import { useState, useEffect } from 'react';
import { Form, InputNumber, Select, Button, Card, Statistic, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  EyeOutlined, 
  UserOutlined, 
  CalendarOutlined,
  ArrowLeftOutlined,
  SearchOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;

const ListingStatusForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  // Toast configuration
  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.trollgold.org/persistventures/assignment/listingStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          listing: Number(values.listing),
          account: values.account,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch listing status');
      }

      const data = await response.json();
      setStatusData(data);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Status fetched successfully! 📊</span>,
        style: {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '400px',
        }
      });
    } catch (error) {
      message.error({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to fetch status: {error.message}</span>,
        style: {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '400px',
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'success';
      case 'expired': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto" data-aos="fade-up">
        {/* Header */}
        <div className="flex justify-between items-center h-[50px]">
          <div>
            <h1 className="text-2xl font-bold text-white">Listing Status</h1>
          </div>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[36px] px-4 rounded-md"
          >
            Back
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 p-4 mt-2">
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            className="mb-4 flex flex-wrap gap-4"
            initialValues={{
              account: 'Org 1'
            }}
          >
            <Form.Item
              name="listing"
              label={<span className="text-gray-300">Listing Number</span>}
              rules={[{ required: true }]}
            >
              <InputNumber 
                min={0} 
                placeholder="Enter number"
                className="!w-[160px]"
                style={{ 
                  height: '36px',
                  backgroundColor: 'rgb(17 24 39)',
                  borderColor: 'rgb(75 85 99)',
                  color: 'white'
                }}
              />
            </Form.Item>

            <Form.Item
              name="account"
              label={<span className="text-gray-300">Account</span>}
              rules={[{ required: true }]}
            >
              <Select 
                className="!w-[160px]"
                style={{ height: '36px' }}
              >
                <Option value="Org 1">Organization One</Option>
                <Option value="Org 2">Organization Two</Option>
                <Option value="Org 3">Organization Three</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SearchOutlined />}
                className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[36px] px-4 rounded-md"
              >
                Check Status
              </Button>
            </Form.Item>
          </Form>

          {statusData && (
            <div className="mt-4" data-aos="fade-up">
              <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{statusData.listing_name}</h3>
                  <Tag color={getStatusColor(statusData.status)} className="px-3 py-1">
                    {statusData.status}
                  </Tag>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Statistics cards with dark theme */}
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <Statistic
                      title={<span className="text-gray-300">Total Views</span>}
                      value={statusData.views}
                      prefix={<EyeOutlined className="text-blue-400" />}
                      valueStyle={{ color: 'white' }}
                    />
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <Statistic
                      title={<span className="text-gray-300">Applications</span>}
                      value={statusData.applications}
                      prefix={<UserOutlined className="text-green-400" />}
                      valueStyle={{ color: 'white' }}
                    />
                  </div>

                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <Statistic
                      title={<span className="text-gray-300">Expiry Date</span>}
                      value={statusData.expiry_date}
                      prefix={<CalendarOutlined className="text-orange-400" />}
                      valueStyle={{ color: 'white' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingStatusForm;