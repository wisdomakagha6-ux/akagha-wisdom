import { cn } from "@/lib/utils";

interface RollingButtonTextProps {
  text: string;
  className?: string;
}

export default function RollingButtonText({ text, className }: RollingButtonTextProps) {
  return (
    <span className={cn("btn-roll-text-wrap", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="btn-roll-text">
        {Array.from(text).map((character, index) => (
          <span
            key={`${character}-${index}`}
            className="btn-roll-text__char"
            style={
              {
                "--btn-roll-delay": `${index * 0.012}s`,
                "--btn-roll-duration": `${0.34 + (index % 3) * 0.03}s`,
              } as React.CSSProperties
            }
          >
            <span className="btn-roll-text__glyph btn-roll-text__glyph--current">
              {character === " " ? "\u00A0" : character}
            </span>
            <span className="btn-roll-text__glyph btn-roll-text__glyph--next">
              {character === " " ? "\u00A0" : character}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
