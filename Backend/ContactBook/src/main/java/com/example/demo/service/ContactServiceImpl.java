package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Contact;
import com.example.demo.repository.ContactRepository;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public Contact getContactById(int id) {
        Optional<Contact> opt = contactRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Contact updateContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public void deleteContactById(int id) {
        contactRepository.deleteById(id);
    }
}
