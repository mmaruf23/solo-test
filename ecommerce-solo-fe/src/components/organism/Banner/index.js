export default function Banner() {
  return (
    <section className="flex justify-center w-full my-5">
      <div className="w-[1280px] md:h-80 h-60 border border-white flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-pl-1">
        <div className="snap-start h-full md:min-w-1/2 min-w-full flex justify-center items-center bg-red-400">
          Ini banner
        </div>
        <div className="flex-none snap-start h-full md:min-w-1/2 min-w-full flex justify-center items-center bg-blue-400">
          Ini banner
        </div>
        <div className="flex-none snap-start h-full md:min-w-1/2 min-w-full flex justify-center items-center bg-green-400">
          Ini banner
        </div>
        <div className="flex-none snap-start h-full md:min-w-1/2 min-w-full flex justify-center items-center bg-yellow-400">
          Ini banner
        </div>
        <div className="flex-none snap-start h-full md:min-w-1/2 min-w-full flex justify-center items-center bg-purple-400">
          Ini banner
        </div>
      </div>
    </section>
  );
};
