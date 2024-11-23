import { useState, useEffect } from 'react';
import { Form, Select, Button, Card, message as antMessage } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  MessageOutlined, 
  ArrowLeftOutlined,
  SendOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;

const GetMessageForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageData, setMessageData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  const messageTypes = [
    { value: 'invite_message', label: 'Invite Message', icon: '📨' },
    { value: 'assignment_message', label: 'Assignment Message', icon: '📝' },
    { value: 'hired_message', label: 'Hired Message', icon: '🎉' },
  ];

  antMessage.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/getMessage?message=${values.message}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch message');
      }

      const data = await response.json();
      setMessageData(data);
      
      antMessage.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Message template fetched successfully! 🎉</span>,
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
      antMessage.error({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>
          Failed to fetch message: {error.message}
        </span>,
        style: {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '400px',
        }
      });
      setMessageData(null);
    } finally {
      setLoading(false);
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'invite_message': return 'blue';
      case 'assignment_message': return 'orange';
      case 'hired_message': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto h-full" data-aos="fade-up">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Message Templates</h1>
            <p className="text-gray-400 text-sm mt-1">Get pre-defined message templates</p>
          </div>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-8 px-4 rounded-md"
          >
            Back
          </Button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              message: 'assignment_message'
            }}
            className="space-y-5"
          >
            <Form.Item
              name="message"
              label={<span className="text-gray-300 font-medium mb-2 block">Select Message Type</span>}
              rules={[{ required: true, message: 'Please select a message type' }]}
              className="mb-4"
            >
              <Select className="h-8">
                {messageTypes.map(type => (
                  <Option 
                    key={type.value} 
                    value={type.value}
                    label={type.label}
                  >
                    <div className="flex items-center space-x-3">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="mb-4">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SendOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
              >
                {loading ? 'Fetching...' : 'Get Template'}
              </Button>
            </Form.Item>
          </Form>

          {messageData && (
            <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-3 mb-3">
                  <MessageOutlined className="text-blue-400 text-lg" />
                  <h3 className="text-white font-medium">Message Template</h3>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {messageData.message}
                  </p>
                </div>

                {messageData.success && (
                  <div className="mt-3 flex items-center gap-2 text-green-400">
                    <CheckCircleOutlined />
                    <span>Template retrieved successfully</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetMessageForm;