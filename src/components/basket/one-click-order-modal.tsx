import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CREATE_ORDER_REQUEST } from '@/lib/reducers';
import { CloseSvg } from '@/lib/icon-svg';
import styles from './one-click-order-modal.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { OrderItems } from '@/lib/models';

interface OneClickOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: OrderItems[];
}

export const OneClickOrderModal: React.FC<OneClickOrderModalProps> = ({ isOpen, onClose, items }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, isAuth } = useAppSelector((state) => state.auth);
    const { selectedCity } = useAppSelector((state) => state.app);
    
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isAuth && user) {
            setFullName(user.fullName || '');
            setPhone(user.phoneNumber || '');
            setEmail(user.email || '');
        }
    }, [isAuth, user]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!fullName.trim()) newErrors.fullName = 'Введите Ф.И.О.';
        if (!phone.trim()) newErrors.phone = 'Введите номер телефона';
        if (!email.trim()) newErrors.email = 'Введите электронный адрес';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            dispatch(CREATE_ORDER_REQUEST({
                fullName,
                phone,
                email,
                comment,
                city: user?.city || selectedCity,
                pickupPointId: null,
                deliveryAddress: null,
                items: items
            }));
            onClose();
            router.push('/basket');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.modal}>
                    <motion.div
                        className={styles.modal__overlay}
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.div
                        className={styles.container}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <button className={styles.close} onClick={onClose}>
                            <CloseSvg />
                        </button>
                        
                        <div className={styles.header}>
                            <div style={{ marginBottom: '20px' }}>
                                <Image src={"/images/Logo.png"} alt="Логотип" width={200} height={42} style={{ objectFit: 'contain' }}/>
                            </div>
                            <h2 className={styles.title}>Купить в 1 клик</h2>
                            <p className={styles.subtitle}>Оставьте ваши контакты, и наш менеджер свяжется с вами для уточнения деталей заказа.</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.input_group}>
                                <label className={styles.label}>Ф.И.О. *</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className={`${styles.input} ${errors.fullName ? styles.input_error : ''}`}
                                    placeholder="Иванов Иван Иванович"
                                />
                                {errors.fullName && <span className={styles.error_text}>{errors.fullName}</span>}
                            </div>

                            <div className={styles.input_group}>
                                <label className={styles.label}>Телефон *</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`${styles.input} ${errors.phone ? styles.input_error : ''}`}
                                    placeholder="+7 (999) 000-00-00"
                                />
                                {errors.phone && <span className={styles.error_text}>{errors.phone}</span>}
                            </div>

                            <div className={styles.input_group}>
                                <label className={styles.label}>Электронный адрес *</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`${styles.input} ${errors.email ? styles.input_error : ''}`}
                                    placeholder="example@mail.ru"
                                />
                                {errors.email && <span className={styles.error_text}>{errors.email}</span>}
                            </div>

                            <div className={styles.input_group}>
                                <label className={styles.label}>Комментарий к заказу</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className={styles.textarea}
                                    placeholder="Напишите ваши пожелания к заказу"
                                    rows={4}
                                />
                            </div>

                            <button type="submit" className={styles.submit_button}>
                                Отправить
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
