import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import DashPostUser from "../posts/dashPostUser";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div style={{ textAlign: " center", margin: "10px" }}>
            <h1 className="lead text-muted">
              Salut{" "}
              <Link
                to={`/profile/${profile.handle}`}
                className="lead text-muted"
              >
                {user.name}
              </Link>
            </h1>
            <br />
            <ProfileActions />
            <DashPostUser />

            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div className="center dis-flex " style={{ marginTop: "20%" }}>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Vous n'avez pas creez votre profile encore</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Creez votre profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard full-screen dash">
        <div className="container dash-box">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
