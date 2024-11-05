import { useEffect, useState } from 'react';
import profilepicPlaceholder from '../investorside/naval_profile.jpeg'; // Placeholder if no image
import cover from '../investorside/naval_cover.jpg';
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom';
import IHeader from './IHeader';

const InvestorProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const { email } = useParams(); // Extract email from URL params
    const location = useLocation();// Dynamic email
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          // Axios GET request with email as a query parameter
          
          const response = await axios.get('http://localhost:3000/profile', {
            params: { email }, // Pass the email as a query parameter
          });
          setProfile(response.data); // Set profile data on successful response
        } catch (error) {
          console.error('Error fetching profile:', error); // Handle error
        }
      };
  
      fetchProfile(); // Call the fetch function on component mount
    }, [email]); 
    if (!profile) {
        return <div>Loading...</div>; // Show loading state if profile data is not loaded yet
      }

  return (
    <>
    <IHeader></IHeader>
    <div className="max-w-5xl mx-auto ">
      <header className="mt-2 bg-gray-100 pb-8 mb-6 rounded">
        <div className="relative">
          <img src={cover} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
          <img src={profile.profilePhoto || profilepicPlaceholder} alt={profile.title} className="absolute bottom-0 left-4 transform translate-y-1/2 w-24 h-24 rounded-full border-4 border-white" />
        </div>

        <div className="mt-12 flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-indigo-900 ml-5 font-bold">{profile.title}</h1>
            <div className="flex items-center text-yellow-500 ml-5">
              <p>{profile.shortDescription}</p>
            </div>
          </div>
          <button className="border-2 border-blue-600 text-blue-600 font-semibold px-4 py-2 rounded-lg mr-4">
            <a href="/investor_profile">Edit Profile</a>
          </button>
        </div>
      </header>

      <div className='flex'>
        <div className="about">
          <h2 className=" text-xl font-semibold text-indigo-900  mb-5">About</h2>
          <ul className="space-y-10 text-blue-600">
            <li className="flex items-center">👤 {profile.gender}</li>
            <li className="flex items-center">📍 {profile.location}</li>
            <li className="flex items-center">✉️ {profile.email}</li>
            <li className="flex items-center">📞 {profile.contactNumber}</li>
          </ul>
        </div>

        <div>
          <p className='bio w-[80%] text-justify ml-3'>
            <b>{profile.title}</b> is a {profile.shortDescription}. {profile.bio}
          </p>
          <br />

          <div className="grid grid-cols-2 w-[70%] gap-7 ml-[16%] mt-3">
            <div className="bg-gray-100 p-4 rounded">
              <div className="text-4xl font-bold text-orange-700">{profile.totalInvestments || '0'}</div>
              <div>Total Investments</div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <div className="text-4xl font-bold text-orange-700">{profile.totalFundsInvested || '$0'}</div>
              <div>Total funds invested</div>
            </div>
          </div>
        </div>
      </div>

       


      <div className="grid grid-cols-2 gap-6"> 
        <div className="col-span-2">

        <div className="mb-6 mt-4 ml-[18%] w-[70%]">
  <h2 className="text-xl font-semibold text-indigo-900 mb-4">Top investments</h2>
  <ul className="space-y-2">
    {[
      { name: 'McDonald\'s', width: '90%' },
      { name: 'Starbucks', width: '70%' },
      { name: 'Uber', width: '60%' },
      { name: 'Lyft', width: '50%' },
      { name: 'Apple', width: '80%' },
    ].map((company, index) => (
      <li key={index} className="flex justify-between items-center">
        <span>{company.name}</span>
        <div className="bg-gray-200 w-3/4 h-4 rounded">
          <div className="bg-blue-600 h-full rounded" style={{ width: company.width }}></div>
        </div>
      </li>
    ))}
     </ul>
     </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div>
              <div className="relative">
                <svg viewBox="0 0 36 36" className="w-32 h-32">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4299e1"
                    strokeWidth="2"
                    strokeDasharray="85, 100"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-orange-700  font-semibold">
                <p className='text-xl font-semibold text-indigo-900'>Returns on investments</p>
                  85.3%
                </div>
                <p className='mt-2 text-sm text-justify'>Naval Ravikant, a notable angel investor and entrepreneur, has achieved success by investing early in companies like Twitter, Uber, and AngelList. He focuses on visionary founders and innovative ideas, diversifying across sectors to manage risk and maximize returns.</p>
              </div>
            </div>

            <div className='ml-[10%] mt-5'>
              <h2 className="text-xl font-semibold text-indigo-900 mb-2">AngelList</h2>
              <p className="text-sm text-justify">
               <b> Founded</b>: 2010<br />
               <b> Co-Founders</b>  : Naval Ravikant and Babak Nivi<br />
               <b>Purpose</b>: AngelList was created to democratize the investment process for startups and to help them find the right talent.<br />
               <b>Products and Services</b>: 
                <ol>
                  <li> • AngelList Talent</li>
                  <li> • AngelList Venture</li>
                  <li> • Raised by AngelList</li>
                </ol>
              </p>
            </div>
          </div>


          <div className="mt-12">
            <h2 className="text-xl text-indigo-900 font-semibold mb-4">Investment History on Pitchers</h2>
            <ul className="space-y-2">
              {[1, 2, 3].map((_, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                  <div className="flex items-center">
                    <span className="mr-2">💰</span>
                    <div>
                      <div className="font-semibold">Acme Inc.</div>
                      <div className="text-sm text-gray-600">January 2021</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-semibold">$500,000</div>
                </li>
              ))}
            </ul>
            <a href="/view-all-investments" className="text-blue-600 flex items-center mt-2">View all <span className="ml-1">→</span></a>
          </div>

         
        </div>
      </div>

     
    </div>
    </>
  );
};

export default InvestorProfilePage;