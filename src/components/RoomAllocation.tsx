import { Allocation } from '../models/types'
import AllocationContextProvider from '../contexts/AllocationContextProvider'
import Allocations from './ui/Allocations'

export type RoomAllocationProps = {
    guest: number
    room: number
    onChange: (allocations: Allocation[]) => void
}

export default function RoomAllocation({ guest, room, onChange }: RoomAllocationProps) {
    return (
        <AllocationContextProvider>
            <Allocations guest={guest} room={room} onChange={onChange} />
        </AllocationContextProvider>
    )
}

RoomAllocation.displayName = 'RoomAllocation'
