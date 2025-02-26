import { useAuth } from "../contexts/AuthContext"

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  const styles = {
    container: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      marginBottom: "20px",
    },
    field: {
      marginBottom: "10px",
    },
    label: {
      fontWeight: "bold",
      marginRight: "10px",
    },
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>
      <div style={styles.field}>
        <span style={styles.label}>Email:</span>
        <span>{user.email}</span>
      </div>
      <div style={styles.field}>
        <span style={styles.label}>User Type:</span>
        <span>{user.type}</span>
      </div>
      <div style={styles.field}>
        <span style={styles.label}>Active:</span>
        <span>{user.active ? "Yes" : "No"}</span>
      </div>
    </div>
  )
}

export default Profile

