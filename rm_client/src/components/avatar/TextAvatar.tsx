import React from "react";

interface TextAvatarProps {
  name: string; // Name to generate initials
  size?: number; // Size of the avatar
  backgroundColor?: string; // Background color
  textColor?: string; // Text color
}

const TextAvatar: React.FC<TextAvatarProps> = ({
  name,
  size = 40,
  backgroundColor = "#148e8b",
  textColor = "#ffffff",
}) => {
  // Generate initials from the name
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2); // Take up to 2 initials
  };

  const initials = getInitials(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor,
        color: textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%", // Circle shape
        fontSize: size / 2.5,
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {initials}
    </div>
  );
};

export default TextAvatar;
