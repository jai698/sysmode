import { useState, useEffect } from 'react';
import { Table, Button, message, Pagination, Input, Spin } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  QuestionCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GetQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultLimit = 10;
  const listing = searchParams.get('listing') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('limit')) || defaultLimit;

  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const fetchQuestions = async () => {
    if (!listing) {
      message.error('Please provide a listing number');
      return;
    }

    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const queryParams = new URLSearchParams({
        listing: listing,
        offset: offset,
        limit: pageSize
      }).toString();

      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/getQuestions?${queryParams}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const result = await response.json();
      setQuestions(result.questions || []);
      setPagination(result.pagination || {});
      
      message.success({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Questions fetched successfully! 🎉</span>,
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
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Failed to fetch questions: {error.message}</span>,
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

  useEffect(() => {
    if (listing) {
      fetchQuestions();
    }
  }, [listing, currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setSearchParams({
      listing,
      page: page.toString(),
      limit: pageSize.toString()
    });
  };

  const handleSearch = (value) => {
    if (!value) {
      message.warning({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Please enter a listing number</span>,
        style: {
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          minWidth: '200px',
          maxWidth: '400px',
        }
      });
      return;
    }
    setSearchParams({
      listing: value,
      page: '1',
      limit: pageSize.toString()
    });
  };

  const columns = [
    {
      title: 'Question ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text, record, index) => (
        <div className="transition-all duration-300 hover:scale-105">
          {text}
        </div>
      ),
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      render: (text, record, index) => (
        <div 
          className="transition-all duration-500 ease-out whitespace-pre-line"
          style={{ 
            animation: 'fadeIn 0.5s ease-out forwards',
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
            '@keyframes fadeIn': {
              from: {
                opacity: 0,
                transform: 'translateY(10px)'
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)'
              }
            }
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 200,
      render: (text, record, index) => (
        <div 
          className="transition-all duration-500 ease-out"
          style={{ 
            animation: 'fadeIn 0.5s ease-out forwards',
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
            '@keyframes fadeIn': {
              from: {
                opacity: 0,
                transform: 'translateY(10px)'
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)'
              }
            }
          }}
        >
          {new Date(text).toLocaleString()}
        </div>
      ),
    }
  ];

  const inputClassName = "bg-white border-gray-300 text-gray-900 h-12 rounded-md hover:border-blue-500 focus:border-blue-500";
  const labelClassName = "text-gray-300 font-medium";

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col" data-aos="fade-up">
        {/* Header - Fixed Height */}
        <div className="flex justify-between items-center mb-8 px-2">
          <h1 className="text-3xl font-bold text-white">Questions</h1>
          <div className="flex items-center gap-4">
            <div className="flex mr-2">
              <Input
                placeholder="Enter listing number"
                defaultValue={listing}
                className="w-[220px] rounded-l-md h-[40px] border-0"
                style={{
                  backgroundColor: 'white',
                  paddingLeft: '16px',
                  fontSize: '15px',
                }}
              />
              <Button 
                onClick={() => handleSearch(form.getFieldValue('search'))}
                className="flex items-center justify-center bg-white hover:bg-gray-50 border-0 h-[40px] w-[40px] rounded-r-md"
                icon={<SearchOutlined className="text-gray-400 text-lg" />}
              />
            </div>

            <Button
              icon={<ReloadOutlined className="text-lg" />}
              onClick={fetchQuestions}
              loading={loading}
              className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[40px] px-6 rounded-md"
            >
              <span className="ml-1">Refresh</span>
            </Button>

            <Button 
              icon={<ArrowLeftOutlined className="text-lg" />}
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[40px] px-6 rounded-md ml-2"
            >
              <span className="ml-1">Back</span>
            </Button>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-4 mt-4 flex-1 flex flex-col overflow-hidden">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Spin size="large" />
              <p className="mt-4 text-gray-400">Loading questions...</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Table Container - Scrollable */}
              <div className="flex-1 overflow-auto">
                <Table
                  columns={columns}
                  dataSource={questions}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: true }}
                  styles={{
                    table: {
                      backgroundColor: 'transparent',
                      color: 'white',
                    },
                    thead: {
                      '& th': {
                        backgroundColor: 'rgba(255,255,255,0.1) !important',
                        color: 'white !important',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                      }
                    },
                    tbody: {
                      '& td': {
                        backgroundColor: 'transparent !important',
                        color: 'white !important',
                        borderBottom: '1px solid rgba(255,255,255,0.1) !important',
                      },
                      '& tr:hover td': {
                        backgroundColor: 'rgba(255,255,255,0.05) !important',
                      }
                    }
                  }}
                />
              </div>

              {/* Footer Section - Fixed Height */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="text-gray-400 font-medium">
                    Total Questions: {pagination.total_count || 0}
                  </div>
                  <Pagination
                    current={pagination.current_page || 1}
                    pageSize={pagination.page_size || 10}
                    total={pagination.total_count || 0}
                    onChange={handlePageChange}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `Total ${total} questions`}
                    className="text-sm custom-pagination"
                  />
                </div>

                {/* Info Sections */}
                <div className="mt-4 bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                  <h3 className="text-white font-semibold mb-2">Information:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                    <li>Enter a listing number to view questions</li>
                    <li>Questions are displayed in chronological order</li>
                    <li>Use pagination to navigate through questions</li>
                  </ul>
                </div>

                <div className="mt-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className="flex items-center text-sm text-gray-300">
                    <InfoCircleOutlined className="text-blue-400 mr-2" />
                    <span>Questions are automatically refreshed when changing page or page size.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetQuestions;