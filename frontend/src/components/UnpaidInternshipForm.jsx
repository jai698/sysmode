import { useState, useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined,
  UserOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ToolOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;

const UnpaidInternshipForm = () => {
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
        ...values,
        skills: Array.isArray(values.skills) ? values.skills : [values.skills],
        num_position: Number(values.num_position),
        duration: Number(values.duration),
      };

      const response = await fetch('https://api.trollgold.org/persistventures/assignment/make_undpaid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to post unpaid internship');
      }
      
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Unpaid internship posted successfully! 🎉</span>,
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
          Failed to post unpaid internship: {error.message}
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Post Unpaid Internship</h1>
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
              skills: [],
            }}
            className="grid grid-cols-2 gap-x-4 gap-y-2"
          >
            <Form.Item
              name="job_title"
              label={<span className={labelClassName}>Internship Title</span>}
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g., Marketing Research Intern" className={`${inputClassName} h-8`} />
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
              label={<span className={labelClassName}>Time Commitment</span>}
              rules={[{ required: true }]}
            >
              <Select className="custom-select">
                <Option value="part">Part Time</Option>
                <Option value="full">Full Time</Option>
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
              name="duration"
              label={<span className={labelClassName}>Duration (months)</span>}
              rules={[{ required: true }]}
            >
              <InputNumber 
                min={1} 
                placeholder="e.g., 3" 
                className={`${inputClassName} w-full`}
              />
            </Form.Item>

            <Form.Item className="col-span-2">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
              >
                {loading ? 'Posting...' : 'Post Unpaid Internship'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UnpaidInternshipForm;