import clsx from "clsx";

const Card = ({ className, children }) => {
  return (
    <div
  className={clsx(
    "rounded-3xl px-10 py-4 bg-white",
    "backdrop-filter backdrop-blur-lg",
    className
  )}
  style={{
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 32px 0 rgba(20, 28, 141, 0.37)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)", // For Safari
  }}
>
  {children}
</div>
  );
};

export default Card;