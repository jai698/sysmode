import { useState, useEffect } from 'react';
import { Table, Button, message, Tag, Tooltip, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  LinkOutlined, 
  ReloadOutlined,
  ProjectOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ClosedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
    fetchListings();
  }, []);

  // Toast configuration
  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.trollgold.org/persistventures/assignment/closedListings', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch closed listings');
      }

      const data = await response.json();
      setListings(data);
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Closed listings fetched successfully! 📊</span>,
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

  const getConversionRateStatus = (rate) => {
    const percentage = parseFloat(rate);
    if (percentage >= 60) return { color: 'green', text: 'High' };
    if (percentage >= 40) return { color: 'orange', text: 'Medium' };
    return { color: 'red', text: 'Low' };
  };

  const columns = [
    {
      title: 'Project Details',
      dataIndex: 'Project Name',
      key: 'project',
      fixed: 'left',
      render: (text, record) => (
        <div className="space-y-1">
          <div className="font-semibold flex items-center space-x-2">
            <ProjectOutlined className="text-gray-500" />
            <span>{text}</span>
            <Badge status="default" text="Closed" />
          </div>
          <div className="text-sm text-gray-500">
            <TeamOutlined className="mr-1" />
            {record.Organisation}
          </div>
          <div className="text-sm text-gray-500">
            <CalendarOutlined className="mr-1" />
            {record.Date}
          </div>
        </div>
      ),
      width: 250,
    },
    {
      title: 'Listing No',
      dataIndex: 'Listing No',
      key: 'listingNo',
      width: 120,
    },
    {
      title: 'Process',
      dataIndex: 'Process',
      key: 'process',
      width: 120,
      render: (text) => (
        <Tag color="default">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Designation',
      dataIndex: 'Designation',
      key: 'designation',
      width: 120,
      render: (text) => (
        <Tag color="default">{text}</Tag>
      ),
    },
    {
      title: 'Conversion Rate',
      dataIndex: 'Conversion Rate',
      key: 'conversionRate',
      width: 180,
      render: (text) => {
        const status = getConversionRateStatus(text);
        return (
          <div>
            <Tag color={status.color}>
              {status.text}
            </Tag>
            <span className="ml-2 text-gray-600">{text}</span>
          </div>
        );
      },
      sorter: (a, b) => parseFloat(a['Conversion Rate']) - parseFloat(b['Conversion Rate']),
    },
    {
      title: 'Links',
      key: 'links',
      fixed: 'right',
      width: 300,
      render: (_, record) => (
        <div className="space-y-2">
          {[
            { label: 'Internshala', link: record.Internshala },
            { label: 'Leader', link: record['Leader link'] },
            { label: 'Candidate', link: record['Candidate link'] },
            { label: 'Assignment', link: record['Assignment link'] },
          ].map(({ label, link }) => (
            <Tooltip title={`View ${label} Link`} key={label}>
              <Button
                size="small"
                type="link"
                icon={<LinkOutlined />}
                onClick={() => window.open(link, '_blank')}
                className="text-gray-500 hover:text-gray-700"
              >
                {label}
              </Button>
            </Tooltip>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Closed Listings</h1>
            <p className="text-gray-400">View all completed and closed listings</p>
          </div>
          <div className="flex gap-3">
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchListings}
              loading={loading}
              className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-10 px-5 rounded-md"
            >
              Refresh
            </Button>
            <Button 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/dashboard')} 
              className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-10 px-5 rounded-md"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          <Table
            columns={columns}
            dataSource={listings}
            loading={loading}
            rowKey={(record) => record['Listing No']}
            scroll={{ x: 1300 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} closed listings`,
            }}
          />

          {/* Statistics Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-gray-700 mb-2">{listings.length}</div>
              <div className="text-gray-600">Total Closed Listings</div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {listings.filter(l => parseFloat(l['Conversion Rate']) >= 60).length}
              </div>
              <div className="text-gray-600">High Conversion Rate</div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {listings.filter(l => parseFloat(l['Conversion Rate']) < 40).length}
              </div>
              <div className="text-gray-600">Low Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedListings;