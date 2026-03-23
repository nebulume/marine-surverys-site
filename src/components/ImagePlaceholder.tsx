import { Camera } from "lucide-react";

interface ImagePlaceholderProps {
  id: string;
  label: string;
  aspectRatio?: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

const ImagePlaceholder = ({
  id,
  label,
  aspectRatio = "16/9",
  className = "",
  overlay = false,
  overlayOpacity = 0.6,
}: ImagePlaceholderProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden bg-navy-mid ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
        <Camera className="text-grey" size={32} strokeWidth={1.5} />
        <span className="text-center font-body text-sm text-grey leading-snug max-w-[240px]">
          {label}
        </span>
        <span className="font-body text-[10px] uppercase tracking-widest text-grey/50">
          {id}
        </span>
      </div>
      {overlay && (
        <div
          className="absolute inset-0 bg-navy"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
};

export default ImagePlaceholder;
