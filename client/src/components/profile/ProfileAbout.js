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
      <div
        className="row mg-15 center"
        style={{ flex: 1, backgroundColor: "#09639275" }}
      >
        <div className="col-md-12">
          <div
            className="card card-body  mb-3"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90%",
              backgroundColor: " #f8f9fa82"
            }}
          >
            <div style={{ backgroundColor: " #f8f9fa82" }}>
              <h5 className="text-center text-info"> Bio</h5>
              <hr />
              <p className="lead">
                {isEmpty(profile.bio) ? (
                  <span>{firstName} bio</span>
                ) : (
                  <span>{profile.bio}</span>
                )}
              </p>
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
