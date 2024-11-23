import { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Alert, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarOutlined, 
  NumberOutlined,
  UserOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MarkFutureEvaluation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Toast configuration
  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    setSuccess(false);
    try {
      const queryParams = new URLSearchParams({
        candidate_id: values.candidate_id,
        listing: values.listing
      }).toString();

      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/mark_future_internshala?${queryParams}`,
        {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to mark future evaluation');
      }

      setSuccess(true);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Future evaluation marked successfully! 📅</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to mark future evaluation: {error.message}</span>,
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
      <div className="max-w-3xl mx-auto h-full" data-aos="fade-up">
        {/* Header */}
        <div className="flex justify-between items-center h-[50px]">
          <div>
            <h1 className="text-2xl font-bold text-white">Mark Future Evaluation</h1>
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
          <Alert
            message="Future Evaluation System"
            description="This action will mark the candidate for future evaluation. Please verify all information before proceeding."
            type="info"
            showIcon
            className="mb-4"
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="candidate_id"
                label={
                  <span className="text-gray-300 font-medium flex items-center gap-2">
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
                  className="w-full"
                  min={0}
                  style={{ height: '36px' }}
                />
              </Form.Item>

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
              >
                <InputNumber 
                  placeholder="Enter listing number"
                  className="w-full"
                  min={0}
                  style={{ height: '36px' }}
                />
              </Form.Item>
            </div>

            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={loading ? <LoadingOutlined /> : <CalendarOutlined />}
              className="w-full bg-[#4B8BF4] hover:bg-blue-600 border-0 h-[36px]"
              disabled={loading}
            >
              {loading ? 'Marking for Future...' : 'Mark for Future Evaluation'}
            </Button>

            {/* Info Sections */}
            <div className="mt-3 bg-gray-700/30 p-3 rounded-xl border border-gray-600">
              <h3 className="text-white font-semibold mb-2 text-sm">Important Notes:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Verify candidate ID and listing number before submission</li>
                <li>This marks the candidate for future evaluation</li>
                <li>The action cannot be reversed</li>
                <li>Future evaluations will be scheduled automatically</li>
              </ul>
            </div>

            <div className="p-2 bg-gray-700/30 rounded-lg border border-gray-600">
              <div className="flex items-center text-sm text-gray-300">
                <InfoCircleOutlined className="text-blue-400 mr-2" />
                <span>Future evaluation marks are tracked and scheduled automatically.</span>
              </div>
            </div>
          </Form>

          {success && (
            <Alert
              message="Future Evaluation Marked Successfully"
              type="success"
              showIcon
              className="mt-3"
            />
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center border border-gray-700">
            <LoadingOutlined className="text-4xl text-blue-500 mb-3" />
            <p className="text-gray-300">Processing Future Evaluation...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkFutureEvaluation;