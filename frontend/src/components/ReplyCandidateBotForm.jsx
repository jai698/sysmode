import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, message, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  RobotOutlined, 
  SendOutlined, 
  NumberOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { TextArea } = Input;

const ReplyCandidateBotForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/replyCandidateBot?listing=${values.listing}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            chat_id: Number(values.chat_id),
            message: values.message,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send bot reply');
      }

    //   const data = await response.json();
      message.success('Bot reply sent successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to send bot reply: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-3xl mx-auto" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Bot Reply</h1>
            <p className="text-gray-400">Send automated responses to candidates</p>
          </div>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-blue-500 text-white border-none hover:bg-blue-600"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <Alert
            message="Bot Reply System"
            description="This system uses automated responses. Please ensure all information is accurate before sending."
            type="info"
            showIcon
            className="mb-6"
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="listing"
                label={
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    <NumberOutlined />
                    <span>Listing Number</span>
                  </span>
                }
                rules={[
                  { required: true, message: 'Please enter listing number' },
                  { type: 'number', message: 'Please enter a valid number' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter listing number"
                  className="w-full h-12"
                  min={0}
                />
              </Form.Item>

              <Form.Item
                name="chat_id"
                label={
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    <RobotOutlined />
                    <span>Chat ID</span>
                  </span>
                }
                rules={[
                  { required: true, message: 'Please enter chat ID' },
                  { type: 'number', message: 'Please enter a valid number' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter chat ID"
                  className="w-full h-12"
                  min={0}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="message"
              label={
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <MessageOutlined />
                  <span>Bot Message</span>
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your message' },
                { min: 10, message: 'Message must be at least 10 characters' }
              ]}
            >
              <TextArea 
                rows={8}
                placeholder="Enter the bot reply message..."
                maxLength={1000}
                showCount
                className="resize-none"
                style={{ fontSize: '0.95rem' }}
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SendOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-12 text-lg font-medium w-full"
              >
                {loading ? 'Sending Bot Reply...' : 'Send Bot Reply'}
              </Button>
            </Form.Item>
          </Form>

          {/* Guidelines Section */}
          <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-indigo-800 font-semibold mb-3">Bot Reply Guidelines:</h3>
            <ul className="list-disc list-inside text-indigo-700 space-y-2">
              <li>Use clear and concise language</li>
              <li>Verify the listing number and chat ID</li>
              <li>Ensure the message is appropriate for automated responses</li>
              <li>Test the message format before sending</li>
              <li>Maximum message length is 1000 characters</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <InfoCircleOutlined className="text-indigo-500 mr-2" />
              <span>Bot replies are monitored and logged for quality assurance purposes.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCandidateBotForm;