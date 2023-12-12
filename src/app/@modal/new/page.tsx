'use client'
import Modal from '@/components/Modal';
import {useRouter} from 'next/navigation';
import NewPostForm from '@/components/NewPostForm';

export default function New() {
    const router = useRouter()

    return (
        <div>
            <Modal isOpen={true} onClose={() => router.back()}>
                <NewPostForm />
            </Modal>
        </div>
    )
}
