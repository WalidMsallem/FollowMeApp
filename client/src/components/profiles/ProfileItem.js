import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div style={{ flex: 3, margin: "5px" }}>
            <Link to={`/profile/${profile.handle}`}>
              <img
                src={profile.user.avatar}
                alt=""
                style={{ borderRadius: "8px", width: "100%", height: "100%" }}
              />
            </Link>
          </div>

          <ul className="list-group " style={{ flex: 8, margin: "5px" }}>
            <li className="list-group-item">
              <h3>{profile.user.name}</h3>{" "}
            </li>
            <li className="list-group-item">
              {" "}
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span> a {profile.company}</span>
              )}
            </li>
            <li className="list-group-item">
              {" "}
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}{" "}
            </li>
          </ul>

          {/* <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
