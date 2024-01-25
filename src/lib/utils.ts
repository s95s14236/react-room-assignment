import { type ClassValue, clsx } from 'clsx'
import { type TouchEvent as ReactTouchEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { Coordinates, LongPressEvent } from '../models/types'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Get current touch event position
 */
export function getCurrentPosition<Target>(event: LongPressEvent<Target>): Coordinates {
    if (isTouchEvent(event)) {
        return {
            x: event.touches[0].pageX,
            y: event.touches[0].pageY
        }
    }
    return null
}

/**
 * Checks if the event is a touch event
 */
export function isTouchEvent<Target>(event: LongPressEvent<Target>): event is ReactTouchEvent<Target> {
    const { nativeEvent } = event
    return window.TouchEvent ? nativeEvent instanceof TouchEvent : 'touches' in nativeEvent
}
