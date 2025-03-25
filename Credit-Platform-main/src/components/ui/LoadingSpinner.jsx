const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="relative w-16 h-16">
          {/* Cercle extérieur */}
          <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
  
          {/* Cercle animé */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
  
          {/* Point central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }
  
  export default LoadingSpinner
  
  