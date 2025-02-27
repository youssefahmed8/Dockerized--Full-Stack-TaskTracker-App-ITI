const ProfileSkeleton = () => {
  return (
    <section className="px-4">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm shadow-lg rounded-2xl p-4 bg-gray-700 animate-pulse">
          <main className="w-full">
            <div className="p-2">
              <div className="w-full px-2 pb-8 sm:rounded-lg">
                <div className="skeleton h-8 w-1/3 mx-auto mb-3 bg-gray-500 rounded"></div>

                <div className="grid mx-auto">
                  {/* Profile Picture Section */}
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <div className="w-32 h-32 bg-gray-500 rounded-full ring-2 ring-indigo-500"></div>
                    <div className="flex flex-col space-y-5 w-full sm:w-auto">
                      <div className="skeleton h-12 w-full bg-gray-500 rounded-lg"></div>
                      <div className="skeleton h-12 w-full bg-gray-500 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="mt-4 text-[#202142]">
                    <div className="flex flex-col w-full mb-2 space-y-2">
                      <div className="w-full">
                        <div className="skeleton h-4 w-1/2 mb-2 bg-gray-500 rounded"></div>
                        <div className="skeleton h-12 w-full bg-gray-500 rounded-lg"></div>
                      </div>
                    </div>

                    <div className="mb-2 w-full">
                      <div className="skeleton h-4 w-1/2 mb-2 bg-gray-500 rounded"></div>
                      <div className="skeleton h-12 w-full bg-gray-500 rounded-lg"></div>
                    </div>

                    <div className="mb-2 w-full">
                      <div className="skeleton h-4 w-1/2 mb-2 bg-gray-500 rounded"></div>
                      <div className="flex gap-4">
                        <div className="skeleton h-6 w-1/2 bg-gray-500 rounded-lg"></div>
                        <div className="skeleton h-6 w-1/2 bg-gray-500 rounded-lg"></div>
                      </div>
                    </div>

                    <div className="skeleton h-12 w-full mt-4 bg-gray-500 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
