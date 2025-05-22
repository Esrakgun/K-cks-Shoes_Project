import type { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="relative w-full px-4 md:px-6 xl:px-2 mt-6 md:mt-12 xl:mt-20">
      <div className="absolute top-1/2 transform -translate-y-1/2 max-sm:h-full max-sm:flex flex-col justify-end text-white px-4 py-2 xs:py-4 sm:p-6 md:p-10">
        <p className="text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] xl:text-[24px] xl:font-semibold text-grey">
          Yalnızca belirli bir süre için geçerlidir
        </p>

        <h1 className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[60px] xl:text-[74px] font-semibold">
          %30 indirim
        </h1>

        <p className="text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] xl:text-[24px] max-w-[80%] text-grey">
          Rahatınız düşünülerek tasarlanan spor ayakkabılar, bir sonraki antrenmanınızda tüm enerjinizi ortaya koyabilirsiniz.
        </p>
      </div>

      <img
        src="/banner.png"
        alt="banner"
        className="w-full h-[500px] object-cover rounded-[24px] md:rounded-[32px]"
      />

    </div>
  );
};

export default Hero;

// <div className="relative mt-6 md:mt-12 xl:mt-20"></div>
