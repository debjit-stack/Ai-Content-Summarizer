// const Spinner = ({ size = 'md', className = '' }) => {
//   const sizeClasses = {
//     sm: 'w-4 h-4',
//     md: 'w-8 h-8',
//     lg: 'w-12 h-12',
//     xl: 'w-16 h-16'
//   };

//   return (
//     <div className={`inline-block ${sizeClasses[size]} ${className}`}>
//       <div className="animate-spin rounded-full border-2 border-solid border-blue-500 border-t-transparent"></div>
//     </div>
//   );
// };

// export default Spinner;
const Spinner = ({ size = 'md', className = '', variant = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variantClasses = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-purple-500 border-t-transparent',
    success: 'border-green-500 border-t-transparent',
    gradient: 'border-transparent bg-gradient-primary',
  };

  if (variant === 'gradient') {
    return (
      <div className={`inline-block ${sizeClasses[size]} ${className}`}>
        <div className="animate-spin rounded-full bg-gradient-primary opacity-75">
          <div className="w-full h-full rounded-full border-2 border-white/30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div className={`animate-spin rounded-full border-2 ${variantClasses[variant]} shadow-glow`}></div>
    </div>
  );
};

export default Spinner;