'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

 /** Models Section */

const Contact = use('App/Models/Contact')
const Quote = use('App/Models/Quote')
const AdonisTestOne = use('App/Models/AdonisTestOne')
const Database = use('Database')

const Mail = use('Mail');
/** Packages Section */
const ENV = use("Env");
const Helpers = use("Helpers");
const Drive = use("Drive");

const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const { log } = require('console')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {

  async postContact ({ request, response, view }) {
    try {
      console.log('start to contact');
      
      const { name, email, phone, subject, message  } = request.input('contactInfo')
      // Adding Contact Us
      const contactInfo = new Contact()
      contactInfo.name = name
      contactInfo.email = email
      contactInfo.phone = phone
      contactInfo.subject = subject
      contactInfo.message = message
      await contactInfo.save()
   
      // Prepare data to send to the email template
      const emailData = {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        subject: contactInfo.subject,
        message: contactInfo.message,
      };
      // send password user email
      await Mail.send("emails.contact", emailData, (message) => {
        message
          .to("info.rmmovingexpress@gmail.com")
          .from("office@rmmovingexpress.com", "RM Moving Express")
          .subject("New Contact Form Submission");
      });
       console.log('contact successfully done');
    
      // returning response
      return ExceptionsServices.resourceSendSuccessful('Contact')
    } catch (contactError) {
      console.log(contactError)
    }
  }

  async postQuote ({ request, response, view }) {
    try {
    console.log('start quote mail');
    
      const { firstName, lastName, involved, numberOfHelper, sizeOfMove, interested, message, phone, email, deliveryAddress, collectionAddress, typeOfMove   } = request.input('quoteInfo')

       // check missing First Name
      if (!firstName) {
        return ExceptionsServices.resourceMissing('First Name')
      }
       // check missing Last Name
      if (!lastName) {
        return ExceptionsServices.resourceMissing('Last Name')
      }
       // check missing Involved
      if (!involved) {
        return ExceptionsServices.resourceMissing('Involved')
      }
       // check missing Number Of Helper
      if (!numberOfHelper) {
        return ExceptionsServices.resourceMissing('Number Of Helper')
      }
      // check missing Size Of Move
      if (!sizeOfMove) {
        return ExceptionsServices.resourceMissing('Size Of Move')
      }
        // check missing Message
      if (!message) {
        return ExceptionsServices.resourceMissing('Message')
      }
        // check missing phone
      if (!phone) {
        return ExceptionsServices.resourceMissing('phone')
      }
        // check missing email
      if (!email) {
        return ExceptionsServices.resourceMissing('email')
      }
        // check missing Delivery Address
      if (!deliveryAddress) {
        return ExceptionsServices.resourceMissing('Delivery Address')
      }
        // check missing collection Address
      if (!collectionAddress) {
        return ExceptionsServices.resourceMissing('collectionAddress')
      }
        // check missing Type Of Move
      if (!typeOfMove) {
        return ExceptionsServices.resourceMissing('Type Of Move')
      }
     
      // // Adding Quote
      const auoteInfo = new Quote()
      auoteInfo.firstName = firstName
      auoteInfo.lastName = lastName
      auoteInfo.involved = involved
      auoteInfo.numberOfHelper = numberOfHelper
      auoteInfo.sizeOfMove = sizeOfMove
      auoteInfo.interested = interested
      auoteInfo.message = message
      auoteInfo.phone = phone
      auoteInfo.email = email
      auoteInfo.deliveryAddress = deliveryAddress
      auoteInfo.collectionAddress = collectionAddress
      auoteInfo.typeOfMove = typeOfMove
      await auoteInfo.save()
   
      // Prepare data to send to the email template
      const emailData = {
        name: firstName + ' ' + lastName,
        involved: involved,
        numberOfHelper: numberOfHelper,
        sizeOfMove: sizeOfMove,
        interested: interested,
        deliveryAddress: deliveryAddress,
        typeOfMove: typeOfMove,
        email: email,
        phone: phone,
        collectionAddress: collectionAddress,
        message: message,
      };
      // console.log('asss');
      
      // send password user email
      await Mail.send("emails.quote", emailData, (message) => {
        message
          .to("mizandev000@gmail.com")
          // .to("info.rmmovingexpress@gmail.com")
          .from("office@rmmovingexpress.com", "RM Moving Express Quotation")
          .subject("New Quote Form Submission");
      });

      console.log('Quote mail sending successfully');
      
    
      // returning response
      return ExceptionsServices.resourceSendSuccessful('Quote')
    } catch (contactError) {
      console.log(contactError)
    }
  }

 
  /**
   * Render a form to be used for creating a new contact.
   * GET contacts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing contact.
   * GET contacts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ContactController
