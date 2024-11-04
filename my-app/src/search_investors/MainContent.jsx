import React from 'react';
import SearchBar from './SearchBar';
import InvestorCard from './InvestorCard';

function MainContent() {
  const investors = [
    {
      name: "Naval Ravikant",
      affiliation: "AngelList",
      notableInvestments: "Twitter, Uber, AngelList, Yammer, Stack Overflow",
      background: "Co-founder of AngelList, Ravikant is a prominent angel investor and entrepreneur known for his insights into startups and investing.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d9a45ba8852e91701d6e09ef0ab170b770e0dbd985a6fe5238a817e613fa582?placeholderIfAbsent=true&apiKey=07248fc168e74f97b89ef7a6bf94fc9f",
      isFavorite: false
    },
    {
      name: "Naval Ravikant",
      affiliation: "AngelList",
      notableInvestments: "Twitter, Uber, AngelList, Yammer, Stack Overflow",
      background: "Co-founder of AngelList, Ravikant is a prominent angel investor and entrepreneur known for his insights into startups and investing.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d9a45ba8852e91701d6e09ef0ab170b770e0dbd985a6fe5238a817e613fa582?placeholderIfAbsent=true&apiKey=07248fc168e74f97b89ef7a6bf94fc9f",
      isFavorite: false
    },
    {
      name: "Naval Ravikant",
      affiliation: "AngelList",
      notableInvestments: "Twitter, Uber, AngelList, Yammer, Stack Overflow",
      background: "Co-founder of AngelList, Ravikant is a prominent angel investor and entrepreneur known for his insights into startups and investing.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d9a45ba8852e91701d6e09ef0ab170b770e0dbd985a6fe5238a817e613fa582?placeholderIfAbsent=true&apiKey=07248fc168e74f97b89ef7a6bf94fc9f",
      isFavorite: false
    },
    
  ];

  return (
    <main className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <SearchBar />
        <section className="flex overflow-hidden flex-col px-10 pt-10 pb-24 mt-1.5 w-full min-h-[855px] max-md:px-5 max-md:max-w-full">
          <hr className="w-full bg-gray-200 border border-solid min-h-[1px] max-md:max-w-full" />
          {investors.map((investor, index) => (
            <InvestorCard key={index} {...investor} />
          ))}
          <hr className="mt-6 w-full bg-gray-200 border border-solid min-h-[1px] max-md:max-w-full" />
        </section>
      </div>
    </main>
  );
}

export default MainContent;