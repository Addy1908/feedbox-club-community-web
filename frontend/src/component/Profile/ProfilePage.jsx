import React from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileTabs from "./ProfileTabs";

function ProfilePage() {
  return (
    <div className="pt-[60px]">
    <ProfileBanner/>
    <ProfileTabs />
    </div>
  );
}

export default ProfilePage;
