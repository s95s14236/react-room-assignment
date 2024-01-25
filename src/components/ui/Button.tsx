import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

const variants = {
    primary: 'bg-cyan-500 text-white hover:bg-cyan-500',
    outline: 'border border-[1.4px] border-cyan-500 text-cyan-500 hover:bg-gray-50'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof variants
}

export type Ref = HTMLButtonElement

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { className, variant = 'primary', ...props },
    ref
) {
    return (
        <button
            className={cn(
                'w-[48px] h-[48px] rounded center',
                'disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300',
                variants[variant],
                className
            )}
            ref={ref}
            {...props}
        >
            {props.children}
        </button>
    )
})

Button.displayName = 'Button'

export default Button
