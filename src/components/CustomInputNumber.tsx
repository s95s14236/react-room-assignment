import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import LongPressButton from './ui/LongPressButton'

type CustomInputNumberProps = {
    min: number
    max: number
    step: number
    name: string
    value?: number
    disabled?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export default function CustomInputNumber({
    min = 0,
    max = 9999,
    step = 1,
    value = 0,
    name,
    onChange,
    onBlur,
    disabled = false
}: CustomInputNumberProps) {
    const [inputValue, setInputValue] = useState<number | string>(value)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleIncrease = useCallback(() => {
        setInputValue((prev) => {
            const newValue = +prev + step
            if (newValue > max) {
                return max
            }
            return newValue
        })
    }, [max, step])

    const handleDecrease = useCallback(() => {
        setInputValue((prev) => {
            const newValue = +prev - step
            if (newValue < min) {
                return min
            }
            return newValue
        })
    }, [min, step])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        let newValue: number | string

        if (value === '') {
            newValue = ''
        } else if (+value < min) {
            newValue = min
        } else if (+value > max) {
            newValue = max
        } else {
            newValue = +value
        }
        setInputValue(newValue)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const currentTarget = event.currentTarget
        // 在下一個event loop判斷, 確保activeElement不受其他事件影響
        setTimeout(() => {
            if (inputValue === '') {
                setInputValue(0 > min && 0 < max ? 0 : min)
            }
            // 如果點擊焦點的activeElement不在div中觸發onBlur
            if (!currentTarget.contains(document.activeElement)) {
                event.target.name = name
                event.target.value = inputValue.toString()
                onBlur && onBlur(event)
            }
        }, 0)
    }

    useEffect(() => {
        const event: ChangeEvent<HTMLInputElement> = {} as ChangeEvent<HTMLInputElement>
        event.target = inputRef.current
        event.target.name = name
        event.target.value = inputValue.toString()
        onChange && onChange(event)
    }, [inputValue, name, onChange])

    return (
        <div className='flex gap-[8px]' onBlur={handleBlur}>
            <LongPressButton variant='outline' callback={handleDecrease} disabled={+inputValue <= min}>
                -
            </LongPressButton>
            <input
                ref={inputRef}
                className='w-[48px] h-[48px] text-[16px] rounded text-center border-gray-300 border-[1px] outline-none'
                type='number'
                min={min}
                max={max}
                step={step}
                name={name}
                value={inputValue}
                disabled={disabled}
                onChange={handleChange}
                onInput={(e) => console.log(e.currentTarget.value)}
            />
            <LongPressButton variant='outline' callback={handleIncrease} disabled={+inputValue >= max}>
                +
            </LongPressButton>
        </div>
    )
}

CustomInputNumber.displayName = 'CustomInputNumber'
