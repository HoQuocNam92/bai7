import React from 'react'
import style from './Skeleton.module.scss'
import clsx from 'clsx';
function Skeleton({ value }) {
    console.log("Check value", value)
    const { card, loading, card_image, card_text, text_title, text_description, price } = style;
    return (
        <>
            <div className={clsx(card, loading)}>
                <div className={card_image}>
                    <img src={value} alt="" />
                </div>
                <div className={card_text}>
                    <h3 className={text_title}>Iphone 16 pro max</h3>
                    <p className={text_description}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <h4 className={price}>
                        19.999.000 VND
                    </h4>
                </div>
            </div>
        </>
    )
}

export default Skeleton