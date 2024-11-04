import React from 'react';

function BackgroundImage() {
  return (
    <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
      <div className="grow max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
            <img 
              loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fd3d706032d359880af72fa495f96b87c8a633b20321100408ff89c8038065c?placeholderIfAbsent=true&apiKey=a595820471de40108e62248b2a13cb8a" 
              alt="Decorative background image"
              className="object-contain z-10 mt-[300px] mr-0 w-full aspect-[1.01] max-md:mt-10 max-md:max-w-full ml-[200px] "  // Shifting image to the right
            />
          </div>
          <div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
            <div className="flex shrink-0 mx-auto max-w-full bg-blue-700 h-[1024px] w-[454px] -ml-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundImage;
