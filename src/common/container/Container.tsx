import React, {FC} from "react";
import s from './Container.module.css'

type ContainerPropsType = {
    buttons: Array<JSX.Element>;
};

export const Container: FC<ContainerPropsType> = ({ children, buttons }) => {
    return (
        <div className={s.container}>
            <div className={s.topBlock}>{children}</div>
            <div className={s.bottomBlock}>
                {buttons.map((button) => button)}
            </div>
        </div>
    );
};