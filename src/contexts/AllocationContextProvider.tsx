import { createContext, useState } from 'react'
import { Allocation } from '../models/types'

export const AllocationContext = createContext<AllocationContextType>({
    roomAllocations: [],
    setRoomAllocations: () => {}
})

type Props = {
    children: React.ReactNode
}

type AllocationContextType = {
    roomAllocations: Allocation[]
    setRoomAllocations: React.Dispatch<React.SetStateAction<Allocation[]>>
}

export default function AllocationContextProvider({ children }: Props) {
    const [roomAllocations, setRoomAllocations] = useState<Allocation[]>([])

    const contextValue: AllocationContextType = {
        roomAllocations,
        setRoomAllocations
    }

    return <AllocationContext.Provider value={contextValue}>{children}</AllocationContext.Provider>
}
