const UserProfileSkeleton = () => {
  return(
      <>
          <div className={`flex items-center gap-5`}>
              <div className={``}>
                  <div className="w-12 h-12 md:w-24 md:h-24 rounded-[50%] bg-opacity-20 bg-gray-500 font-bold"></div>
              </div>
              <div className={`flex flex-col gap-3`}>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 md:w-48"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 md:w-48"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 md:w-48"></div>
                  </div>
              </div>
          </div>
          <div className={`flex items-center gap-5`}>
              <div className={`flex flex-col gap-3`}>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
              </div>
          </div>
          <div className={`flex items-center gap-5`}>
              <div className={`flex flex-col gap-3`}>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
                  <div className="max-w-sm animate-pulse flex items-center justify-center">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 md:w-96"></div>
                  </div>
              </div>
          </div>

      </>
  )
}

export default UserProfileSkeleton;