// src/components/Avatar.tsx
interface AvatarProps {
    avatarUrl?: string;
    name?: string;
  }
  
  const Avatar: React.FC<AvatarProps> = ({ avatarUrl, name }) => {
    if (avatarUrl) {
      return (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
          <img
            src={avatarUrl}
            alt={name ? `${name} avatar` : "avatar"}
            className="object-cover w-full h-full"
          />
        </div>
      );
    } else {
      // fallback
      const fallbackChar = name?.[0]?.toUpperCase() || "?";
      return (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {fallbackChar}
        </div>
      );
    }
  };
  
  export default Avatar;
  