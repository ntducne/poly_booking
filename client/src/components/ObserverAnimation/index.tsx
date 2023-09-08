import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type Props = {
    children: ReactNode,
    position: {
        x?: number | string,
        y?: number | string,
        duration?: number
    }

}

export default function ObserverAnimate({ children, position }: Props) {
    const { x = 0, y = 0, duration = 0.5 } = position;

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    return (
        <div ref={ref} className='relative z-10'>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: y, x: x }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : y, x: isInView ? 0 : x }}
                transition={{ duration: duration }}
            >
                {children}
            </motion.div>
        </div>
    )
}