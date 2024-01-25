import { ButtonHTMLAttributes, useCallback, useEffect, useRef } from 'react'
import { getCurrentPosition } from '../lib/utils'
import { Coordinates, LongPressEvent } from '../models/types'

interface LongButtonEvent extends ButtonHTMLAttributes<HTMLButtonElement> {}

const useLongPress = (callback: () => void, interval = 150): LongButtonEvent => {
    const intervalRef = useRef<number>()
    const startPosition = useRef<Coordinates>(null)

    const start = useCallback(
        (event: LongPressEvent) => {
            callback()
            if (!intervalRef.current) {
                intervalRef.current = setInterval(callback, interval)
                startPosition.current = getCurrentPosition(event)
            }
        },
        [callback, interval]
    )

    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        startPosition.current = null
    }, [])

    // 處理mobile touch leave 事件
    const move = useCallback(
        (event: LongPressEvent) => {
            if (startPosition.current) {
                const currentPosition = getCurrentPosition(event)
                const movedDistance = {
                    x: Math.abs(currentPosition.x - startPosition.current.x),
                    y: Math.abs(currentPosition.y - startPosition.current.y)
                }

                if (movedDistance.x > 24 || movedDistance.y > 24) {
                    stop()
                }
            }
        },
        [stop]
    )

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [callback, stop, start, interval])

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
        onTouchMove: move
    }
}

export default useLongPress
