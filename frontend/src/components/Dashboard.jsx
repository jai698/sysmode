import { useState, useEffect } from 'react';
import JobPostingForm from './JobPostingForm';
import InternshipPostingForm from './InternshipPostingForm';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Card, Row, Col, Statistic } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
  NotificationOutlined,
  FileSearchOutlined,
  HomeOutlined,
  UserOutlined,
  FolderOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Header, Sider, Content } = Layout;

const DashboardOverview = () => {
  const navigate = useNavigate();
  
  return (
    <div data-aos="fade-up" data-aos-duration="300">
      <h1 className="text-3xl font-bold text-white mb-8">Welcome to Swissmote Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-blue-500/10 border border-blue-500/20">
            <Statistic 
              title={<span className="text-gray-300">Active Jobs</span>}
              value={42}
              prefix={<FolderOutlined />}
              valueStyle={{ color: '#3b82f6' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-green-500/10 border border-green-500/20">
            <Statistic
              title={<span className="text-gray-300">Active Listings</span>}
              value={28}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#22c55e' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-purple-500/10 border border-purple-500/20">
            <Statistic
              title={<span className="text-gray-300">Assignments</span>}
              value={15}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#a855f7' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-orange-500/10 border border-orange-500/20">
            <Statistic
              title={<span className="text-gray-300">Candidates</span>}
              value={156}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#f97316' }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/dashboard/post-job')}
              className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all duration-150"
            >
              <FolderOutlined className="text-2xl mb-2" />
              <div>Post New Job</div>
            </button>
            <button 
              onClick={() => navigate('/dashboard/send-message')}
              className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all duration-150"
            >
              <MessageOutlined className="text-2xl mb-2" />
              <div>Send Message</div>
            </button>
            <button 
              onClick={() => navigate('/dashboard/add-assignment')}
              className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all duration-150"
            >
              <FileTextOutlined className="text-2xl mb-2" />
              <div>Add Assignment</div>
            </button>
            <button 
              onClick={() => navigate('/dashboard/active-listings')}
              className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 transition-all duration-150"
            >
              <BarChartOutlined className="text-2xl mb-2" />
              <div>View Active Listings</div>
            </button>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-150">
              <FolderOutlined className="mr-3 text-blue-500" />
              <div>New job posting: Senior Developer</div>
            </div>
            <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-150">
              <MessageOutlined className="mr-3 text-green-500" />
              <div>Message sent to candidate</div>
            </div>
            <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-150">
              <FileTextOutlined className="mr-3 text-purple-500" />
              <div>New assignment created</div>
            </div>
            <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-150">
              <TeamOutlined className="mr-3 text-orange-500" />
              <div>Candidate status updated</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
      offset: 30,
      delay: 0,
      easing: 'ease-out'
    });
  }, []);

  const menuItems = [
    {
      key: 'job-management',
      icon: <FolderOutlined />,
      label: 'Job Management',
      children: [
        { key: '/dashboard/post-job', label: 'Post Full-time Job' },
        { key: '/dashboard/post-internship', label: 'Post Internship' },
        { key: '/dashboard/post-unpaid-internship', label: 'Post Unpaid Internship' },
      ]
    },
    {
      key: 'listings',
      icon: <AppstoreOutlined />,
      label: 'Listings',
      children: [
        { key: '/dashboard/auto-listings', label: 'Auto Listings' },
        { key: '/dashboard/automate-listing', label: 'Automate Listing' },
        { key: '/dashboard/active-listings', label: 'Active Listings' },
        { key: '/dashboard/closed-listings', label: 'Closed Listings' },
        { key: '/dashboard/listing-status', label: 'Listing Status' },
      ]
    },
    {
      key: 'assignments',
      icon: <FileTextOutlined />,
      label: 'Assignments & Announcements',
      children: [
        { key: '/dashboard/assignments', label: 'Get Assignments' },
        { key: '/dashboard/add-assignment', label: 'Add Assignment' },
        { key: '/dashboard/announcement', label: 'Make Announcement' },
      ]
    },
    {
      key: 'messaging',
      icon: <MessageOutlined />,
      label: 'Messaging',
      children: [
        { key: '/dashboard/get-messages', label: 'Get Messages' },
        { key: '/dashboard/send-message', label: 'Send Message' },
        { key: '/dashboard/get-chat', label: 'Get Chat' },
      ]
    },
    {
      key: 'candidate',
      icon: <TeamOutlined />,
      label: 'Candidate Management',
      children: [
        { key: '/dashboard/reply-candidate', label: 'Reply to Candidate' },
        { key: '/dashboard/reply-candidate-bot', label: 'Reply via Bot' },
        { key: '/dashboard/hire-candidate', label: 'Hire Candidate' },
        { key: '/dashboard/candidate-email', label: 'Get Candidate Email' },
      ]
    },
    {
      key: 'evaluation',
      icon: <BarChartOutlined />,
      label: 'Evaluation',
      children: [
        { key: '/dashboard/mark-eval', label: 'Mark Evaluation' },
        { key: '/dashboard/mark-eval-bot', label: 'Mark Bot Evaluation' },
        { key: '/dashboard/mark-eval-future', label: 'Mark Future Evaluation' },
      ]
    },
    {
      key: 'reviews',
      icon: <ScheduleOutlined />,
      label: 'Reviews & Updates',
      children: [
        { key: '/dashboard/add-review', label: 'Add Review' },
        { key: '/dashboard/daily-updates', label: 'Daily Updates' },
        { key: '/dashboard/reply-daily', label: 'Reply to Daily Update' },
      ]
    },
    {
      key: 'questions',
      icon: <QuestionCircleOutlined />,
      label: 'Questions',
      children: [
        { key: '/dashboard/get-questions', label: 'Get Questions' },
        { key: '/dashboard/reply-questions', label: 'Reply to Questions' },
      ]
    },
  ];

  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-gray-900 border-r border-gray-800"
        width={260}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="text-xl font-bold text-blue-500 whitespace-nowrap overflow-hidden">
            {!collapsed && 'Swissmote'}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition-colors duration-150"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
          className="bg-gray-900 border-r border-gray-800"
        />
      </Sider>
      <Layout>
        <Header className="bg-gray-900 border-b border-gray-800 px-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-white">
            <DashboardOutlined className="mr-2" />
            Dashboard
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white px-4 py-2 rounded-md 
                      flex items-center gap-2 hover:bg-gray-800 transition-colors duration-150"
          >
            <HomeOutlined />
            Home
          </button>
        </Header>
        <Content className="p-6 bg-gray-900">
          <div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 min-h-[calc(100vh-theme('spacing.32'))]"
          >
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/post-job" element={<JobPostingForm />} />
              <Route path="/post-internship" element={<InternshipPostingForm />} />
              {/* Add more routes as you create the components */}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;