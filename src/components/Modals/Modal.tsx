import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '../ui/dialog'

type Props = {
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void,
    children?: React.ReactNode,
}

const Modal = ({ title, description, isOpen, onClose, children }: Props) => {
    const onChange = (open: boolean) => {
        if (!open) onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className='max-w-max'>
                <DialogHeader>
                    <DialogTitle className='tracking-wider'>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal