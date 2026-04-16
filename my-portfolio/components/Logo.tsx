import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function Logo({ size = 40, className, alt = "Omar El Hawary", priority }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
