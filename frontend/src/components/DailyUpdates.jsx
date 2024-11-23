import { useState, useEffect } from 'react';
import { Button, message, Pagination, Input, Spin, Timeline, Tag } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  HistoryOutlined,
  ReloadOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DailyUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultLimit = 10;
  const listing = searchParams.get('listing') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('limit')) || defaultLimit;

  // Toast configuration
  message.config({
    top: 20,
    maxCount: 1,
    duration: 3,
  });

  const fetchUpdates = async () => {
    if (!listing) {
      message.error({
        content: <span style={{ color: '#000000', fontWeight: '600' }}>Please provide a listing number</span>,
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

    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;
      const queryParams = new URLSearchParams({
        listing: listing,
        offset: offset,
        limit: pageSize
      }).toString();

      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/getUpdates?${queryParams}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch daily updates');
      }

      const result = await response.json();
      setUpdates(result.daily_updates || []);
      setPagination(result.pagination || {});
      
      if (result.success) {
        message.success({
          content: <span style={{ color: '#000000', fontWeight: '600' }}>Updates fetched successfully! 🎉</span>,
          style: {
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'auto',
            minWidth: '200px',
            maxWidth: '400px',
          }
        });
      }
    } catch (error) {
      message.error('Error fetching updates: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (listing) {
      fetchUpdates();
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
    setSearchParams({
      listing: value,
      page: '1',
      limit: pageSize.toString()
    });
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 overflow-hidden">
      <div className="max-w-5xl mx-auto h-full flex flex-col" data-aos="fade-up">
        {/* Header Section */}
        <div className="flex justify-between items-center h-[60px]">
          <h1 className="text-3xl font-bold text-white">Daily Updates</h1>
          <div className="flex items-center gap-4">
            <div className="flex">
              <Input
                placeholder="Enter listing number"
                defaultValue={listing}
                onPressEnter={(e) => handleSearch(e.target.value)}
                className="w-[220px] rounded-l-md h-[40px] border-0"
                style={{
                  backgroundColor: 'white',
                  paddingLeft: '16px',
                  fontSize: '15px',
                }}
              />
              <Button 
                onClick={() => handleSearch(document.querySelector('input').value)}
                className="flex items-center justify-center bg-white hover:bg-gray-50 border-0 h-[40px] w-[40px] rounded-r-md"
                icon={<SearchOutlined className="text-gray-400 text-lg" />}
              />
            </div>

            <Button
              icon={<ReloadOutlined className="text-lg" />}
              onClick={fetchUpdates}
              loading={loading}
              className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[40px] px-6 rounded-md"
            >
              <span className="ml-1">Refresh</span>
            </Button>

            <Button 
              icon={<ArrowLeftOutlined className="text-lg" />}
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[40px] px-6 rounded-md"
            >
              <span className="ml-1">Back</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 backdrop-blur-lg p-6 mt-4 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-300">Loading daily updates...</p>
            </div>
          ) : (
            <>
              <Timeline
                className="mt-4 px-4"
                items={updates.map(update => ({
                  color: 'blue',
                  dot: <ClockCircleOutlined className="text-blue-400" />,
                  children: (
                    <div key={update.id} className="bg-gray-700/30 p-6 rounded-xl border border-gray-600 mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <Tag color="blue" className="text-sm px-3 py-1">
                            Chat ID: {update.chat_id}
                          </Tag>
                          <div className="text-sm text-gray-300">
                            {dayjs(update.time_stamp).format('MMMM D, YYYY HH:mm')}
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate(`/reply-daily?listing=${listing}&chat_id=${update.chat_id}`)}
                          className="bg-[#4B8BF4] text-white border-0 hover:bg-blue-600 h-[32px] px-4 rounded-md"
                        >
                          Reply
                        </Button>
                      </div>
                      <p className="text-gray-300 whitespace-pre-line text-base">{update.Update}</p>
                    </div>
                  ),
                }))}
              />

              <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-6">
                <div className="text-gray-300 font-medium">
                  Total Updates: {pagination.total_count || 0}
                </div>
                <Pagination
                  current={pagination.current_page || 1}
                  pageSize={pagination.page_size || 10}
                  total={pagination.total_count || 0}
                  onChange={handlePageChange}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total) => <span className="text-gray-300">Total {total} updates</span>}
                  className="text-sm"
                />
              </div>

              {/* Info Section */}
              <div className="mt-6 bg-gray-700/30 p-4 rounded-xl border border-gray-600">
                <div className="flex items-center text-sm text-gray-300">
                  <InfoCircleOutlined className="text-blue-400 mr-2" />
                  <span>Updates are automatically refreshed when changing page or page size.</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyUpdates;