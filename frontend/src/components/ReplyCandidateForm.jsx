import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  SendOutlined, 
  UserOutlined, 
  NumberOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { TextArea } = Input;

const ReplyCandidateForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/replyCandidate?listing_num=${values.listing_num}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            candidate_id: Number(values.candidate_id),
            message: values.message,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send reply');
      }

    //   const data = await response.json();
      message.success('Reply sent successfully!');
      form.resetFields();
    } catch (error) {
      message.error('Failed to send reply: ' + error.message);
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
            <h1 className="text-4xl font-bold text-white mb-2">Reply to Candidate</h1>
            <p className="text-gray-400">Send a response to a specific candidate</p>
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
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="listing_num"
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
                name="candidate_id"
                label={
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    <UserOutlined />
                    <span>Candidate ID</span>
                  </span>
                }
                rules={[
                  { required: true, message: 'Please enter candidate ID' },
                  { type: 'number', message: 'Please enter a valid number' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter candidate ID"
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
                  <span>Reply Message</span>
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your message' },
                { min: 10, message: 'Message must be at least 10 characters' }
              ]}
            >
              <TextArea 
                rows={8}
                placeholder="Enter your reply message here..."
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
                {loading ? 'Sending Reply...' : 'Send Reply'}
              </Button>
            </Form.Item>
          </Form>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-blue-800 font-semibold mb-3">Tips for Replying:</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
              <li>Be clear and professional in your communication</li>
              <li>Double-check the listing number and candidate ID</li>
              <li>Provide all necessary information in your message</li>
              <li>Review your message before sending</li>
              <li>Maximum message length is 1000 characters</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <InfoCircleOutlined className="text-blue-500 mr-2" />
              <span>All replies are logged and tracked for quality assurance.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyCandidateForm;