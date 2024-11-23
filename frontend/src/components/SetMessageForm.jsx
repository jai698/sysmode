import { useState, useEffect } from 'react';
import { Form, Select, Input, Button, message as antMessage } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  EditOutlined, 
  SaveOutlined, 
  ArrowLeftOutlined,
  MessageOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;
const { TextArea } = Input;

const MESSAGE_TYPES = {
  INVITE: 'invite_message',
  ASSIGNMENT: 'assignment_message',
  HIRED: 'hired_message'
};

const SetMessageForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  antMessage.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        message: values.messageType
      }).toString();

      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/setMessage?${queryParams}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            message: values.messageContent
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to set message');
      }

      antMessage.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Message template updated successfully! 🎉</span>,
        style: {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '400px',
        }
      });
      form.resetFields(['messageContent']);
    } catch (error) {
      antMessage.error({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to set message: {error.message}</span>,
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

  const getMessageTypeDetails = (type) => {
    switch (type) {
      case MESSAGE_TYPES.INVITE:
        return {
          label: 'Invite Message',
          color: 'blue',
          icon: '📨',
          placeholder: 'Enter invitation message template...'
        };
      case MESSAGE_TYPES.ASSIGNMENT:
        return {
          label: 'Assignment Message',
          color: 'orange',
          icon: '📝',
          placeholder: 'Enter assignment message template...'
        };
      case MESSAGE_TYPES.HIRED:
        return {
          label: 'Hired Message',
          color: 'green',
          icon: '🎉',
          placeholder: 'Enter hired message template...'
        };
      default:
        return {
          label: 'Unknown',
          color: 'gray',
          icon: '❓',
          placeholder: 'Enter message template...'
        };
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto h-full" data-aos="fade-up">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Set Message Template</h1>
            <p className="text-gray-400 text-sm mt-1">Create and update message templates</p>
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
              messageType: MESSAGE_TYPES.ASSIGNMENT
            }}
            className="space-y-5"
          >
            <Form.Item
              name="messageType"
              label={<span className="text-gray-300 font-medium">Select Message Type</span>}
              rules={[{ required: true }]}
            >
              <Select 
                className="h-8"
                onChange={() => form.resetFields(['messageContent'])}
              >
                {Object.values(MESSAGE_TYPES).map(type => {
                  const details = getMessageTypeDetails(type);
                  return (
                    <Option key={type} value={type}>
                      <div className="flex items-center space-x-3">
                        <span>{details.icon}</span>
                        <span>{details.label}</span>
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              name="messageContent"
              label={<span className="text-gray-300 font-medium">Message Content</span>}
              rules={[
                { required: true, message: 'Please enter the message content' },
                { min: 10, message: 'Message must be at least 10 characters long' }
              ]}
              className="mb-4"
            >
              <TextArea 
                placeholder={getMessageTypeDetails(form.getFieldValue('messageType')).placeholder}
                className="bg-white border-gray-300 text-gray-900 rounded-md hover:border-blue-500 focus:border-blue-500"
                maxLength={1000}
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

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SaveOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
              >
                {loading ? 'Saving...' : 'Save Template'}
              </Button>
            </Form.Item>
          </Form>

          {/* Info Section */}
          <div className="mt-6 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <h3 className="text-white font-semibold mb-2">Template Guidelines:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>Use clear and professional language</li>
              <li>Include all necessary information</li>
              <li>Review the message before saving</li>
              <li>You can use basic formatting in your message</li>
              <li>Maximum length is 1000 characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetMessageForm;