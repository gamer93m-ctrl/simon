import { clsx } from "clsx";
import { ArrowUpRightIcon } from "./Icons";

export function ArrowCta({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "flex h-[60px] w-[60px] items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_30px_rgba(84,150,249,0.35)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]",
        className,
      )}
      aria-hidden
    >
      <ArrowUpRightIcon className="h-5 w-5" />
    </span>
  );
}
