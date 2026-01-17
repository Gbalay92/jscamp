import styles from './Profile.module.css';
import profilePicture from '../assets/profilePicture.jpg';

export default function ProfilePage( ) {
    return (
        <div className={styles.ProfileContainer}>
            <div className={styles.ProfileCard}>
                <img src={profilePicture} alt="Profile" className={styles.ProfileImage} />
                <h3>Example User</h3>
                <div className={styles.ProfileData}>
                    <p>Email: example@example.com</p>
                    <p>Member since: January 2022</p>
                </div>
            </div>
        </div>
    )
}