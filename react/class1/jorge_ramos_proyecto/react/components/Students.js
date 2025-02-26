"use client"

import { useState, useEffect } from "react"
import { getStudents } from "../services/api"

const Students = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents()
        setStudents(data)
      } catch (error) {
        console.error("Failed to fetch students:", error)
      }
    }

    fetchStudents()
  }, [])

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "10px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
  }

  return (
    <div>
      <h2>Students</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>DNI</th>
            <th style={styles.th}>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.last_name}</td>
              <td style={styles.td}>{student.dni}</td>
              <td style={styles.td}>{new Date(student.date_of_birth).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Students

