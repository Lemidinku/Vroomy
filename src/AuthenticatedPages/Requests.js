import "./Requests.css";
import Navbar from "../../src/Components/NavBar/Navbar";
import Dashboard from "../../src/Components/Dashboard/Dashboard";
import Footer from "../../src/Components/Footer/Footer";
import RequestsRow from "../../src/Components/RequestsRow/RequestsRow";
import RequestsRowMob from "../../src/Components/RequestsRow/RequestsRowMob";
const Requests = () => {
  return (
    <>
      <div className="container">
        <Navbar pageTitle={"Booking Requests"} />
        <main>
          <Dashboard />
          <div className="main__content">
            <div className="page__title--mobile">
              <p>Booking Requests</p>
            </div>
            <div className="booking__request">
              <div className="booking__request__header">
                <div className="booking__request__title">
                  <p>Requests</p>
                </div>
                <div className="booking__request__dropdown">
                  <label htmlFor="myDropdown"></label>
                  <select id="myDropdown" name="myDropdown">
                    <option value="option1">This Week</option>
                    <option value="option2">This Month</option>
                    <option value="option3">This Year</option>
                  </select>
                </div>
              </div>
              <div className="booking__request__table">
                <div className="booking__request__table__container">
                  <div className="row__header--flex">
                    <div className="row__header">
                      <p>User's Name</p>
                    </div>
                    <div className="row__header--carname">
                      <p>Car Name</p>
                    </div>
                    <div className="row__header">
                      <p>Booking Date</p>
                    </div>
                    <div className="row__header--status">
                      <p>Status</p>
                    </div>
                  </div>
                  {/* Mobile View */}
                  <div className="row__mobile">
                    <RequestsRowMob />
                    <RequestsRowMob />
                    <RequestsRowMob />
                    <RequestsRowMob />
                  </div>

                  <div className="row__desktop">
                    <RequestsRow />
                    <RequestsRow />
                    <RequestsRow />
                    <RequestsRow />
                  </div>
                </div>
              </div>
              <div className="pagination">
                <a href="#">&laquo;</a>
                <a href="#" className="active">
                  1
                </a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">&raquo;</a>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Requests;
