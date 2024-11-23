import { useState, useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, message, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  DollarOutlined, 
  TeamOutlined, 
  BankOutlined, 
  ClockCircleOutlined,
  UserOutlined,
  ToolOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;

const JobPostingForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        skills: Array.isArray(values.skills) ? values.skills : [values.skills],
        min_experience: Number(values.min_experience),
        num_position: Number(values.num_position),
        min_salary: Number(values.min_salary),
        max_salary: Number(values.max_salary),
        post_on_linkedin: false,
        account: "sa"
      };

      const response = await fetch('/api/postJob?dev=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOaXRlc2giLCJleHAiOjE3MzIzNTE3NzF9.lNWsDxvOoFh80hBKa4A-1PcejPiW0958sZo8MmbOz1k'
        },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        throw new Error('Failed to post job');
      }
      
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Job posted successfully! 🎉</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to post job: {error.message}</span>,
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

  const inputClassName = "bg-white border-gray-300 text-gray-900 h-12 rounded-md hover:border-blue-500 focus:border-blue-500";
  const labelClassName = "text-gray-300 font-medium";

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto h-full" data-aos="fade-up">
        {/* Simplified Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Post New Job</h1>
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
            initialValues={{
              job_type: 'virtual',
              job_part_full: 'full',
              account: 'sa',
              skills: [],
              post_on_linkedin: false
            }}
            className="grid grid-cols-2 gap-x-4 gap-y-2"
          >
            <Form.Item
              name="job_title"
              label={<span className={labelClassName}>Job Title</span>}
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g., Senior Software Engineer" className={`${inputClassName} h-8`} />
            </Form.Item>

            <Form.Item
              name="account"
              label={<span className={labelClassName}>Organization</span>}
              rules={[{ required: true }]}
            >
              <Select className="custom-select h-8">
                <Option value="Org 1">Organization One</Option>
                <Option value="Org 2">Organization Two</Option>
                <Option value="Org 3">Organization Three</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="job_type"
              label={<span className={labelClassName}>Work Type</span>}
              rules={[{ required: true }]}
            >
              <Select
                className="custom-select"
                suffixIcon={<ClockCircleOutlined className="text-gray-400" />}
              >
                <Option value="virtual">Virtual</Option>
                <Option value="onsite">Onsite</Option>
                <Option value="hybrid">Hybrid</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="job_part_full"
              label={<span className={labelClassName}>Employment Type</span>}
              rules={[{ required: true }]}
            >
              <Select className="custom-select">
                <Option value="full">Full Time</Option>
                <Option value="part">Part Time</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="num_position"
              label={<span className={labelClassName}>Number of Positions</span>}
              rules={[{ required: true }]}
            >
              <InputNumber 
                min={1} 
                placeholder="e.g., 2" 
                className={`${inputClassName} w-full`}
              />
            </Form.Item>

            <Form.Item
              name="min_experience"
              label={<span className={labelClassName}>Minimum Experience (years)</span>}
              rules={[{ required: true }]}
            >
              <InputNumber 
                min={0} 
                placeholder="e.g., 3" 
                className={`${inputClassName} w-full`}
              />
            </Form.Item>

            <Form.Item
              name="skills"
              label={<span className={labelClassName}>Required Skills</span>}
              rules={[{ required: true }]}
            >
              <Select
                mode="tags"
                placeholder="Type skills and press enter"
                className="custom-select"
              />
            </Form.Item>

            <Form.Item
              name="min_salary"
              label={<span className={labelClassName}>Minimum Salary</span>}
              rules={[
                { required: true },
                { type: 'number', min: 1000, message: 'Minimum salary should be at least 1,000' }
              ]}
            >
              <InputNumber 
                min={1000}
                formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/₹\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="max_salary"
              label={<span className={labelClassName}>Maximum Salary</span>}
              rules={[
                { required: true },
                { type: 'number', min: 1000, message: 'Maximum salary should be at least 1,000' }
              ]}
            >
              <InputNumber 
                min={1000}
                formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/₹\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item className="col-span-2">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;