import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import config from "./config.js";

const ContactBook = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedContact, setFetchedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/contactapi`;

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const fetchAllContacts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setContacts(res.data);
    } catch (error) {
      setMessage("Failed to fetch contacts.");
    }
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in contact) {
      if (!contact[key] || contact[key].toString().trim() === "") {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addContact = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, contact);
      setMessage("Contact added successfully.");
      fetchAllContacts();
      resetForm();
    } catch (error) {
      setMessage("Error adding contact.");
    }
  };

  const updateContact = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, contact);
      setMessage("Contact updated successfully.");
      fetchAllContacts();
      resetForm();
    } catch (error) {
      setMessage("Error updating contact.");
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllContacts();
    } catch (error) {
      setMessage("Error deleting contact.");
    }
  };

  const getContactById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedContact(res.data);
      setMessage("");
    } catch (error) {
      setFetchedContact(null);
      setMessage("Contact not found.");
    }
  };

  const handleEdit = (c) => {
    setContact(c);
    setEditMode(true);
    setMessage(`Editing contact with ID ${c.id}`);
  };

  const resetForm = () => {
    setContact({
      id: "",
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    setEditMode(false);
  };

  return (
    <div className="contact-container">
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>Contact Book</h2>

      <div>
        <h3>{editMode ? "Edit Contact" : "Add Contact"}</h3>
        <div className="form-grid">
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={contact.id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={contact.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addContact}>
              Add Contact
            </button>
          ) : (
            <>
              <button className="btn-green" onClick={updateContact}>
                Update Contact
              </button>
              <button className="btn-gray" onClick={resetForm}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Contact By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getContactById}>
          Fetch
        </button>

        {fetchedContact && (
          <div>
            <h4>Contact Found:</h4>
            <pre>{JSON.stringify(fetchedContact, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Contacts</h3>
        {contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(contact).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    {Object.keys(contact).map((key) => (
                      <td key={key}>{c[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(c)}>
                          Edit
                        </button>
                        <button className="btn-red" onClick={() => deleteContact(c.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactBook;
