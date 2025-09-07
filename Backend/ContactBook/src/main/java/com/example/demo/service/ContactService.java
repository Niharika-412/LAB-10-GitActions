package com.example.demo.service;

import java.util.List;
import com.example.demo.entity.Contact;

public interface ContactService {
    
    Contact addContact(Contact contact);
    
    List<Contact> getAllContacts();
    
    Contact getContactById(int id);
    
    Contact updateContact(Contact contact);
    
    void deleteContactById(int id);
}
