import { TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface QuantityInputProps {
    value: number;
    onChange: (count: number) => void;
    min?: number;
    max?: number;
    size?: 'small' | 'medium';
    sx?: object;
    disabled?: boolean;
}

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 999999;

export const QuantityInput: FC<QuantityInputProps> = ({
    value,
    onChange,
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
    size = 'small',
    sx,
    disabled = false,
}) => {
    const [inputValue, setInputValue] = useState<string>(() => String(value));

    useEffect(() => {
        setInputValue((prev) => (prev === '' ? prev : String(value)));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '');
        setInputValue(raw === '' ? '' : raw);
        if (raw === '') return;
        const n = parseInt(raw, 10);
        if (!Number.isNaN(n)) {
            const clamped = Math.min(max, Math.max(min, n));
            onChange(clamped);
        }
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setInputValue(String(min));
            onChange(min);
        } else {
            const n = parseInt(inputValue, 10);
            if (Number.isNaN(n) || n < min) {
                setInputValue(String(min));
                onChange(min);
            } else if (n > max) {
                setInputValue(String(max));
                onChange(max);
            }
        }
    };

    return (
        <TextField
            type="text"
            inputMode="numeric"
            size={size}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={String(min)}
            disabled={disabled}
            slotProps={{
                input: {
                    sx: { textAlign: 'center' },
                    inputProps: { pattern: '[0-9]*' },
                },
            }}
            sx={{ width: 64, ...sx }}
        />
    );
};
