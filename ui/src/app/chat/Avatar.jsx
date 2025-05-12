const Avatar = ({ src, alt, size = "md" }) => {
    const sizeClass = {
      sm: "w-6 h-6",
      md: "w-9 h-9",
      lg: "w-12 h-12",
    }[size];
  
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover border-2 border-white ${sizeClass}`}
      />
    );
  };

export default Avatar;
  