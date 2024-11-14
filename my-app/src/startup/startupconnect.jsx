
import  { useState } from 'react';
import profilepic from './startup_profile.png'
import inboxpic1 from './naval_profile.jpeg'


const StartupConnect = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startups, setStartups] = useState([
    { id: 1, name: 'Anupam Mittal', status: null, date: null },
    { id: 2, name: 'Kunal Bahl', status: null, date: null },
  ]);


  const [investments, setInvestments] = useState([
    {
      id: 1,
      name: 'Naval Ravikant',
      description: 'Co-founder of AngelList, Ravikant is a prominent angel investor and entrepreneur known for his insights into startups and investing.',
      affiliation: 'AngelList',
      date: '19 Aug',
      logo: inboxpic1,
      status: 'pending',
    },
  ]);

  const filteredStartups = startups.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnect = (startupId) => {
    setStartups(prevStartups =>
      prevStartups.map(startup =>
        startup.id === startupId
          ? { ...startup, status: 'Pending', date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) }
          : startup
      )
    );
  };

  const handleAccept = (investmentId) => {
    setInvestments(prevInvestments =>
      prevInvestments.map(investment =>
        investment.id === investmentId
          ? { ...investment, status: 'accepted' }
          : investment
      )
    );
  };

  const handleReject = (investmentId) => {
    setInvestments(prevInvestments =>
      prevInvestments.filter(investment => investment.id !== investmentId)
    );
  };

  return (

    <>

    <nav className="flex justify-between items-center w-full max-md:ml max-md:w-full">
    <div className="text-3xl mt-5 ml-5 font-extrabold text-orange-700">Pitchers</div>
    <div className="flex space-x-9  text-lg font-semibold text-indigo-900 ">
      <a href="/" className='hover:font-bold'>Profile</a>
      <a href="/startup_search" className='hover:font-bold' >Explore Startups</a>
      <a href="/connect" className='hover:font-bold'>Connect</a>
    </div>
    <div className='px-7'>
      <img src={profilepic} alt="Profile" className="w-10 h-10 rounded-full" />
      <a className='text-xs text-orange-400 font-bold'>Log out</a>
    </div>
  </nav>


    <div className=" min-h-screen">
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-4 ">
    
        <div className='w-[45%]' >
        <h2 className=" bg-blue-100 p-2 rounded-lg shadow text-lg text-indigo-900 font-semibold mb-4"> Request outbox</h2>
          <div className="bg-gray-100  p-6 rounded-lg shadow">
    
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search startups"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <ul className="space-y-4">
              {filteredStartups.map((startup) => (
                <li key={startup.id} className="flex justify-between bg-white p-3 rounded-lg items-center">
                  <div>
                    <p className="font-medium">{startup.name}</p>
                    {startup.date && <p className="text-sm text-gray-500">{startup.date}</p>}
                  </div>
                  {startup.status === null ? (
                    <button
                      onClick={() => handleConnect(startup.id)}
                      className=" bg-blue-100 p-4 text-blue-800 px-2 py-1 rounded-full text-xs "
                    >
                      Connect
                    </button>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      startup.status === 'Pending' ? 'bg-yellow-100 p-4 text-yellow-800' : 'bg-green-100 p-4 text-green-800'
                    }`}>
                      {startup.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          </div>


          <div >
          <h2 className=" bg-blue-100 p-2 rounded-lg shadow text-lg text-indigo-900 font-semibold mb-4"> Request inbox</h2>

          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <ul className="space-y-6 ">
              {investments.map((investment) => (
                <li key={investment.id} className="flex space-x-4 bg-white p-4 rounded">
                  <img src={investment.logo} alt={`${investment.name} logo`} className="w-12 h-12 rounded-full" />
                  <div className="flex-grow">
                    <h3 className="font-medium">{investment.name}</h3>
                    <p className="text-sm text-gray-600">{investment.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{investment.affiliation}</p>

                     
                    {investment.status === 'pending' ? (
                      <div className="mt-2 space-x-2">
                        <button 
                          onClick={() => handleAccept(investment.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleReject(investment.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <p className="mt-2 text-green-600 font-medium">Request Accepted</p>
                    )}

                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{investment.date}</p>
                   
                  </div>
                </li>
              ))}
            </ul>
          </div>
          </div>

          
        </div>
      </main>
    </div>
    </>
  );
};

export default StartupConnect;
