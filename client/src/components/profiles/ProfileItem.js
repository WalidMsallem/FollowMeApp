import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profil-card">
        <div className="flex">
          <div style={{ flex: 3, paddingLeft: 15 }}>
            <Link to={`/profile/${profile.handle}`}>
              <img
                src={profile.user.avatar}
                alt=""
                style={{ borderRadius: "8px", width: "80%", height: "80%" }}
              />
            </Link>
          </div>

          <ul className="list-group " style={{ flex: 8, padding: "5px" }}>
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
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
