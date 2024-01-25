import { memo, useEffect, useRef } from 'react'
import useLongPress from '../../hooks/useLongPress'
import Button, { ButtonProps } from './Button'

interface LongPressButtonProps extends ButtonProps {
    callback: () => void
    interval?: number
}

function LongPressButton({ variant, callback, interval, ...props }: LongPressButtonProps) {
    const onLongPress = useLongPress(callback, interval)
    const btnRef = useRef<HTMLButtonElement>()

    useEffect(() => {
        // disable mobile 長按contextmenu事件 (導致長按失效)
        const ref = btnRef.current
        ref.addEventListener('contextmenu', (event) => {
            event.preventDefault()
        })
        return () => {
            ref.addEventListener('contextmenu', (event) => {
                event.preventDefault()
            })
        }
    }, [])

    return <Button variant={variant} ref={btnRef} {...onLongPress} {...props}></Button>
}

LongPressButton.displayName = 'LongPressButton'

export default memo(LongPressButton)
