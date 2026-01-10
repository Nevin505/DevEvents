"use client";

import Image from "next/image";

const ExploreBtn = () => {
  return (
    <button
      onClick={() => {}}
      type="button"
      id="explore-btn"
      className="mt-7 mx-auto "
    >
      <a href="#events">
        Explore Btn
        <Image
          src="/icons/arrow-down.svg"
          alt="down Arrow Icon"
          width={24}
          height={24}
        />
      </a>
      
    </button>
  );
};

export default ExploreBtn;
