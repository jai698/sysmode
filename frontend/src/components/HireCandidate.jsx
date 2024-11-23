import { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Alert, message, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  UserAddOutlined,
  TeamOutlined,
  DeleteOutlined,
  PlusOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HireCandidate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultListing = searchParams.get('listing') || '';
  const defaultCandidateId = searchParams.get('candidate_id') || '';

  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    setSuccess(false);
    try {
      // Ensure candidate_ids is an array
      const candidateIds = Array.isArray(values.candidate_ids) 
        ? values.candidate_ids 
        : [values.candidate_ids];

      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/hire_candidate?listing=${values.listing}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            candidate_id: candidateIds.filter(id => id !== undefined && id !== null)
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to hire candidates');
      }

      setSuccess(true);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Candidates hired successfully! 👥</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to hire candidates: {error.message}</span>,
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
            <h1 className="text-2xl font-bold text-white">Hire Candidates</h1>
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
        <div className="bg-white rounded-lg shadow-xl p-6">
          <Alert
            message="Hiring System"
            description="Select candidates to hire for a specific listing. This action is permanent and will update the candidates' status."
            type="info"
            showIcon
            className="mb-6"
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              listing: defaultListing,
              candidate_ids: defaultCandidateId ? [defaultCandidateId] : []
            }}
            className="space-y-6"
          >
            <Form.Item
              name="listing"
              label={
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <TeamOutlined />
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

            <Form.List
              name="candidate_ids"
              rules={[
                {
                  validator: async (_, candidates) => {
                    if (!candidates || candidates.length < 1) {
                      return Promise.reject(new Error('At least one candidate must be selected'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <div className="space-y-4">
                  <div className="text-gray-700 font-medium flex items-center gap-2">
                    <UserAddOutlined />
                    <span>Candidate IDs</span>
                  </div>
                  
                  {fields.map((field, index) => (
                    <Form.Item
                      required={false}
                      key={field.key}
                      className="mb-0"
                    >
                      <Space className="flex items-center gap-3">
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input candidate's ID or delete this field.",
                            },
                          ]}
                          className="mb-0 flex-1"
                        >
                          <InputNumber
                            placeholder="Enter candidate ID"
                            className="w-full h-12"
                            min={0}
                          />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(field.name)}
                            className="flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-12 w-12 border-none"
                          />
                        )}
                      </Space>
                    </Form.Item>
                  ))}
                  
                  <Button
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full h-12 border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2 text-gray-600"
                  >
                    Add Another Candidate
                  </Button>
                  <Form.ErrorList errors={errors} />
                </div>
              )}
            </Form.List>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={loading ? <LoadingOutlined /> : <UserAddOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-12 text-lg font-medium w-full"
                disabled={loading}
              >
                {loading ? 'Hiring Candidates...' : 'Hire Selected Candidates'}
              </Button>
            </Form.Item>
          </Form>

          {success && (
            <div className="mt-6" data-aos="fade-up">
              <Alert
                message="Candidates Hired Successfully"
                description="The selected candidates have been hired and their status has been updated."
                type="success"
                showIcon
              />
            </div>
          )}

          {/* Info Sections */}
          <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-green-800 font-semibold mb-3">Important Notes:</h3>
            <ul className="list-disc list-inside text-green-700 space-y-2">
              <li>Verify all candidate IDs before submission</li>
              <li>This action cannot be undone</li>
              <li>All selected candidates will be marked as hired</li>
              <li>Notifications will be sent to hired candidates</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <InfoCircleOutlined className="text-green-500 mr-2" />
              <span>Make sure to review all candidate information before hiring.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireCandidate;