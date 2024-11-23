import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Alert, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CommentOutlined, 
  SendOutlined,
  UserOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  NumberOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { TextArea } = Input;

const ReplyDaily = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultListing = searchParams.get('listing') || '';
  const defaultChatId = searchParams.get('chat_id') || '';

  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/reply_daily?listing=${values.listing}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            chat_id: values.chat_id,
            message: values.message
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send reply');
      }

      const data = await response.json();
      setSuccess(true);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Reply sent successfully! 🎉</span>,
        style: {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '400px',
        }
      });
      form.resetFields();
    } catch (error) {
      message.error({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to send reply: {error.message}</span>,
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

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto h-full flex flex-col" data-aos="fade-up">
        {/* Header - Reduced margin */}
        <div className="flex justify-between items-center h-[50px]">
          <h1 className="text-2xl font-bold text-white">Reply to Daily Update</h1>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard/daily-updates')}
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[36px] px-4 rounded-md"
          >
            <span className="ml-1">Back</span>
          </Button>
        </div>

        {/* Main Content - Adjusted padding and spacing */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 p-4 mt-2">
          <Alert
            message="Reply System"
            description="Send a reply to a specific daily update. Make sure to verify the listing number and chat ID before sending."
            type="info"
            showIcon
            className="mb-4"
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              listing: defaultListing,
              chat_id: defaultChatId
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="listing"
                label={
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <NumberOutlined />
                    <span>Listing Number</span>
                  </span>
                }
                rules={[
                  { required: true, message: 'Please enter listing number' },
                  { type: 'number', message: 'Please enter a valid number' }
                ]}
                className="mb-2"
              >
                <InputNumber 
                  placeholder="Enter listing number"
                  className="w-full"
                  min={0}
                  style={{ height: '36px' }}
                />
              </Form.Item>

              <Form.Item
                name="chat_id"
                label={
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <UserOutlined />
                    <span>Chat ID</span>
                  </span>
                }
                rules={[
                  { required: true, message: 'Please enter chat ID' },
                  { type: 'number', message: 'Please enter a valid number' }
                ]}
                className="mb-2"
              >
                <InputNumber 
                  placeholder="Enter chat ID"
                  className="w-full"
                  min={0}
                  style={{ height: '36px' }}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="message"
              label={<span className="text-gray-300 font-medium">Message</span>}
              rules={[
                { required: true },
                { min: 1 },
                { max: 500 }
              ]}
            >
              <TextArea
                placeholder="Type your reply message here..."
                className="rounded-md hover:border-blue-500 focus:border-blue-500"
                maxLength={500}
                showCount
                rows={3}
                style={{
                  fontSize: '0.95rem',
                  backgroundColor: 'white',
                  resize: 'none',
                  height: 'auto',
                  minHeight: '72px',
                  padding: '8px 11px'
                }}
              />
            </Form.Item>

            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={loading ? <LoadingOutlined /> : <SendOutlined />}
              className="w-full bg-[#4B8BF4] hover:bg-blue-600 border-0 h-[36px]"
            >
              {loading ? 'Sending Reply...' : 'Send Reply'}
            </Button>

            {/* Info Sections - Reduced padding */}
            <div className="bg-gray-700/30 p-3 rounded-xl border border-gray-600 mt-3">
              <h3 className="text-white font-semibold mb-1 text-sm">Important Notes:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-0.5 text-sm">
                <li>Verify the listing number and chat ID before sending</li>
                <li>Keep replies professional and relevant</li>
                <li>Messages are limited to 1000 characters</li>
              </ul>
            </div>

            <div className="p-2 bg-gray-700/30 rounded-lg border border-gray-600">
              <div className="flex items-center text-sm text-gray-300">
                <InfoCircleOutlined className="text-blue-400 mr-2" />
                <span>Your reply will be sent immediately.</span>
              </div>
            </div>
          </Form>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center border border-gray-700">
            <LoadingOutlined className="text-4xl text-blue-500 mb-3" />
            <p className="text-gray-300">Sending Reply...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyDaily;