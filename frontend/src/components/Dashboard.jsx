import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const API_URL = 'http://localhost:3001/api';

const Dashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newJobData, setNewJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    type: 'FULLTIME',
    duration: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs/activeListing`);
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const endpoint = newJobData.type === 'FULLTIME' ? 'make_Job' : 'make_Internship';
      
      // Create the request body based on job type
      const requestBody = {
        title: newJobData.title,
        description: newJobData.description,
        requirements: newJobData.requirements,
        salary: newJobData.salary,
        location: newJobData.location
      };

      // Add duration only for internships
      if (newJobData.type === 'INTERNSHIP') {
        requestBody.duration = newJobData.duration;
      }

      await axios.post(`${API_URL}/jobs/${endpoint}`, requestBody);
      setIsCreateModalOpen(false);
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutomate = async (listingId) => {
    try {
      setLoading(true); // Add loading state
      const response = await axios.post(`${API_URL}/jobs/automate_Listing`, {
        listingId, // Match the exact parameter name from controller
        process: 'standard'
      });
  
      if (response.data.success) {
        console.log('Job automated successfully');
        fetchJobs();
      }
    } catch (error) {
      console.error('Error automating job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationStatus = async (applicationId, status, notes = '') => {
    try {
      let endpoint;
      switch (status) {
        case 'EVALUATED':
          endpoint = 'evaluate';
          break;
        case 'FUTURE':
          endpoint = 'future';
          break;
        case 'HIRED':
          endpoint = 'hire';
          break;
        default:
          return;
      }
      
      await axios.post(`${API_URL}/applications/${endpoint}`, {
        applicationId,
        notes
      });
      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/applications`);
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (applicationId, content, type = 'USER') => {
    try {
      await axios.post(`${API_URL}/messages/send`, {
        applicationId,
        content,
        type
      });
      fetchMessages(applicationId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async (applicationId) => {
    try {
      const response = await axios.get(`${API_URL}/messages/${applicationId}`);
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const renderJobsList = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 text-gray-500">Title</th>
              <th className="text-left py-4 px-6 text-gray-500">Type</th>
              <th className="text-left py-4 px-6 text-gray-500">Location</th>
              <th className="text-left py-4 px-6 text-gray-500">Salary</th>
              <th className="text-left py-4 px-6 text-gray-500">Status</th>
              <th className="text-left py-4 px-6 text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b border-gray-100">
                <td className="py-4 px-6">{job.title}</td>
                <td className="py-4 px-6">{job.type}</td>
                <td className="py-4 px-6">{job.location}</td>
                <td className="py-4 px-6">{job.salary}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    job.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleAutomate(job._id)}
                    className="text-dark-accent hover:text-dark-accent/80 transition-colors mr-4"
                  >
                    Automate
                  </button>
                  {/* <button 
                    onClick={() => setSelectedJob(job)}
                    className="text-dark-accent hover:text-dark-accent/80 transition-colors"
                  >
                    View Details
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCreateJobModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6">Create New Job</h2>
        <form onSubmit={createJob}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                value={newJobData.type}
                onChange={(e) => setNewJobData({ ...newJobData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-accent focus:ring-dark-accent"
              >
                <option value="FULLTIME">Full Time</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newJobData.title}
                onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-accent focus:ring-dark-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newJobData.description}
                onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-accent focus:ring-dark-accent"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <textarea
                value={newJobData.requirements}
                onChange={(e) => setNewJobData({ ...newJobData, requirements: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-accent focus:ring-dark-accent"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                type="text"
                value={newJobData.salary}
                onChange={(e) => setNewJobData({ ...newJobData, salary: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-accent focus:ring-dark-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={newJobData.location}
                onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-accent focus:ring-dark-accent"
                required
              />
            </div>

            {newJobData.type === 'INTERNSHIP' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (months)</label>
                <input
                  type="number"
                  value={newJobData.duration}
                  onChange={(e) => setNewJobData({ ...newJobData, duration: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-dark-accent focus:ring-dark-accent"
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-dark-accent text-white rounded-md hover:bg-dark-accent/90"
              >
                Create Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-primary text-white p-4">
        <div className="text-2xl font-bold gradient-text mb-8">
          <Link to="/">Sysmode</Link>
        </div>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'jobs' ? 'bg-dark-accent' : 'hover:bg-dark-secondary'
            }`}
          >
            Jobs
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'applications' ? 'bg-dark-accent' : 'hover:bg-dark-secondary'
            }`}
          >
            Applications
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'messages' ? 'bg-dark-accent' : 'hover:bg-dark-secondary'
            }`}
          >
            Messages
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          {activeTab === 'jobs' && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-dark-accent text-white px-4 py-2 rounded-lg hover:bg-dark-accent/90 transition-colors"
            >
              + Create New Job
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-accent"></div>
          </div>
        ) : (
          <>
            {activeTab === 'jobs' && renderJobsList()}
            {/* Add other tab content here */}
          </>
        )}
      </main>

      {isCreateModalOpen && renderCreateJobModal()}
    </div>
  );
};

export default Dashboard;