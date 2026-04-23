export default function FullscreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/movieflix-navbar-logo.svg"
          alt="Loading MovieFlix"
          className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-60 h-auto"
        />

        <p className="mt-6 text-sm sm:text-base text-zinc-400 tracking-[0.3em] uppercase">
          Loading
        </p>
      </div>
    </div>
  )
}