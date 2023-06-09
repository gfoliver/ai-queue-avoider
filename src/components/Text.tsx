import React, { PropsWithChildren } from 'react';
import { FiUser, FiAperture } from 'react-icons/fi';

interface TextProps extends PropsWithChildren {
    isAnswer?: boolean;
    isTip?: boolean;
}

const Text: React.FC<TextProps> = ({ isAnswer, isTip, children }) => {
    const bgClass = isAnswer ? 'bg-[#0C606C]' : 'bg-[#472885]';
    const iconClass = isAnswer ? 'mr-8 ' : 'ml-8 ';
    const arrowClass = isAnswer ? 'right-full translate-x-1/2 ' : 'left-full -translate-x-1/2 ';

    return (
        <div className={"wrapper flex items-start justify-end mb-6 " + (isAnswer ? 'flex-row-reverse ' : '')}>
            <div className={"box max-w-lg relative flex-grow rounded-lg text-light p-4 pt-3 " + bgClass}>
                <div className={"arrow absolute w-4 h-4 rotate-45 top-4 " + arrowClass + bgClass} />
                {children}
            </div>
            <div className={"rounded-full p-4 " + iconClass + bgClass}>
                {isAnswer ? <FiAperture className="text-light" /> : <FiUser className="text-light" />}
            </div>
        </div>
    );
}

export default Text;