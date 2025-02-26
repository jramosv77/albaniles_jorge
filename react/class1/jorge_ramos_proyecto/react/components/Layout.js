import { Outlet, Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Layout = () => {
  const { user, logout } = useAuth()

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    sidebar: {
      width: "200px",
      backgroundColor: "#f0f0f0",
      padding: "20px",
    },
    main: {
      flex: 1,
      padding: "20px",
    },
    nav: {
      listStyle: "none",
      padding: 0,
    },
    navItem: {
      marginBottom: "10px",
    },
    link: {
      textDecoration: "none",
      color: "#333",
    },
    button: {
      background: "none",
      border: "none",
      color: "#333",
      cursor: "pointer",
      fontSize: "16px",
      padding: 0,
    },
  }

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <nav>
          <ul style={styles.nav}>
            <li style={styles.navItem}>
              <Link to="/profile" style={styles.link}>
                Profile
              </Link>
            </li>
            {user && user.type === "admin" && (
              <li style={styles.navItem}>
                <Link to="/users" style={styles.link}>
                  Users
                </Link>
              </li>
            )}
            {user && user.type === "teacher" && (
              <li style={styles.navItem}>
                <Link to="/students" style={styles.link}>
                  Students
                </Link>
              </li>
            )}
            <li style={styles.navItem}>
              <button onClick={logout} style={styles.button}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

