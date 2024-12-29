import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="FormGrid AI Logo"
        width={120}
        height={40}
        priority
      />
    </Link>
  );
};

export default Logo;
