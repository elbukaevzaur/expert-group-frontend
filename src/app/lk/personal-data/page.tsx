"use client";

import styles from "@/app/lk/personal-data/personal-data.module.css";
import { useEffect, useState } from "react";
import { getMeRequest } from "@/lib/http/authRequest";
import { updateProfileRequest, changePasswordRequest } from "@/lib/http/userRequest";
import { Eye, EyeOff } from "lucide-react";


export default function Page() {
  const [isEdit, setIsEdit] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [originalData, setOriginalData] = useState({ fullName: "", email: "", phoneNumber: "" });
  const [isLoading, setIsLoading] = useState(true);

  // Message states
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // Password change states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const showPasswordMessage = (text: string, type: 'success' | 'error') => {
    setPasswordMessage({ text, type });
    setTimeout(() => setPasswordMessage(null), 5000);
  };

  const fetchUserData = async () => {
    try {
      const response = await getMeRequest();
      if (response.data) {
        const data = {
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || ""
        };
        setFullName(data.fullName);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setOriginalData(data);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfileRequest({
        fullName,
        email,
        phoneNumber
      });
      setOriginalData({ fullName, email, phoneNumber });
      setIsEdit(true);
      showMessage("Данные успешно обновлены", "success");
    } catch (error: any) {
      console.error("Failed to update profile", error);
      let errorMessage = "Ошибка при обновлении данных";
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error && typeof data.error === 'string') {
          errorMessage = data.error;
        }
      }
      showMessage(errorMessage, "error");
    }
  };

  const handleCancel = () => {
    setFullName(originalData.fullName);
    setEmail(originalData.email);
    setPhoneNumber(originalData.phoneNumber);
    setIsEdit(true);
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showPasswordMessage("Пожалуйста, заполните все поля пароля", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showPasswordMessage("Новые пароли не совпадают", "error");
      return;
    }

    try {
      await changePasswordRequest({
        oldPassword,
        newPassword
      });
      showMessage("Пароль успешно изменен", "success");
      setIsChangingPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Failed to change password", error);
      let errorMessage = "Ошибка при смене пароля. Проверьте старый пароль.";
      if (error.response?.data) {
        const data = error.response.data;
        console.log("Error response data:", data);
        if (typeof data === 'string') {
          try {
            const parsed = JSON.parse(data);
            errorMessage = parsed.message || parsed.error || errorMessage;
          } catch (e) {
            errorMessage = data;
          }
        } else {
          errorMessage = data.message || data.error || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      showPasswordMessage(errorMessage, "error");
    }
  };

  const editData = () => {
    if (!isEdit) {
      handleSave();
    } else {
      setIsEdit(false);
    }
  };

  if (isLoading) {
    return <div className={styles.personal_data}>Загрузка...</div>;
  }

  return (
    <div className={styles.personal_data}>
      {message && (
        <div className={`${styles.message} ${styles[`message_${message.type}`]}`}>
          {message.text}
        </div>
      )}
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="text"
          placeholder="Ф.И.О"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__content}>
        <input
          className={styles.personal_data__input}
          type="text"
          placeholder="Номер телефона"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          readOnly={isEdit}
        />
      </div>
      <div className={styles.personal_data__buttons}>
        <button onClick={editData} className={styles.personal_data__button}>
          {isEdit ? "Редактировать" : "Принять"}
        </button>
        {!isEdit && (
          <button onClick={handleCancel} className={`${styles.personal_data__button} ${styles.personal_data__button_cancel}`}>
            Отменить
          </button>
        )}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '10px', fontFamily: 'Montserrat' }}>Смена пароля</h3>
        {passwordMessage && (
          <div className={`${styles.message} ${styles[`message_${passwordMessage.type}`]}`}>
            {passwordMessage.text}
          </div>
        )}
        {!isChangingPassword ? (
          <button 
            onClick={() => {
              setIsChangingPassword(true);
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }} 
            className={styles.personal_data__button}
            style={{ backgroundColor: '#555' }}
          >
            Изменить пароль
          </button>
        ) : (
          <div className={styles.personal_data__password_form}>
            <div className={styles.personal_data__content}>
              <div className={styles.password_input_wrapper}>
                <input
                  className={styles.personal_data__input}
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Старый пароль"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className={styles.password_toggle} 
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className={styles.personal_data__content}>
              <div className={styles.password_input_wrapper}>
                <input
                  className={styles.personal_data__input}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Новый пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className={styles.password_toggle} 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className={styles.personal_data__content}>
              <div className={styles.password_input_wrapper}>
                <input
                  className={styles.personal_data__input}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Подтвердите новый пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className={styles.password_toggle} 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className={styles.personal_data__buttons}>
              <button onClick={handleChangePassword} className={styles.personal_data__button}>
                Сохранить новый пароль
              </button>
              <button 
                onClick={() => {
                  setIsChangingPassword(false);
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }} 
                className={`${styles.personal_data__button} ${styles.personal_data__button_cancel}`}
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
