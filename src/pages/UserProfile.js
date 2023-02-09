import styles from '../styles/profile.module.css';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserInfo, unFriend } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader';

export const UserProfile = () => {
  const auth = useAuth();

  // user whose profile is open
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [addRemoveProcess, setAddRemoveProcess] = useState(false);

  // fetching userId of the user whose profile is open from the url
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      // fetching user from the API using the userId
      const response = await fetchUserInfo(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('Could Not fetch the User');
        return <Navigate to="/" />;
      }

      setLoading(false);
    };

    getUser();
  }, [userId]);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  // checking if the logged in user is friend with the person whose profile is open
  const checkIfFriends = () => {
    const friends = auth.user.friendships;

    const friendsIds = friends.map((friend) => friend.to_user._id);
    const index = friendsIds.indexOf(userId);

    return index !== -1;
  };

  const handleAddFriend = async () => {
    setAddRemoveProcess(true);

    // adding friend using the API
    const response = await addFriend(userId);

    if (response.success) {
      // updating friends in our local state
      auth.updateUserFriends(true, response.data.friendship);
      toast.success('Friend Added!');
    } else {
      toast.error(response.message);
    }
    setAddRemoveProcess(false);
  };

  const handleRemoveFriend = async () => {
    setAddRemoveProcess(true);

    // removing friend using the API
    const response = await unFriend(userId);

    if (response.success) {
      // updating friends in our local state
      auth.updateUserFriends(false, userId);
      toast.success('Friend Removed!');
    } else {
      toast.error(response.message);
    }
    setAddRemoveProcess(false);
  };

  return (
    <div className={styles.profileBackground}>
      <div className={styles.profileContainer}>
        <div className={styles.userDP}>
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}> Email </span>
          <span className={styles.fieldValue}>{user.email}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.fieldLabel}> Name </span>
          <span className={styles.fieldValue}>{user.name}</span>
        </div>
        {checkIfFriends() ? (
          <button
            onClick={handleRemoveFriend}
            className={
              addRemoveProcess
                ? styles.friendButtonInProcess
                : styles.friendButton
            }
          >
            {addRemoveProcess ? 'Removing Friend...' : 'Remove Friend'}
          </button>
        ) : (
          <button
            onClick={handleAddFriend}
            className={
              addRemoveProcess
                ? styles.friendButtonInProcess
                : styles.friendButton
            }
          >
            {addRemoveProcess ? 'Adding Friend...' : 'Add Friend'}
          </button>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
      />
    </div>
  );
};
