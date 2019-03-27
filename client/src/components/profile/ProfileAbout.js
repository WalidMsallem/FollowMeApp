import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill List
    // const skills = profile.skills.map((skill, index) => (
    //   <div key={index} className="p-3">
    //     <i className="fa fa-check" /> {skill}
    //   </div>
    // ));

    return (
      <div className="row mg-15" style={{ flex: 1 }}>
        <div className="col-md-12">
          <div
            className="card card-body bg-light mb-3"
            style={{ display: "flex", flexDirection: "column", height: "90%" }}
          >
            <div style={{ flex: 1 }}>
              <h3 className="text-center text-info">{firstName}'s Bio</h3>
              <p className="lead">
                {isEmpty(profile.bio) ? (
                  <span>{firstName} bio</span>
                ) : (
                  <span>{profile.bio}</span>
                )}
              </p>
            </div>
            <hr />
            <div style={{ flex: 1 }}>
              <h3 className="text-center text-info">competence</h3>
              <div className="row">
                {/* <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {skills}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
