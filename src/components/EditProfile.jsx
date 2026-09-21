//building form to edit profile

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice"; 
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  // Skills are edited as one comma-separated string, e.g. "React, Node, Mongo"
  const [skills, setSkills] = useState(
    (user.skills || []).flatMap((s) => s.split(",")).map((s) => s.trim()).join(", ")
  );

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [saving, setSaving] = useState(false);

  const skillsArray = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const saveProfile = async () => {
    setError("");
    setSaving(true);
    try {
      const res = await axios.patch(
  BASE_URL + "profile/update",
  { firstName, lastName, age: Number(age), gender, photoUrl, about, skills: skillsArray },
  { withCredentials: true }
);
      // Works whether your API returns the user directly or as { data: user }
      dispatch(addUser(res.data?.data || res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Could not save your profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-start gap-10 my-10 px-4">
        {/* Form */}
        <div className="card bg-base-300 w-96 shadow-2xl ring-1 ring-white/10">
          <div className="card-body gap-2">
            <h2 className="card-title justify-center text-2xl">Edit profile</h2>

            <div className="grid grid-cols-2 gap-3">
              <label className="form-control">
                <span className="label-text mb-1">First name</span>
                <input
                  type="text"
                  className="input w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control">
                <span className="label-text mb-1">Last name</span>
                <input
                  type="text"
                  className="input w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="form-control">
                <span className="label-text mb-1">Age</span>
                <input
                  type="number"
                  min="18"
                  className="input w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control">
                <span className="label-text mb-1">Gender</span>
                <select
                  className="select w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <label className="form-control">
              <span className="label-text mb-1">Photo URL</span>
              <input
                type="url"
                className="input w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-1">Skills</span>
              <input
                type="text"
                className="input w-full"
                placeholder="React, Node, MongoDB"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <span className="label-text-alt mt-1 text-base-content/60">
                Separate skills with commas
              </span>
            </label>

            <label className="form-control">
              <span className="label-text mb-1">About</span>
              <textarea
                className="textarea w-full h-24"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              className="btn btn-primary mt-2"
              onClick={saveProfile}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </div>
        </div>

        {/* Live preview: shows exactly how others will see you */}
        <div>
          <p className="text-center text-sm text-base-content/60 -mb-6">
            Preview
          </p>
          <UserCard
            user={{ firstName, lastName, age, gender, photoUrl, about, skills: skillsArray }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;