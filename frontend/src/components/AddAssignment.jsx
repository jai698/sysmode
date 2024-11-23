import { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Card, Alert, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  FileAddOutlined, 
  NumberOutlined,
  LinkOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddAssignment = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);
    try {
      const links = Array.isArray(values.links) ? values.links : [values.links];
      
      const response = await fetch(
        'https://api.trollgold.org/persistventures/assignment/add_assignment',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            listing: values.listing,
            link: links.filter(link => link && link.trim())
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add assignment');
      }

      const data = await response.json();
      setSuccess(true);
      
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Assignment added successfully! 🎉</span>,
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
          Failed to add assignment: {error.message}
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
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = "bg-white border-gray-300 text-gray-900 h-8 rounded-md hover:border-blue-500 focus:border-blue-500";

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-3xl mx-auto h-full" data-aos="fade-up">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Add Assignment</h1>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-8 px-4 rounded-md"
          >
            Back
          </Button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-4">
          <Alert
            message="Assignment Upload System"
            description="Add assignment links for a specific listing. You can add multiple links if needed."
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
            <Form.Item
              name="listing"
              label={<span className="text-gray-300 font-medium">Listing Number</span>}
              rules={[
                { required: true, message: 'Please enter listing number' },
                { type: 'number', message: 'Please enter a valid number' }
              ]}
            >
              <InputNumber 
                placeholder="Enter listing number"
                className={`${inputClassName} w-full`}
                min={0}
              />
            </Form.Item>

            <Form.List
              name="links"
              initialValue={['']}
            >
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  <div className="text-gray-300 font-medium">Assignment Links</div>
                  
                  {fields.map((field, index) => (
                    <div key={field.key} className="flex items-center gap-2">
                      <Form.Item
                        {...field}
                        className="flex-1 mb-0"
                        rules={[
                          { required: true, message: 'Please enter assignment link' },
                          { type: 'url', message: 'Please enter a valid URL' }
                        ]}
                      >
                        <Input
                          placeholder="https://example.com/assignment"
                          className={inputClassName}
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(field.name)}
                          className="flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-8 w-8 border-none"
                        />
                      )}
                    </div>
                  ))}
                  
                  <Button
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full h-8 border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2 text-gray-400"
                  >
                    Add Another Link
                  </Button>
                </div>
              )}
            </Form.List>

            <Form.Item className="mb-0">
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={loading ? <LoadingOutlined /> : <FileAddOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
                disabled={loading}
              >
                {loading ? 'Adding Assignment...' : 'Add Assignment'}
              </Button>
            </Form.Item>
          </Form>

          {success && (
            <div className="mt-4" data-aos="fade-up">
              <Alert
                message="Assignment Added Successfully"
                description="The assignment links have been added to the system."
                type="success"
                showIcon
              />
            </div>
          )}

          <div className="mt-6 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <h3 className="text-white font-semibold mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>Verify the listing number before submission</li>
              <li>Ensure all links are valid and accessible</li>
              <li>You can add multiple assignment links</li>
              <li>Links should be complete URLs starting with http:// or https://</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignment;