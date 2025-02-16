import QuickLinks from "../components/QuickLinks";
import QuickNote from "../components/QuickNote";
import RecentNotes from "../components/RecentNotes";
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useOutletContext();

    return(
      <div className="dashboard-content">
        <QuickNote
          userData={userData}
          setUserData={setUserData}
        />


        <div className="col-wrapper">
          <div className="col-1-container">
            <RecentNotes />
          </div>
          <div className="col-2-container">
            something
          </div>
        </div>

          
      </div>
    )
}

export default Dashboard;
