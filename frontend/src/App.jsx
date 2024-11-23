import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import JobPostingForm from './components/JobPostingForm';
import InternshipPostingForm from './components/InternshipPostingForm';
import UnpaidInternshipForm from './components/UnpaidInternshipForm';
import GetListingForm from './components/GetListingForm';
import AutomateListingForm from './components/AutomateListingForm';
import GetAssignmentsForm from './components/GetAssignmentsForm';
import AnnouncementForm from './components/AnnouncementForm';
import ListingStatusForm from './components/ListingStatusForm';
import GetMessageForm from './components/GetMessageForm';
import SetMessageForm from './components/SetMessageForm';
import ActiveListings from './components/ActiveListings';
import ClosedListings from './components/ClosedListings';
import ReplyCandidateForm from './components/ReplyCandidateForm';
import ReplyCandidateBotForm from './components/ReplyCandidateBotForm';
import GetCandidateEmail from './components/GetCandidateEmail';
import MarkEvaluation from './components/MarkEvaluation';
import MarkEvaluationBot from './components/MarkEvaluationBot';
import MarkFutureEvaluation from './components/MarkFutureEvaluation';
import AddAssignment from './components/AddAssignment';
import AddReview from './components/AddReview';
import DailyUpdates from './components/DailyUpdates';
import ReplyDaily from './components/ReplyDaily';   
import GetQuestions from './components/GetQuestions';
import ReplyQuestion from './components/ReplyQuestion';
import HireCandidate from './components/HireCandidate';
import GetChat from './components/GetChat';
import SendMessage from './components/SendMessage';
import SignUp from './components/SignUp';
import Login from './components/Login';

// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/post-job" element={<JobPostingForm />} />
        <Route path="/dashboard/post-internship" element={<InternshipPostingForm />} />
        <Route path="/dashboard/post-unpaid-internship" element={<UnpaidInternshipForm />} />
        <Route path="/dashboard/auto-listings" element={<GetListingForm />} />
        <Route path="/dashboard/automate-listing" element={<AutomateListingForm />} />
        <Route path="/dashboard/assignments" element={<GetAssignmentsForm />} />
        <Route path="/dashboard/announcement" element={<AnnouncementForm />} />
        <Route path="/dashboard/listing-status" element={<ListingStatusForm />} />
        <Route path="/dashboard/get-messages" element={<GetMessageForm />} />
        <Route path="/dashboard/send-message" element={<SetMessageForm />} />
        <Route path="/dashboard/active-listings" element={<ActiveListings />} />
        <Route path="/dashboard/closed-listings" element={<ClosedListings />} />
        <Route path="/dashboard/reply-candidate" element={<ReplyCandidateForm />} />
        <Route path="/dashboard/reply-candidate-bot" element={<ReplyCandidateBotForm />} />
        <Route path="/dashboard/candidate-email" element={<GetCandidateEmail />} />
        <Route path="/dashboard/mark-eval" element={<MarkEvaluation />} />
        <Route path="/dashboard/mark-eval-bot" element={<MarkEvaluationBot />} /> 
        <Route path="/dashboard/mark-eval-future" element={<MarkFutureEvaluation />} />
        <Route path="/dashboard/add-assignment" element={<AddAssignment />} />
        <Route path="/dashboard/add-review" element={<AddReview />} />
        <Route path="/dashboard/daily-updates" element={<DailyUpdates />} />
        <Route path="/dashboard/reply-daily" element={<ReplyDaily />} />
        <Route path="/dashboard/get-questions" element={<GetQuestions />} />
        <Route path="/dashboard/reply-questions" element={<ReplyQuestion />} />
        <Route path="/dashboard/hire-candidate" element={<HireCandidate />} /> 
        <Route path="/dashboard/get-chat" element={<GetChat />} />  
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard/send-message" element={<SendMessage />} /> */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;