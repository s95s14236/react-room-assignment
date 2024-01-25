import CustomInputNumber from './components/CustomInputNumber'
import RoomAllocation from './components/RoomAllocation'

export default function App() {
    return (
        <div className='w-screen h-screen md:flex justify-evenly'>
            <div className='center flex-col'>
                <h1 className='my-5'>CustomInputNumber</h1>
                <CustomInputNumber
                    min={0}
                    max={10}
                    step={1}
                    name='CustomInputNumber'
                    onChange={(event) => {
                        console.log('CustomInputNumber onChange name=', event.target.name)
                        console.log('CustomInputNumber onChange value=', event.target.value)
                    }}
                    onBlur={(event) => {
                        console.log('CustomInputNumber onBlur name=', event.target.name)
                        console.log('CustomInputNumber onBlur value=', event.target.value)
                    }}
                    disabled={false}
                />
            </div>
            <div className='center flex-col'>
                <h1 className='my-5'>RoomAllocation</h1>
                <RoomAllocation
                    guest={10}
                    room={3}
                    onChange={(result) => {
                        console.log('RoomAllocation onChange result=', result)
                    }}
                />
            </div>
        </div>
    )
}
