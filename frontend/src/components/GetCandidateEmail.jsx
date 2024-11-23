import { useState, useEffect } from 'react';
import { Form, InputNumber, Select, Button, Result, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  MailOutlined, 
  UserOutlined, 
  CopyOutlined,
  SearchOutlined,
  TeamOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;

const GetCandidateEmail = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const navigate = useNavigate();

  // Toast configuration
  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        candidate_id: values.candidate_id,
        org: values.org
      }).toString();

      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/candidateEmail?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch email');
      }

      const data = await response.json();
      setEmailData(data);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Email fetched successfully! 📧</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to fetch email: {error.message}</span>,
        style: {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '400px',
        }
      });
      setEmailData(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (emailData?.email) {
      navigator.clipboard.writeText(emailData.email)
        .then(() => {
          message.success({
            content: <span style={{ color: '#000000', fontWeight: '600' }}>Email copied to clipboard! 📋</span>,
            style: {
              position: 'fixed',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'auto',
              minWidth: '200px',
              maxWidth: '400px',
            }
          });
        })
        .catch(() => {
          message.error({
            content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to copy email</span>,
            style: {
              position: 'fixed',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'auto',
              minWidth: '200px',
              maxWidth: '400px',
            }
          });
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-3xl mx-auto" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Get Candidate Email</h1>
            <p className="text-gray-400">Retrieve candidate email information</p>
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

              <Form.Item
                name="org"
                label={
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    <TeamOutlined />
                    <span>Organization</span>
                  </span>
                }
                rules={[{ required: true, message: 'Please select an organization' }]}
              >
                <Select 
                  placeholder="Select organization"
                  className="h-12"
                  dropdownClassName="rounded-lg"
                >
                  <Option value="Org 1">Organization 1</Option>
                  <Option value="Org 2">Organization 2</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<SearchOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-12 text-lg font-medium w-full"
              >
                {loading ? 'Fetching Email...' : 'Fetch Email'}
              </Button>
            </Form.Item>
          </Form>

          {loading && (
            <div className="mt-8 text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Fetching email information...</p>
            </div>
          )}

          {emailData && !loading && (
            <div className="mt-8" data-aos="fade-up">
              <Result
                icon={<MailOutlined className="text-blue-500 text-5xl" />}
                title={<span className="text-2xl font-bold text-gray-800">Email Found</span>}
                subTitle={
                  <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <div className="text-sm text-gray-500">Candidate ID: {emailData.candidate_id}</div>
                        <div className="text-lg font-medium text-gray-700">{emailData.email}</div>
                      </div>
                      <Button
                        icon={<CopyOutlined />}
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 hover:text-blue-500 hover:border-blue-500"
                      >
                        Copy Email
                      </Button>
                    </div>
                  </div>
                }
              />
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-blue-800 font-semibold mb-3">Important Notes:</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
              <li>Ensure the candidate ID is correct</li>
              <li>Select the appropriate organization</li>
              <li>Email information is confidential</li>
              <li>Use the email responsibly and professionally</li>
              <li>Copy feature available for convenience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCandidateEmail;
