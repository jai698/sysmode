import { useState, useRef } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Alert, 
  message, 
  Upload, 
  Space,
  Progress 
} from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  SendOutlined,
  UploadOutlined,
  DeleteOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  FileOutlined 
} from '@ant-design/icons';

const { TextArea } = Input;

const SendMessage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const uploadRef = useRef();

  const defaultChatId = searchParams.get('chat_id') || '';
  const defaultOrg = searchParams.get('org') || '';

  const beforeUpload = (file) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('File must be smaller than 10MB!');
      return false;
    }
    return false; // Return false to handle upload manually
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList.slice(-1)); // Only keep the last file
  };

  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const onFinish = async (values) => {
    setLoading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append('message', values.message);
      formData.append('org', values.org);
      
      if (fileList.length > 0) {
        formData.append('attached_file', fileList[0].originFileObj);
      }

      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/send_message?chat_id=${values.chat_id}`,
        {
          method: 'POST',
          body: formData,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send message');
      }

      const data = await response.json();
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Message sent successfully! 🎉</span>,
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
      setFileList([]);
      setUploadProgress(0);

      // Optionally navigate back to chat
      if (values.chat_id) {
        navigate(`/dashboard/chat?chat_id=${values.chat_id}`);
      }
    } catch (error) {
      message.error({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to send message: {error.message}</span>,
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
      <div className="max-w-3xl mx-auto h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Send Message</h1>
            <p className="text-gray-400 text-sm mt-1">Send messages with attachments</p>
          </div>
          <Button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-8 px-4 rounded-md"
          >
            Back
          </Button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              chat_id: defaultChatId,
              org: defaultOrg
            }}
            className="space-y-5"
          >
            <Form.Item
              name="chat_id"
              label={<span className="text-gray-300 font-medium">Chat ID</span>}
              rules={[
                { required: true, message: 'Please enter chat ID' },
                { type: 'number', message: 'Please enter a valid number' }
              ]}
            >
              <Input 
                placeholder="Enter chat ID"
                type="number"
                min={0}
                className="h-8 rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="org"
              label={<span className="text-gray-300 font-medium">Organization</span>}
              rules={[{ required: true }]}
            >
              <Input 
                placeholder="Enter organization name"
                className="h-8 rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="message"
              label={<span className="text-gray-300 font-medium">Message</span>}
              rules={[
                { required: true },
                { min: 1 },
                { max: 1000 }
              ]}
            >
              <TextArea
                placeholder="Type your message here"
                rows={4}
                showCount
                maxLength={1000}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-300 font-medium">Attachment</span>}
              extra={<span className="text-gray-400">Supports files up to 10MB</span>}
            >
              <Upload
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
                fileList={fileList}
                maxCount={1}
              >
                <Button 
                  icon={<UploadOutlined />}
                  className="bg-gray-700 text-white border-none hover:bg-gray-600"
                >
                  Select File
                </Button>
              </Upload>
            </Form.Item>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <Progress percent={uploadProgress} />
            )}

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                icon={loading ? <LoadingOutlined /> : <SendOutlined />}
                className="bg-blue-500 hover:bg-blue-600 border-none h-8 w-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <h3 className="text-white font-semibold mb-2">Important Notes:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>Verify the chat ID before sending</li>
              <li>Messages are limited to 1000 characters</li>
              <li>File attachments must be under 10MB</li>
              <li>Supported file types: documents, images, PDFs</li>
            </ul>
          </div>

          <div className="mt-4 bg-gray-700/30 p-3 rounded-lg border border-gray-600">
            <div className="flex items-center text-sm text-gray-300">
              <InfoCircleOutlined className="text-blue-400 mr-2" />
              <span>Your message will be sent immediately to the specified chat.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;