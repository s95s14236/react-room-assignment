import { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react'

export type Coordinates = {
    x: number
    y: number
} | null

export type LongPressEvent<Target = Element> = ReactMouseEvent<Target> | ReactTouchEvent<Target>

export type Allocation = {
    adult: number
    child: number
}
