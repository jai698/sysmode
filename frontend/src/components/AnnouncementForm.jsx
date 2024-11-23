import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined,
  NotificationOutlined,
  NumberOutlined,
  MessageOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { TextArea } = Input;

const AnnouncementForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  message.config({
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
      const formattedValues = {
        listing: Number(values.listing),
        message: values.message,
      };

      const response = await fetch('https://api.trollgold.org/persistventures/assignment/announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        throw new Error('Failed to make announcement');
      }

      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Announcement initiated successfully! 🎉</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>
          Failed to make announcement: {error.message}
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
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = "bg-white border-gray-300 text-gray-900 rounded-md hover:border-blue-500 focus:border-blue-500";

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto h-full" data-aos="fade-up">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Make Announcement</h1>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-8 px-4 rounded-md"
          >
            Back
          </Button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-3"
          >
            <Form.Item
              name="listing"
              label={<span className="text-gray-300 font-medium">Listing Number</span>}
              rules={[{ required: true, message: 'Please enter listing number' }]}
              className="mb-2"
            >
              <InputNumber 
                min={0} 
                placeholder="Enter listing number"
                className={`${inputClassName} h-8 w-full`}
              />
            </Form.Item>

            <Form.Item
              name="message"
              label={<span className="text-gray-300 font-medium">Announcement Message</span>}
              rules={[
                { required: true, message: 'Please enter announcement message' },
                { min: 10, message: 'Message must be at least 10 characters' }
              ]}
              className="mb-2"
            >
              <TextArea 
                placeholder="Enter your announcement message here..."
                className={`${inputClassName}`}
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

            <Form.Item className="mb-3">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<NotificationOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
              >
                {loading ? 'Sending...' : 'Make Announcement'}
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-2 bg-gray-700/50 p-3 rounded-lg border border-gray-600">
            <h3 className="text-white font-semibold mb-1 text-sm">Important Notes:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-0.5 text-sm">
              <li>Verify the listing number before sending</li>
              <li>Keep messages clear and concise</li>
              <li>Maximum message length is 500 characters</li>
              <li>All participants will receive this announcement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementForm;