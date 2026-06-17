import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    email: "",
    glucose: "",
    haemoglobin: "",
    cholesterol: "",
  });

  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/patients"
      );
      setPatients(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      full_name: "",
      dob: "",
      email: "",
      glucose: "",
      haemoglobin: "",
      cholesterol: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://127.0.0.1:8000/patients/${editingId}`,
          {
            ...formData,
            glucose: Number(formData.glucose),
            haemoglobin: Number(formData.haemoglobin),
            cholesterol: Number(formData.cholesterol),
          }
        );

        alert("Patient Updated Successfully");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/patients",
          {
            ...formData,
            glucose: Number(formData.glucose),
            haemoglobin: Number(formData.haemoglobin),
            cholesterol: Number(formData.cholesterol),
          }
        );

        alert("Prediction: " + response.data.remarks);
      }

      fetchPatients();
      clearForm();

    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const editPatient = (patient) => {
    setFormData({
      full_name: patient.full_name,
      dob: patient.dob,
      email: patient.email,
      glucose: patient.glucose,
      haemoglobin: patient.haemoglobin,
      cholesterol: patient.cholesterol,
    });

    setEditingId(patient.id);
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/patients/${id}`
      );

      fetchPatients();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>🏥 Health Prediction System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="number"
          name="glucose"
          placeholder="Glucose"
          value={formData.glucose}
          onChange={handleChange}
        />

        <input
          type="number"
          name="haemoglobin"
          placeholder="Haemoglobin"
          value={formData.haemoglobin}
          onChange={handleChange}
        />

        <input
          type="number"
          name="cholesterol"
          placeholder="Cholesterol"
          value={formData.cholesterol}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="submit-btn"
        >
          {editingId ? "Update Patient" : "Predict & Save"}
        </button>

        {editingId && (
          <button
            className="cancel-btn"
            type="button"
            onClick={clearForm}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h2>📋 Patient Records</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.full_name}</td>
              <td>{patient.email}</td>
              <td>{patient.remarks}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => editPatient(patient)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deletePatient(patient.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;