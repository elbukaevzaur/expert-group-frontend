"use client";

import styles from "@/app/lk/change-password/change-password.module.css";
import { useState } from "react";


export default function Page() {
  const [isEdit, setIsEdit] = useState(true);

  const editData = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className={styles.personal_data}>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="text"
          placeholder="Старый пароль"
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="text"
          placeholder="Новый пароль"
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="text"
          placeholder="Повторить пароль"
          readOnly={isEdit}
        />
      </div>
      <button onClick={editData} className={styles.personal_data__button}>
        {isEdit ? "Редактировать" : "Принять"}
      </button>
    </div>
  );
}
