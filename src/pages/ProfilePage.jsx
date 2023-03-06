import React from "react";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const { userData, isAuthenticated } = useContext(SessionContext);
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:5005/users/${userData.id}`
    );
    setProfileData(response.data.oneUser);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      fetchData();
    }
  }, [userData]);

  return (
    <div className="container">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>{profileData.username}</h1>
          {/* <div className="row -spacing-a">
            <div className="col-md-12">
              <h1>MY PROFILE</h1>
            </div>
          </div>
          <div className="row -spacing-a">
            <div className="col-md-4">
              <div className="profile-image">
                <img
                  src="https://www.xing.com/image/0_c_3_3fce34b38_15444149_3/fabian-pecher-foto.1024x1024.jpg"
                  className="fullwidth"
                />
                <div className="edit-profile-image">
                  <span className="edit-profile-image__information">
                    <span className="fa fa-camera"></span>
                    <span className="edit-profile-image__label">
                      Edit picture
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <h5>GENERAL INFORMATION</h5>
              <div className="row -spacing-b">
                <div className="col-md-3">
                  <p className="-typo-copy">Username</p>
                  <p className="-typo-copy">Name</p>
                  <p className="-typo-copy">Surname</p>
                  <p className="-typo-copy">Birthday</p>
                  <p className="-typo-copy">E-Mail Adresse</p>
                </div>
                <div className="col-md-3">
                  <p className="-typo-copy -typo-copy--blue">matmat</p>
                  <p className="-typo-copy -typo-copy--blue">mat</p>
                  <p className="-typo-copy -typo-copy--blue">saubin</p>
                  <p className="-typo-copy -typo-copy--blue">01.01.1010</p>
                  <p className="-typo-copy -typo-copy--blue">mat@dummy.com</p>
                </div>
                <div className="col-md-3">
                  <p className="-typo-copy">
                    Postal code
                    <br />
                    Residence
                  </p>
                  <p className="-typo-copy">Password</p>

                  <button className="btn btn--green">
                    <span className="btn__icon fa fa-pencil"></span>
                    <span className="btn__label">Edit Profile</span>
                  </button>
                </div>
                <div className="col-md-3">
                  <p className="-typo-copy -typo-copy--blue">
                    12345
                    <br />
                    Some city
                  </p>
                  <p className="-typo-copy -typo-copy--blue">******</p>
                </div>
              </div>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}

export default ProfilePage;
