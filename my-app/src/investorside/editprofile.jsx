import { useState,useRef } from "react";

const EditProfilePage = () => {
  // Define state for the form fields
  const [profile, setProfile] = useState({
    title: "",
    email: "",
    contactNumber: "",
    companyFounded: "",
    shortDescription: "",
    bio: "",
    gender: "",
    birthdate: "",
    location: "",
    returnOnInvestment: "",
    profilePhoto: null, // Add profilePhoto to state
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle form submit (add your logic here)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic here
    console.log("Profile saved:", profile);
  };



const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdateClick = () => {
    fileInputRef.current.click();
  };



  return (
    <div className="min-h-screen">

         <nav className="flex flex-col  w-full max-md:ml max-md:w-full">
            <div className="text-3xl mt-5 ml-5 font-extrabold text-orange-700">Pitchers</div>
          </nav>

      {/* Form Section */}
      <div className="flex-1 p-10 ">
        <h2 className=" text-indigo-900  ml-[43%] text-2xl font-bold mb-3">Edit profile</h2>

        <form onSubmit={handleSubmit} className="bg-gray-100 ml-[17%] p-4 rounded-lg shadow-sm max-w-3xl">
      <div className="grid grid-cols-2 gap-6 ">
        <div>
          <label className="block mt-[10%] text-black-100 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={profile.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-4 border-gray-500 text-gray-500 shadow-sm "
          />
        </div>


      <div className="flex flex-col items-center">

      <div className="relative w-32 h-32">
        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">No photo</span>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          name="profilePhoto"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        {previewUrl ? (
          <>
            <button
              onClick={handleRemovePhoto}
              className="absolute bottom-0 right-1 bg-orange-400 text-white rounded-full w-6 h-6 transform translate-x-1/2 -translate-y-1/2"
              aria-label="Remove photo"
            >
              ×
            </button>
          </>
        ) : (
          <button
            onClick={handleUpdateClick}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Add photo"
          />
        )}
      </div>
    </div>
      </div>


      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-black-100 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-black-100 font-semibold">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={profile.contactNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-black-100 font-semibold">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={profile.shortDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-black-100 font-semibold">Company Founded</label>
          <input
            type="text"
            name="companyFounded"
            value={profile.companyFounded}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
        </div>
      </div>



      <div className="grid grid-cols-2 gap-6 mb-4">
     
      <div>
          <label className=" span text-black-100 font-semibold">Gender</label>  
          <label className="ml-[26%] text-black-100 font-semibold">Birthdate</label> <br/>

          <div className="flex gap-1">
          <input
            type="text"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="mt-1  w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />

          <input
            type="date" 
            name="birthdate"
            value={profile.birthdate}
            onChange={handleChange}
            className="mt-1 w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
          </div>
        </div>

        <div>
          <label className="block text-black-100 font-semibold">Bio</label>
          <input
            type="text"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
        </div>

      </div>

       
         
   

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-black-100 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-black-100 font-semibold">Return of Investment</label>
          <input
            type="text"
            name="returnOnInvestment"
            value={profile.returnOnInvestment}
            onChange={handleChange}
            className="mt-1 block w-full rounded-sm px-1 py-1 border-gray-500 text-gray-500 shadow-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-orange-400 text-white ml-[52%] px-8 py-1 rounded-md hover:bg-orange-600">
        Save
      </button>
    </form>
    
      </div>

    </div>
  );
};

export default EditProfilePage;