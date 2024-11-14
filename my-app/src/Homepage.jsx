
import { useEffect, useRef } from 'react';
import './index.css';
import './Homepage.css';
import Bott from './bottom.jsx';
import manImage from './img/man.png';
import thumbImage from './img/bottom.png';
import SeamlessJourney from './heading.jsx';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

function Homepage() {
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRef4 = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('expanded');
        } else {
          entry.target.classList.remove('expanded');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observing multiple sections
    [sectionRef1, sectionRef2, sectionRef3, sectionRef4].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [sectionRef1, sectionRef2, sectionRef3, sectionRef4].forEach(ref => {
        if (ref.current instanceof Element) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <header className="py-4 pr-5 pl-11 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex gap-8 items-center max-md:flex-col">
          <nav className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
            <div className="flex gap-10 items-center text-xl font-semibold text-indigo-900 whitespace-nowrap max-md:mt-10 max-md:max-w-full">
              <div className="text-3xl font-extrabold text-orange-700">Pitchers</div>
              <a href="#">Home</a>
              <a href="#">Startup</a>
              <a href="#">Investors</a>
              <a href="#">About</a>
            </div>
          </nav>
          <div className="ml-auto flex gap-4 max-md:ml-0 max-md:mt-4">
            <button className="px-6 py-2 text-white font-bold bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
              onClick={() => navigate('/register')}>
              Sign In
            </button>
            <button className="px-6 py-2 text-white font-bold bg-orange-500 rounded-full hover:bg-orange-600 transition duration-300"
              onClick={() => navigate('/login')}>
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Section 1 */}
      <section ref={sectionRef1} className="transition-section py-16 pl-16 w-full bg-neutral-100 max-md:pl-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
            <div className="max-h-[350px]">
              <h1 className="text-2xl font-regular text-indigo-900 max-md:mt-10">
                <span className="block text-6xl font-bold text-indigo-900 mb-4">
                  Unlock Your Startup's Potential
                </span>
                Our platform connects startups with investors, unlocking funding and growth opportunities.
              </h1>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Whether you're looking to raise capital or make a meaningful investment, our platform bridges the gap between innovators and investors.
              </p>
              <button className="mt-8 w-[250px] py-3 text-base font-extrabold text-center text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-300"
              onClick={()=>navigate('/event')}>
                Top News
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-auto w-3/5 max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={thumbImage}
              alt="Illustration representing startups and investors"
              className="w-[70%] h-full object-cover ml-auto"
            />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section ref={sectionRef2} className="transition-up flex justify-center items-center py-10">
        <div className="flex flex-col-reverse lg:flex-row items-center w-full h-full max-w-[1200px] mx-auto">
          <div className="flex w-full h-full lg:w-[80%] justify-right lg:justify-end">
            <img loading="lazy" src={manImage} className="object-contain" alt="Man image"/>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col px-7 py-8 font-extrabold bg-slate-200 shadow-lg rounded-[20px] relative">
              <div className="self-start px-5 py-2 text-lg font-extrabold text-center text-blue-800 rounded-xl border-blue-800 border-solid bg-neutral-100 border-[2px]">
                Why Invest?
              </div>
              <h2 className="text-xl font-bold pt-4 text-indigo-900">
                Discover Innovative Startups<br /><br />
                <span className="text-lg font-medium text-gray-700">
                  Explore their ideas, review their financials, and connect with the founders to find the perfect investment opportunity.
                </span>
              </h2>
              <button
                tabIndex="0"
                className="self-center mt-6 w-[250px] h-12 text-base font-extrabold text-center text-white bg-orange-400 rounded-xl hover:bg-orange-500 transition-all duration-300"
                onClick={()=>navigate('/investor_profile')}>
                Become an Investor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section ref={sectionRef3} className="transition-up flex justify-center items-center">
        <div className="flex flex-col-reverse lg:flex-row items-center w-full h-full max-w-[1400px] mx-auto">
          <div className="flex flex-col w-[50%] max-md:w-full">
            <div className="ml-20 flex flex-col grow font-extrabold bg-slate-100 p-8 rounded-lg shadow-lg">
              <div className="self-start px-5 py-2 text-lg text-center text-blue-800 rounded-xl border-blue-800 border-solid bg-neutral-100 border-[2px]">
                Why Pitch?
              </div>
              <h2 className="text-xl font-bold pt-4 text-indigo-900">
                Secure Funding for Your Startup<br /><br />
                <span className="text-lg font-medium text-gray-700">
                  Pitch your innovative idea, showcase your business plan, and unlock the funding you need to turn your vision into reality.
                </span>
              </h2>
              <button
                tabIndex="0"
                className="self-center mt-6 w-[250px] h-12 text-base font-extrabold text-center text-white bg-orange-400 rounded-xl hover:bg-orange-500 transition-all duration-300"
                onClick={()=>navigate('/startup')}
              >
                Pitch your idea
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0a270c97bfc1b086ea9216bdec81cb977bb9f59c3ca75a82796509c68a81431?placeholderIfAbsent=true&apiKey=bf587ccec06c42a682f4f9dae620cfde"
              alt="Image representing pitching your idea"
              className="object-contain grow w-full aspect-[1.28] max-md:max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Section 4 - New Features */}
      <section ref={sectionRef4} className="transition-up flex justify-center items-center py-16 bg-neutral-100">
        <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-indigo-900 mb-8">
            Unlock Your Startup's Potential
          </h2>
          <div className="grid grid-cols-3 gap-8 w-full">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Connect and Chat</h3>
              <p className="text-gray-700 mb-4">
                Connect with investors and startups, and chat in real-time to discuss opportunities.
              </p>
              <button
                className="px-6 py-2 text-white font-bold bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
                onClick={() => navigate('/chat')}
              >
                Start Chatting
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Get Top News</h3>
              <p className="text-gray-700 mb-4">
                Stay up-to-date with the latest news and trends in the startup and investment world.
              </p>
              <button
                className="px-6 py-2 text-white font-bold bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
                onClick={() => navigate('/news')}
              >
                View Top News
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Analytics</h3>
              <p className="text-gray-700 mb-4">
                Get insights and analysis on the latest market trends and investment opportunities.
              </p>
              <button
                className="px-6 py-2 text-white font-bold bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
                onClick={() => navigate('/analysis')}
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      <SeamlessJourney />
      <div className="x">
        <Bott />
      </div>
    </>
  );
}

export default Homepage;