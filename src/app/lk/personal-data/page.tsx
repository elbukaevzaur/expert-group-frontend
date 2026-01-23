"use client";

import styles from "@/app/lk/personal-data/personal-data.module.css";
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
          placeholder="Имя"
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="text"
          placeholder="Отчество"
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="text"
          placeholder="Фамилия"
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="email"
          placeholder="Email"
          readOnly={isEdit}
        />
      </div>
      <button onClick={editData} className={styles.personal_data__button}>
        {isEdit ? "Редактировать" : "Принять"}
      </button>
    </div>
  );
}
