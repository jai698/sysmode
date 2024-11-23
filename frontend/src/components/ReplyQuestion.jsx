import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Alert, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  QuestionCircleOutlined,
  SendOutlined,
  UserOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { TextArea } = Input;

const ReplyQuestion = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const defaultListing = searchParams.get('listing') || '';
  const defaultChatId = searchParams.get('chat_id') || '';

  const onFinish = async (values) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/reply_question?listing=${values.listing}`,
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
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 overflow-hidden">
      <div className="max-w-3xl mx-auto h-full flex flex-col" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center h-[60px]">
          <h1 className="text-3xl font-bold text-white">Reply to Question</h1>
          <Button 
            icon={<ArrowLeftOutlined className="text-lg" />}
            onClick={() => navigate('/dashboard/questions')}
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[40px] px-6 rounded-md"
          >
            <span className="ml-1">Back</span>
          </Button>
        </div>

        {/* Form Container */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            listing: defaultListing,
            chat_id: defaultChatId
          }}
          className="flex flex-col flex-1"
        >
          {/* Main Content Box */}
          <div className="flex-1 bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-6 mt-4">
            <Alert
              message="Question Reply System"
              description="Send a reply to a specific question. Make sure to verify the listing number and chat ID before sending."
              type="info"
              showIcon
              className="mb-4"
            />

            {/* Input Fields Container */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Form.Item
                name="listing"
                label={<span className="text-gray-300 font-medium">Listing Number</span>}
                rules={[
                  { required: true, message: 'Please enter listing number' },
                  { type: 'number', message: 'Please enter a valid number' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter listing number"
                  className="w-full"
                  min={0}
                  style={{ 
                    height: '40px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                  }}
                />
              </Form.Item>

              <Form.Item
                name="chat_id"
                label={<span className="text-gray-300 font-medium">Chat ID</span>}
                rules={[
                  { required: true, message: 'Please enter chat ID' },
                  { type: 'number', message: 'Please enter a valid number' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter chat ID"
                  className="w-full"
                  min={0}
                  style={{ 
                    height: '40px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                  }}
                />
              </Form.Item>
            </div>

            {/* Message Area */}
            <Form.Item
              name="message"
              label={<span className="text-gray-300 font-medium">Reply Message</span>}
              rules={[
                { required: true, message: 'Please enter your reply' },
                { min: 1, message: 'Reply must not be empty' },
                { max: 1000, message: 'Reply must not exceed 1000 characters' }
              ]}
            >
              <TextArea
                placeholder="Enter your reply to the question"
                style={{
                  backgroundColor: 'white',
                  border: 'none',
                  resize: 'none',
                  minHeight: '120px'
                }}
                showCount
                maxLength={1000}
              />
            </Form.Item>

            {/* Info Sections */}
            <div className="space-y-4">
              <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-600">
                <h3 className="text-white font-semibold mb-2 text-sm">Important Notes:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>Verify the listing number and chat ID before sending</li>
                  <li>Messages are limited to 1000 characters</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Send Reply Button - Outside the white container */}
          <Form.Item className="mt-4">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={loading ? <LoadingOutlined className="text-lg" /> : <SendOutlined className="text-lg" />}
              className="flex items-center justify-center gap-2 bg-[#4B8BF4] hover:bg-blue-600 border-0 h-[40px] text-white text-base font-medium w-full rounded-md"
              disabled={loading}
            >
              <span className="inline-block">
                {loading ? 'Sending Reply...' : 'Send Reply'}
              </span>
            </Button>
          </Form.Item>
        </Form>
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

export default ReplyQuestion;