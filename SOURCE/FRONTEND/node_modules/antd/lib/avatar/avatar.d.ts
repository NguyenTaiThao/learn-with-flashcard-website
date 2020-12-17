import * as React from 'react';
import { ScreenSizeMap } from '../_util/responsiveObserve';
export interface AvatarProps {
    /** Shape of avatar, options:`circle`, `square` */
    shape?: 'circle' | 'square';
    size?: 'large' | 'small' | 'default' | number | ScreenSizeMap;
    gap?: number;
    /** Src of image avatar */
    src?: string;
    /** Srcset of image avatar */
    srcSet?: string;
    draggable?: boolean;
    /** icon to be used in avatar */
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    children?: React.ReactNode;
    alt?: string;
    onError?: () => boolean;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<unknown>>;
export default Avatar;
