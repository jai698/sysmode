import { useState, useEffect } from 'react';
import { Form, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined,
  FilterOutlined,
  BankOutlined,
  RobotOutlined,
  TeamOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;

const GetListingsForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState({ automated: [], not_automated: [] });
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
      const { emp_type, account } = values;
      const response = await fetch(`https://api.trollgold.org/persistventures/assignment/get_listings?emp_type=${emp_type}&account=${encodeURIComponent(account)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();
      setListings(data);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Listings fetched successfully! 📋</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to fetch listings: {error.message}</span>,
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

  const labelClassName = "text-gray-300 font-medium";

  // Add these styles to your CSS file or style block
  const selectStyles = {
    height: '36px',
    backgroundColor: 'rgb(17 24 39)',
    borderColor: 'rgb(75 85 99)',
    color: 'white'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Get Listings</h1>
            <p className="text-gray-400">View all automated and non-automated listings</p>
          </div>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-10 px-5 rounded-md"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Main Form Section */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-lg">
          <div className="p-8">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                emp_type: 'internship',
                account: 'Org 1',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="emp_type"
                  label={<span className={labelClassName}>Employment Type</span>}
                  rules={[{ required: true }]}
                >
                  <Select 
                    className="!w-full"
                    suffixIcon={<ClockCircleOutlined className="text-gray-400" />}
                    style={selectStyles}
                  >
                    <Option value="internship">Internship</Option>
                    <Option value="fulltime">Full-time</Option>
                    <Option value="parttime">Part-time</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="account"
                  label={<span className={labelClassName}>Account</span>}
                  rules={[{ required: true }]}
                >
                  <Select 
                    className="!w-full"
                    suffixIcon={<BankOutlined className="text-gray-400" />}
                    style={selectStyles}
                  >
                    <Option value="Org 1">Organization One</Option>
                    <Option value="Org 2">Organization Two</Option>
                    <Option value="Org 3">Organization Three</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item className="mt-6">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading} 
                  icon={<FilterOutlined />}
                  className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-10 px-5 rounded-md"
                >
                  {loading ? 'Fetching...' : 'Fetch Listings'}
                </Button>
              </Form.Item>
            </Form>

            {/* Results Section */}
            {(listings.automated.length > 0 || listings.not_automated.length > 0) && (
              <div className="mt-12 space-y-8">
                {/* Automated Listings */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <RobotOutlined className="mr-2" />
                    Automated Listings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {listings.automated.map((listing, index) => (
                      <div 
                        key={index}
                        className="bg-gray-700/50 rounded-lg p-6 border border-gray-600"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">{listing.listing_name}</h3>
                        <div className="space-y-2 text-gray-300">
                          <p><span className="text-gray-400">Listing Number:</span> {listing.listing_number}</p>
                          <p><span className="text-gray-400">Project:</span> {listing.projectname}</p>
                          <p><span className="text-gray-400">Date:</span> {listing.date}</p>
                          <div className="mt-4">
                            <p className="text-gray-400 mb-1">Assignment Links:</p>
                            <div className="space-y-1">
                              {listing.assignment_link.map((link, i) => (
                                <a 
                                  key={i}
                                  href={link}
                                  className="block text-blue-400 hover:text-blue-300 truncate"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {link}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not Automated Listings */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <TeamOutlined className="mr-2" />
                    Not Automated Listings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {listings.not_automated.map((listing, index) => (
                      <div 
                        key={index}
                        className="bg-gray-700/50 rounded-lg p-6 border border-gray-600"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4">{listing.listing_name}</h3>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Listing Number:</span> {listing.listing_number}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetListingsForm;