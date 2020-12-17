import * as React from 'react';
export interface CheckableTagProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
declare const CheckableTag: React.FC<CheckableTagProps>;
export default CheckableTag;
