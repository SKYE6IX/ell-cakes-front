import React from "react";
import Link from 'next/link';
import "./button.scss";

interface ButtonProps {
   textKey: string;
   href?: string;
   handleClick?: () => void;
   disabled?: boolean;
   target?: boolean;
}

function Button({
   textKey,
   href,
   handleClick,
   disabled,
   target,
}: ButtonProps) {
   return ( 
      <button
         className="button"
         onClick={handleClick}
         disabled={disabled}
      >
         <Link
            href={href ? href : ""}
            className="button__link"
            target={target ? "_blank" : ""}
         >
            <span className="button__text">
               {textKey}
            </span>
         </Link>
      </button>
   );
}
export default Button;
