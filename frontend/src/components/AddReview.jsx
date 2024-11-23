import { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Alert, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  StarOutlined, 
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

message.config({
  top: 20,
  maxCount: 1,
  duration: 3,
});

const AddReview = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setSuccess(false);
    try {
      // Convert single link to array if needed
      const links = Array.isArray(values.links) ? values.links : [values.links];
      
      const response = await fetch(
        'https://api.trollgold.org/persistventures/assignment/add_review',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            listing: values.listing,
            link: links.filter(link => link && link.trim()) // Filter out empty links
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add review');
      }

      const data = await response.json();
      setSuccess(true);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Review added successfully! 🎉</span>,
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
      message.error('Failed to add review: ' + error.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 overflow-hidden">
      <div className="max-w-3xl mx-auto h-full flex flex-col" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center h-[60px]">
          <h1 className="text-3xl font-bold text-white">Add Review</h1>
          <Button 
            icon={<ArrowLeftOutlined className="text-lg" />}
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[40px] px-6 rounded-md"
          >
            <span className="ml-1">Back</span>
          </Button>
        </div>

        {/* Form Container */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="flex flex-col flex-1"
        >
          {/* Main Content Box */}
          <div className="flex-1 bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-6 mt-4 overflow-y-auto">
            <Alert
              message="Review System"
              description="Add review links for a specific listing. Multiple review links can be added if needed."
              type="info"
              showIcon
              className="mb-4"
            />

            {/* Listing Number Input */}
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
                className="w-full"
                min={0}
                style={{ 
                  height: '40px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                }}
              />
            </Form.Item>

            {/* Review Links */}
            <Form.List
              name="links"
              initialValue={['']}
            >
              {(fields, { add, remove }) => (
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.key} className="flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-md">
                        <Form.Item
                          {...field}
                          className="mb-0"
                          rules={[
                            { required: true, message: 'Please enter review link' },
                            { type: 'url', message: 'Please enter a valid URL' }
                          ]}
                          style={{ 
                            margin: 0,
                            width: '100%'
                          }}
                        >
                          <Input
                            placeholder="Enter review link"
                            prefix={<LinkOutlined className="text-gray-400" />}
                            style={{ 
                              height: '40px',
                              border: 'none',
                              borderRadius: '6px',
                              width: '100%',
                              backgroundColor: 'transparent'
                            }}
                          />
                        </Form.Item>
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(field.name)}
                          className="flex-shrink-0 flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-[40px] w-[40px] border-0 bg-white"
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className="w-full h-[40px] border-dashed border-gray-600 hover:border-blue-500 hover:text-blue-500 bg-transparent text-gray-300"
                  >
                    Add Another Review Link
                  </Button>
                </div>
              )}
            </Form.List>

            {/* Info Sections */}
            <div className="mt-6 bg-gray-700/30 p-4 rounded-xl border border-gray-600">
              <h3 className="text-white font-semibold mb-2 text-sm">Important Notes:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>Verify the listing number before submission</li>
                <li>Ensure all review links are valid and accessible</li>
                <li>Links should be complete URLs starting with http:// or https://</li>
              </ul>
            </div>
          </div>

          {/* Submit Button - Outside main container */}
          <Form.Item className="mt-4 mb-0">
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={loading ? <LoadingOutlined className="text-lg" /> : <StarOutlined className="text-lg" />}
              className="flex items-center justify-center gap-2 bg-[#4B8BF4] hover:bg-blue-600 border-0 h-[40px] text-white text-base font-medium w-full rounded-md"
              disabled={loading}
            >
              <span className="inline-block">
                {loading ? 'Adding Review...' : 'Add Review'}
              </span>
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center border border-gray-700">
            <LoadingOutlined className="text-4xl text-blue-500 mb-3" />
            <p className="text-gray-300">Adding Review...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReview;