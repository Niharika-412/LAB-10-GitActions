package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Contact;
import com.example.demo.service.ContactService;

@RestController
@RequestMapping("/contactapi")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/")
    public String home() {
        return "Contact Management System Backend Running 🚀";
    }

    // Create
    @PostMapping("/add")
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
        Contact savedContact = contactService.addContact(contact);
        return new ResponseEntity<>(savedContact, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping("/all")
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    // Read by id
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getContactById(@PathVariable int id) {
        Contact contact = contactService.getContactById(id);
        if (contact != null) {
            return new ResponseEntity<>(contact, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Contact with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Update
    @PutMapping("/update")
    public ResponseEntity<?> updateContact(@RequestBody Contact contact) {
        Contact existing = contactService.getContactById(contact.getId());
        if (existing != null) {
            Contact updatedContact = contactService.updateContact(contact);
            return new ResponseEntity<>(updatedContact, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Contact with ID " + contact.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable int id) {
        Contact existing = contactService.getContactById(id);
        if (existing != null) {
            contactService.deleteContactById(id);
            return new ResponseEntity<>("Contact with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Contact with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
