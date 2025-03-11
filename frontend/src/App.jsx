import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentDashboard from "./views/student/studentDashboard/StudentDashboard";
import CulturalEvent from "./views/student/forms/culturalEvents/CulturalEvent";
import TechnicalEventForm from "./views/student/forms/technicalEvents/TechnicalEvents";
import InternshipForm from "./views/student/forms/internships/Internship";
import SportsEventsForm from "./views/student/forms/sportsEvents/Sports";
import PlacementDetailsForm from "./views/student/forms/placements/Placement";
import ResearchPaperForm from "./views/student/forms/researchPaper/ResearchPaper";
import SocietiesForm from "./views/student/forms/societiesAndClubs/SocietiesAndClubs";
import ViewCulturalEvents from "./views/student/view_details/culturalEvents/Cultural";
import InternshipEntries from "./views/student/view_details/internships/Internships";
import PlacementEntries from "./views/student/view_details/placements/Placements";
import SportsEvents from "./views/student/view_details/sports/Sports";
import ViewSocietiesClubs from "./views/student/view_details/societiesAndClubs/SocietiesAndClubs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-dashboard/cultural-event-form" element={<CulturalEvent/>}/>
        <Route path="/student-dashboard/technical-event-form" element={<TechnicalEventForm/>}/>
        <Route path="/student-dashboard/internship-form" element={<InternshipForm/>}/>
        <Route path="/student-dashboard/sports-event-form" element={<SportsEventsForm/>}/>
        <Route path="/student-dashboard/placement-form" element={<PlacementDetailsForm/>}/>
        <Route path="/student-dashboard/research-paper-form" element={<ResearchPaperForm/>}/>
        <Route path="/student-dashboard/society-clubs-form" element={<SocietiesForm/>}/>
        <Route path="/placements" element={<PlacementEntries/>}/>
        <Route path="/cultural-events" element={<ViewCulturalEvents/>}/>
        <Route path="/internships" element={<InternshipEntries/>}/>
        <Route path="/societies-clubs" element={<ViewSocietiesClubs/>}/>
        <Route path="/research-paper-form" element={<PlacementEntries/>}/>
        <Route path="/sports-events" element={<SportsEvents/>}/>
      </Routes>
    </Router>
  );
}

export default App;