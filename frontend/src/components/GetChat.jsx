import { useState, useRef } from 'react';
import { 
  Button, 
  Input, 
  Spin, 
  Timeline, 
  Tag, 
  Empty, 
  Tooltip, 
  Alert 
} from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  SearchOutlined,
  UserOutlined,
  RobotOutlined,
  FileOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ReloadOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const GetChat = () => {
  const [chatData, setChatData] = useState({
    chat_messages: [],
    to_show_education_message: false,
    education_message: '',
    reply_suggestions: []
  });
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  const listing = searchParams.get('listing') || '';
  const candidateId = searchParams.get('candidate_id') || '';

  const fetchChat = async () => {
    if (!listing || !candidateId) {
      message.error('Please provide both listing number and candidate ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.trollgold.org/persistventures/assignment/get_chat?listing=${listing}&candidate_id=${candidateId}`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch chat history');

      const result = await response.json();
      if (result.success && result.data) {
        setChatData(result.data);
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error('Failed to load chat data');
      }
    } catch (error) {
      message.error('Error fetching chat: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (msg) => (
    <Timeline.Item
      key={msg.id}
      dot={msg.was_me ? 
        <RobotOutlined className="text-purple-400" /> : 
        <UserOutlined className="text-blue-400" />
      }
      color={msg.was_me ? 'purple' : 'blue'}
    >
      <div className={`p-3 rounded-lg mb-4 ${
        msg.was_me ? 'bg-purple-900/30' : 'bg-blue-900/30'
      } border border-gray-700/50`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">
              {msg.was_me ? 'Bot' : 'Candidate'}
            </span>
            {msg.is_seen && (
              <Tooltip title="Seen">
                <CheckCircleOutlined className="text-green-400" />
              </Tooltip>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <span>{msg.time}</span>
            {msg.date && <span>{msg.date}</span>}
          </div>
        </div>
        <p className="text-gray-300 whitespace-pre-line">{msg.message}</p>
        {msg.attachment_path !== "null" && (
          <div className="mt-2">
            <Tag icon={<FileOutlined />} color="blue">
              Attachment {msg.file_size !== "null" && `(${msg.file_size})`}
            </Tag>
          </div>
        )}
      </div>
    </Timeline.Item>
  );

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Chat History</h1>
            <p className="text-gray-400 text-sm mt-1">View and manage candidate conversations</p>
          </div>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-[#4B8BF4] text-white border-none hover:bg-blue-600 h-8 px-4 rounded-md"
          >
            Back
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Search Controls */}
          <div className="flex flex-wrap items-center gap-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-auto flex flex-wrap gap-3">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="Listing..."
                  value={listing}
                  onChange={(e) => setSearchParams({
                    listing: e.target.value,
                    candidate_id: candidateId
                  })}
                  style={{
                    fontSize: '0.95rem',
                    backgroundColor: 'white',
                    height: '36px',
                    padding: '8px 11px',
                    width: '140px',
                    maxWidth: '100%'
                  }}
                  className="rounded-md hover:border-blue-500 focus:border-blue-500 flex-1 sm:flex-none"
                />
                
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Candidate..."
                  value={candidateId}
                  onChange={(e) => setSearchParams({
                    listing: listing,
                    candidate_id: e.target.value
                  })}
                  style={{
                    fontSize: '0.95rem',
                    backgroundColor: 'white',
                    height: '36px',
                    padding: '8px 11px',
                    width: '140px',
                    maxWidth: '100%'
                  }}
                  className="rounded-md hover:border-blue-500 focus:border-blue-500 flex-1 sm:flex-none"
                />

                <Button
                  icon={<ReloadOutlined />}
                  onClick={fetchChat}
                  loading={loading}
                  className="h-9 bg-gray-700 text-white border-gray-600 hover:bg-gray-600 rounded-md 
                    flex items-center whitespace-nowrap px-4"
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-10">
                <Spin size="large" />
                <p className="mt-2 text-gray-300">Loading chat history...</p>
              </div>
            ) : (
              chatData.chat_messages?.length > 0 ? (
                <Timeline>
                  {chatData.chat_messages.map(renderMessage)}
                </Timeline>
              ) : (
                <Empty 
                  description={<span className="text-gray-400">No chat history found</span>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                />
              )
            )}
          </div>

          {/* Suggestions Section */}
          {chatData.reply_suggestions?.length > 0 && (
            <div className="mt-4 bg-gray-700/30 p-4 rounded-lg border border-gray-600">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Suggested Replies:</h3>
              <div className="flex flex-wrap gap-2">
                {chatData.reply_suggestions.map((suggestion, index) => (
                  <Tag key={index} color="blue" className="cursor-pointer hover:opacity-80">
                    {suggestion}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50">
            <h3 className="text-white font-semibold mb-2">Chat Information:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>Enter both listing number and candidate ID to view chat</li>
              <li>Messages are displayed in chronological order</li>
              <li>Green checkmark indicates seen messages</li>
              <li>Use the refresh button to get real-time updates</li>
            </ul>
          </div>

          {/* Status Info */}
          <div className="bg-gray-800/30 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
            <div className="flex items-center text-sm text-gray-300">
              <InfoCircleOutlined className="text-blue-400 mr-2" />
              <span>Chat history is updated in real-time.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetChat;
