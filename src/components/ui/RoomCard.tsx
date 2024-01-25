import { useCallback } from 'react'
import useAllocationContext from '../../hooks/useAllocationContext'
import CustomInputNumber from '../CustomInputNumber'
import { cn } from '../../lib/utils'

export type RoomCardProps = {
    isAddDisabled: boolean
    roomIndex: number
}

export default function RoomCard({ isAddDisabled, roomIndex }: RoomCardProps) {
    const { roomAllocations, setRoomAllocations } = useAllocationContext()
    const { adult, child } = roomAllocations[roomIndex]
    const total = +adult + +child

    const onAuditChange = useCallback(
        (event) => {
            setRoomAllocations((prev) => {
                const newRoomAllocations = [...prev]
                newRoomAllocations[roomIndex] = {
                    ...newRoomAllocations[roomIndex],
                    adult: +event.target.value
                }
                return newRoomAllocations
            })
        },
        [roomIndex, setRoomAllocations]
    )

    const onChildChange = useCallback(
        (event) => {
            setRoomAllocations((prev) => {
                const newRoomAllocations = [...prev]
                newRoomAllocations[roomIndex] = {
                    ...newRoomAllocations[roomIndex],
                    child: +event.target.value
                }
                return newRoomAllocations
            })
        },
        [roomIndex, setRoomAllocations]
    )

    return (
        <div className={cn('w-full space-y-3 pb-4', roomIndex !== roomAllocations.length - 1 && 'border-b-[1px]')}>
            <p className='my-3'>房間：{total}人</p>
            <div className='w-full flex justify-between'>
                <div>
                    <label className='text-sm'>大人</label>
                    <p className='text-sm text-gray-400'>年齡 20+</p>
                </div>
                <CustomInputNumber
                    min={1}
                    max={isAddDisabled ? total - child : 4 - child}
                    step={1}
                    value={1}
                    name={`CustomInputNumberAdult_${roomIndex}}`}
                    onChange={onAuditChange}
                />
            </div>
            <div className='w-full flex justify-between'>
                <label className='text-sm'>小孩</label>
                <CustomInputNumber
                    min={0}
                    max={isAddDisabled ? total - adult : 4 - adult}
                    step={1}
                    value={0}
                    name={`CustomInputNumberAdult_${roomIndex}}`}
                    onChange={onChildChange}
                />
            </div>
        </div>
    )
}

RoomCard.displayName = 'RoomCard'
