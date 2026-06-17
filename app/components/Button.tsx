import Link from "next/link";

interface ButtonProps {
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
    children: React.ReactNode;
    className?: string;
}

export default function Button({ href, onClick, children, className = "" }: ButtonProps) {
    const classes = `relative inline-flex items-center justify-center px-8 py-4 bg-[#F4F1EA] text-[#3E2723] font-medium tracking-widest uppercase text-sm overflow-hidden group shadow-lg cursor-pointer ${className}`;

    const content = (
        <>
            {/* The Liquid Blob */}
            <span className="absolute left-1/2 top-[120%] w-[300px] h-[300px] bg-[#3E2723] rounded-[40%] animate-wave transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:top-[-100px] z-0"></span>

            {/* The Text */}
            <span className="relative z-10 transition-colors duration-700 ease-in-out group-hover:text-[#F4F1EA]">
                {children}
            </span>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={classes}>
            {content}
        </button>
    );
}