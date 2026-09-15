import {forwardRef} from "react";
import cn from "../../utils/cn";


const Button = forwardRef(({className, variant, children, ...rest}, ref) => {
    const getVariant = (variant) => {
        switch (variant) {
            case "primary":
                return "btn-primary";
            case "secondary":
                return "btn-primary";
            case "bordered":
                return "btn-bordered";
            case "ghost":
                return "";
            default:
                return "btn-primary";
        }
    };
    return (
        <button
            {...rest}
            ref={ref}
            className={cn("whitespace-nowrap", getVariant(variant), className)}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
  
