import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import RegistrationForm from './RegisForm.jsx';

function RegistrationPage() {
  return (
    <div>
      <main className="overflow-hidden  bg-neutral-100 max-md:px-5">
        <div className="flex gap-5 max-md:flex-col">
          <section className="flex flex-col">
            <div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de3aea3114c0526150eec50a3e45bc6f077916c5e4c965b18f4ce9519aed07d?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a"
                alt="Registration illustration"
                className="object-contain w-full max-w-[75%] max-h-[900px] aspect-[0.65] mx-auto"
              />
            </div>
          </section>
          <RegistrationForm />
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;
