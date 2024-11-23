import { useState, useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined,
  UserOutlined,
  BankOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  ToolOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;

const InternshipPostingForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        job_title: values.job_title.trim(),
        skills: Array.isArray(values.skills) ? values.skills : [values.skills],
        job_type: values.job_type,
        job_part_full: values.job_part_full,
        num_position: Number(values.num_position),
        duration: Number(values.duration),
        salary: Number(values.salary),
        account: "sa",
        post_on_linkedin: false
      };

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOaXRlc2giLCJleHAiOjE3MzIzNjk5ODZ9.zztWR5PBVY3LHejYaGdBUjgY1q0uHQXGkegYJQIrCa0";

      const response = await fetch('https://api.trollgold.org/postInternship?dev=true', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJOaXRlc2giLCJleHAiOjE3MzIzNjk5ODZ9.zztWR5PBVY3LHejYaGdBUjgY1q0uHQXGkegYJQIrCa0`,
          'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(formattedValues)
      });
      

      if (response.type === 'opaque') {
        message.success({
          content: <span style={{ color: '#000000', fontWeight: '600' }}>Internship posted successfully! 🎉</span>,
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
      } else {
        throw new Error('Failed to post internship');
      }

    } catch (error) {
      console.error('Error details:', error);
      message.error({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>
          Failed to post internship: Please try again later
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

  const inputClassName = "bg-white border-gray-300 text-gray-900 h-12 rounded-md hover:border-blue-500 focus:border-blue-500";
  const labelClassName = "text-gray-300 font-medium";

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto h-full" data-aos="fade-up">
        {/* Simplified Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-white">Post New Internship</h1>
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
              job_part_full: 'part',
              account: 'Org 1',
              skills: [],
            }}
            className="grid grid-cols-2 gap-x-4 gap-y-2"
          >
            {/* Row 1 */}
            <Form.Item
              name="job_title"
              label={<span className={labelClassName}>Internship Title</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <Input placeholder="e.g., Software Development Intern" className={`${inputClassName} h-8`} />
            </Form.Item>

            <Form.Item
              name="account"
              label={<span className={labelClassName}>Organization</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <Select className="custom-select h-8">
                <Option value="Org 1">Organization One</Option>
                <Option value="Org 2">Organization Two</Option>
                <Option value="Org 3">Organization Three</Option>
              </Select>
            </Form.Item>

            {/* Row 2 */}
            <Form.Item
              name="job_type"
              label={<span className={labelClassName}>Work Type</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <Select className="custom-select h-8">
                <Option value="virtual">Virtual</Option>
                <Option value="onsite">Onsite</Option>
                <Option value="hybrid">Hybrid</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="job_part_full"
              label={<span className={labelClassName}>Time Commitment</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <Select className="custom-select h-8">
                <Option value="part">Part Time</Option>
                <Option value="full">Full Time</Option>
              </Select>
            </Form.Item>

            {/* Row 3 */}
            <Form.Item
              name="num_position"
              label={<span className={labelClassName}>Number of Positions</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <InputNumber min={1} placeholder="e.g., 2" className={`${inputClassName} h-8 w-full`} />
            </Form.Item>

            <Form.Item
              name="duration"
              label={<span className={labelClassName}>Duration (months)</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <InputNumber min={1} placeholder="e.g., 3" className={`${inputClassName} h-8 w-full`} />
            </Form.Item>

            {/* Row 4 */}
            <Form.Item
              name="skills"
              label={<span className={labelClassName}>Required Skills</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <Select mode="tags" placeholder="Type skills and press enter" className="custom-select" />
            </Form.Item>

            <Form.Item
              name="salary"
              label={<span className={labelClassName}>Monthly Stipend</span>}
              rules={[{ required: true }]}
              className="mb-1"
            >
              <InputNumber 
                min={0}
                placeholder="e.g., 15000"
                className={`${inputClassName} h-8 w-full`}
                formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/₹\s?|(,*)/g, '')}
                controls={false}
                style={{ 
                  width: '100%',
                  padding: '4px 11px'
                }}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="col-span-2 mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
              >
                {loading ? 'Posting...' : 'Post Internship'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InternshipPostingForm;