import { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Table, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined,
  SearchOutlined,
  FileSearchOutlined,
  NumberOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GetAssignmentsForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  // Toast configuration
  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.trollgold.org/persistventures/assignment/getAssignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          listing: Number(values.listing),
          row_data: Number(values.row_data),
          offset_data: Number(values.offset_data),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }

      const data = await response.json();
      setAssignments(data);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Assignments fetched successfully! 📋</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to fetch assignments: {error.message}</span>,
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

  // Convert assignments object to array for table
  const assignmentsArray = Object.entries(assignments).map(([id, data]) => ({
    key: id,
    id,
    ...data,
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Shortlisted' ? 'green' : 'blue'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Received On',
      dataIndex: 'recieved_on',
      key: 'recieved_on',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Experience',
      dataIndex: 'job_expreince',
      key: 'job_expreince',
    },
    {
      title: 'Relocation',
      dataIndex: 'relocation',
      key: 'relocation',
      render: (relocation) => (
        <Tag color={relocation ? 'green' : 'red'}>
          {relocation ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Assignment',
      dataIndex: 'assignment',
      key: 'assignment',
      render: (assignment) => (
        <div>
          {Array.isArray(assignment) && assignment.map((item, index) => (
            <div key={index}>
              {Array.isArray(item) ? (
                <a href={item[2]} target="_blank" rel="noopener noreferrer">
                  {item[1]}
                </a>
              ) : (
                <span>{item}</span>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Evaluated',
      dataIndex: 'evaluated',
      key: 'evaluated',
      render: (evaluated) => (
        <Tag color={evaluated ? 'green' : 'orange'}>
          {evaluated ? 'Yes' : 'Pending'}
        </Tag>
      ),
    },
    {
      title: 'Future Consideration',
      dataIndex: 'future_consideration',
      key: 'future_consideration',
      render: (future) => (
        <Tag color={future ? 'blue' : 'default'}>
          {future ? 'Yes' : 'No'}
        </Tag>
      ),
    },
  ];

  const inputClassName = "bg-white border-gray-300 text-gray-900 h-12 rounded-md hover:border-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Get Assignments</h1>
            <p className="text-gray-400">View and manage assignment submissions</p>
          </div>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-10 px-5 rounded-md"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            className="flex flex-wrap gap-4 mb-6"
          >
            <Form.Item
              name="listing"
              label={<span className="text-gray-700">Listing Number</span>}
              rules={[{ required: true }]}
            >
              <InputNumber 
                min={0} 
                placeholder="Enter number"
                className={`${inputClassName} w-40`}
                prefix={<NumberOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item
              name="row_data"
              label={<span className="text-gray-700">Row Data</span>}
              rules={[{ required: true }]}
            >
              <InputNumber 
                min={0} 
                placeholder="Enter rows"
                className={`${inputClassName} w-40`}
              />
            </Form.Item>

            <Form.Item
              name="offset_data"
              label={<span className="text-gray-700">Offset Data</span>}
              rules={[{ required: true }]}
            >
              <InputNumber 
                min={0} 
                placeholder="Enter offset"
                className={`${inputClassName} w-40`}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={<FileSearchOutlined />}
                className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-10 px-5 rounded-md"
              >
                Fetch Assignments
              </Button>
            </Form.Item>
          </Form>

          {assignmentsArray.length > 0 && (
            <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
              <Table 
                columns={columns} 
                dataSource={assignmentsArray}
                scroll={{ x: true }}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} assignments`,
                }}
                className="shadow-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetAssignmentsForm;