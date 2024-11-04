import React from 'react';
import './Startup.css';

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="content-wrapper">
        <div className="content-columns">
          <main className="main-column">
            {/* ABOUT US Section */}
            <div className="header-wrapper">
              <h1 className="about-header">
                <span style={{ fontWeight: 800, color: 'rgba(201,88,39,1)' }}>ABOUT US</span>
              </h1>
              <p className="description">
                (GCECC) is a Somali Diaspora-led business consortium focused on construction, 
                investment, affordable housing, agriculture, healthcare, sustainable tourism, 
                and eco-development in Somalia. Comprising social entrepreneurs, investors, 
                and professionals, they aim to promote investment opportunities for Somalia’s 
                reconstruction and development.
              </p>
            </div>
            
            {/* OUR MISSION Section */}
            <div className="mission-wrapper">
              <h2 className="mission-text">
                <span style={{ color: 'rgba(64,46,122,1)' }}>OUR</span>
                <span style={{ color: 'rgba(201,88,39,1)' }}> MISSION</span>
              </h2>
              <p className="mission-description">
                To provide every home with delicious
              </p>
            </div>
          </main>
          
          {/* CEO Info Section */}
          <aside className="sidebar-column">
            <div className="ceo-info">
            <h3 className="ceo-title">CEO</h3>
              <div className="ceo-gender">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4498135a7da85d534c8f78097bf78853655d18efc6afb3338c38e1828339b345?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" className="gender-icon" alt="Gender icon" />
                <span>Male</span>
              </div>
              <hr className="details-divider" />
              <div className="ceo-details">
                <div className="birth-info">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/75f2cd2014283035b5e03e728bea3e7c3cb589c0e9e55f4642536f9c73ee9c05?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" className="birth-icon" alt="Birth date icon" />
                  <span className="birth-date">Born June 26, 1980</span>
                </div>
                <hr className="details-divider" />
                <div className="nationality">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b5aa2ad3ba76d5a91a46e8eb356bce7130c9fd6cad0d70dd7fa0a997cb15c00?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" className="nationality-icon" alt="Nationality icon" />
                  <span>America</span>
                </div>
                
                <hr className="details-divider" />
                <div className="nationality">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b5aa2ad3ba76d5a91a46e8eb356bce7130c9fd6cad0d70dd7fa0a997cb15c00?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" className="nationality-icon" alt="Nationality icon" />
                  <span>teamnaval@gmail.com</span>
                </div>
                <hr className="details-divider" />
                <div className="nationality">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b32f2a20491be7c14911edf5914a0010d456b9c767e292fe29e38d47b2bd69cb?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" className="nationality-icon" alt="Nationality icon" />
                  <span>33757005467</span>
                </div>
                
             
     
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
