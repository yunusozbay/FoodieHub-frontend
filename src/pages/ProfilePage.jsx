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
        {console.log(profileData)}
          <h1>{profileData.username}</h1>

          <div class="user-profile py-4">
            <div class="container">
              <div class="row">
                <div class="col-lg-4">
                  <div class="card shadow-sm my-4">
                    <div class="card-header bg-transparent text-center">
                      <img
                        class="profile_img"
                        src="https://source.unsplash.com/600x300/?student"
                        alt="student dp"
                      />
                      <h3>Hello, {profileData.username}!</h3>
                    </div>
                    <div class="card-body">
                      <p class="mb-0">
                        <strong class="pr-1">Friends: </strong>3
                      </p>
                      <p class="mb-0">
                        <strong class="pr-1">Favorite restaurants: </strong>4
                      </p>
                      <p class="mb-0">
                        <strong class="pr-1">Events organized: </strong>2
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card shadow-sm">
                    <div class="card-header bg-transparent border-0">
                      <h3 class="mb-0">
                        <i class="far fa-clone pr-1"></i>General Information
                      </h3>
                    </div>
                    <div class="card-body pt-0">
                      <table class="table table-bordered">
                        <tr>
                          <th width="30%">Username</th>
                          <td width="2%">:</td>
                          <td>{profileData.username}</td>
                        </tr>
                        <tr>
                          <th width="30%">Email address</th>
                          <td width="2%">:</td>
                          <td>{profileData.email}</td>
                        </tr>
                        <tr>
                          <th width="30%">Joined on</th>
                          <td width="2%">:</td>
                          <td>{profileData.createdAt.slice(0,10)}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div class="card shadow-sm my-4">
                    <div class="card-header bg-transparent border-0">
                      <h3 class="mb-0">
                        <i class="far fa-clone pr-1"></i>Other Information
                      </h3>
                    </div>
                    <div class="card-body pt-0">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
