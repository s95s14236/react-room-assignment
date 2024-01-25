import { useContext } from 'react'
import { AllocationContext } from '../contexts/AllocationContextProvider'

export default function useAllocationContext() {
    const context = useContext(AllocationContext)
    return context
}
