import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';

export const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  const updateProfile = (e) => {
    e.preventDefault();
    setUpdating(true);
  };

  return (
    <div className={styles.settingsBackground}>
      <div className={styles.settingsContainer}>
        <div className={styles.userDP}>
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
          />
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}> Email </span>
          <span className={styles.fieldValue}>{auth.user?.email}</span>
        </div>

        {!editMode && (
          <>
            <div className={styles.field}>
              <span className={styles.fieldLabel}> Name </span>
              <span className={styles.fieldValue}>{auth.user?.name}</span>
            </div>

            <div className={styles.editButtons}>
              <button
                className={styles.editButton}
                onClick={() => setEditMode(true)}
              >
                {' '}
                Edit Profile{' '}
              </button>
            </div>
          </>
        )}

        {editMode && (
          <>
            <form>
              <div className={styles.field}>
                <span className={styles.fieldLabel}> Name </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="new-name"
                />
              </div>
              <div className={styles.field}>
                <span className={styles.fieldLabel}> New Password </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className={styles.field}>
                <span className={styles.fieldLabel}> Confirm Password </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className={styles.editButtons}>
                <button
                  className={
                    updating ? styles.updateButtonUpdating : styles.updateButton
                  }
                  onClick={updateProfile}
                >
                  {' '}
                  {!updating ? 'Update' : 'Updating...'}
                </button>
                <button
                  className={styles.editButton}
                  onClick={() => setEditMode(false)}
                >
                  {' '}
                  Go Back{' '}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
