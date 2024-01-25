import { useEffect } from 'react'
import useAllocationContext from '../../hooks/useAllocationContext'
import { RoomAllocationProps } from '../RoomAllocation'
import { Allocation } from '../../models/types'
import RoomCard from './RoomCard'

export default function Allocations({ guest, room, onChange }: RoomAllocationProps) {
    const { roomAllocations, setRoomAllocations } = useAllocationContext()
    const assignedPersons = roomAllocations.reduce((acc, cur) => acc + +cur.adult + +cur.child, 0)

    useEffect(() => {
        setRoomAllocations(Array.from({ length: room }, () => ({ adult: 1, child: 0 })))
    }, [room, setRoomAllocations])

    useEffect(() => {
        onChange(roomAllocations)
    }, [roomAllocations, onChange])

    return (
        <div className=' w-96 p-2'>
            <div>
                住客人數： {guest} 人 / {room} 房
            </div>
            <div className='w-full bg-cyan-50 border-cyan-300 border-[1px] rounded text-gray-600 text-sm p-3 my-2'>
                尚未分配人數：{guest - assignedPersons}人
            </div>
            {roomAllocations.map((allocation: Allocation, index: number) => (
                <RoomCard key={index} roomIndex={index} isAddDisabled={guest <= assignedPersons} />
            ))}
        </div>
    )
}
