import { cx } from "@/lib/cx";

export const Paragraph = ({
  smallMarginTop = false,
  children,
  className = "",
}: {
  smallMarginTop?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cx(
        smallMarginTop ? "mt-[1.8em]" : "mt-[2.5em]",
        "text-lg text-gray-900",
        className
      )}
    >
      {children}
    </p>
  );
};