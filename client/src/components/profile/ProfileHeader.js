import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class ProfileHeader extends Component {
  state = {
    event: {},
    file: null,
    loading: false,
    src: []
  };
  componentDidMount() {}
  onChangeImage = e => {
    this.setState({
      file: e.target.files[0],
      event: { ...this.state.event, image: e.target.files[0].name }
    });
  };

  handleAddevent = async () => {
    const { event, file } = this.state;

    const formData = new FormData();
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    if (file !== null) {
      this.setState({
        loading: true
      });
      return axios
        .post("/api/upload/up", formData, config)
        .then(response => {
          // alert("The file is successfullly uploadsd" , formData);
          this.setState(
            {
              event: { ...event, image: response.data }
            },
            () => {
              axios
                .post(`/api/upload/avatar/${this.props.auth.user.id}`, {
                  ...event,
                  image: response.data
                })
                .then(res => {
                  return this.setState({
                    loading: false
                  });
                })
                .catch(e => alert("error add event "));
            }
          );
        })
        .catch(error => {
          alert("error image upload");
        });
    }
    return this.setState({
      error: true
    });
  };

  render() {
    const { profile } = this.props;

    return (
      <div className="row" style={{ flex: 1 }}>
        <div className="col-md-12">
          <div className="card card-body  text-white mb-3 bg-spec mg-15">
            <div
              className=" m-auto"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <img
                style={{
                  width: " 50% ",
                  borderRadius: "40% 40%",
                  minWidth: " 400px"
                }}
                src={`http://localhost:5000/${profile.user.avatar}`}
                alt=""
              />
              <input
                type="file"
                name={this.state.event.name}
                onChange={this.onChangeImage}
                className="inputfile"
              />

              <button
                onClick={this.handleAddevent}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "25%"
                }}
                variant="contained"
              >
                Changer votre avatar
              </button>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ProfileHeader);
