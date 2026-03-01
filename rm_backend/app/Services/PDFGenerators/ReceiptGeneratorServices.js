'use strict'
/**
 ** File Name: ReceiptGeneratorServices.js
 ** Services to help the task related to PDF
 ** All Transactions (deposit, transfer, withdraw)
 ** Namespace: App/Services/PDFGenerators
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/** Modules Sections */
const Logger = use('Logger')
const moment = use('moment')
const Helpers = use('Helpers')
const Env = use('Env')
const PDFDocument = require('pdfkit')
class ReceiptGeneratorServices {
  /**
   * Creating Invoice/Receipt
   * @param {object} receiptInfo
   * @param {string} type // deposit, withdraw, internal Transfer
   * @param {string} path
   */
  async createReceipt(receiptInfo, type, path = null) {
    let doc = new PDFDocument({ size: 'A4', margin: 50 })
    this.generateHeader(doc)
    this.generateCustomerInformation(doc, receiptInfo, type)
    this.generateInvoiceTable(doc, receiptInfo, type)
    this.generateFooter(doc)
    doc.end()
    //doc.pipe(fs.createWriteStream(path)) // required to save in drive
    //Finalize document and convert to buffer array
    const pdfBuffer = await new Promise((resolve) => {
      let buffers = []
      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        let pdfData = new Uint8Array(Buffer.concat(buffers))
        resolve(pdfData)
      })
    })
    return pdfBuffer
  }
  /**
   * Generating Header Section for the PDF
   * @param {object} doc
   */
  generateHeader(doc) {
    doc
      .image(Helpers.publicPath() + '/logo.png', 50, 45, {
        width: 90,
        height: 50,
      })
      .fillColor('#444444')
      // .fontSize(20)
      // .text(`${Env.get('COMPANY_NAME', 'ForexSolver, Inc.')}`, 110, 57)
      .fontSize(10)
      .text(`${Env.get('COMPANY_NAME', 'ForexSolver, Inc.')}`, 200, 50, {
        align: 'right',
      })
      .text(`${Env.get('COMPANY_ADDRESS', 'Australia')}`, 200, 65, {
        align: 'right',
      })
      .text(moment().format('YYYY-MM-DD HH:mm:ss'), 200, 95, { align: 'right' })
      .moveDown()
  }
  /**
   * Generating Customer Information Section for the PDF
   * @param {object} doc
   * @param {object} receiptInfo
   * @param {object} type
   */
  generateCustomerInformation(doc, receiptInfo, type) {
    doc.fillColor('#444444').fontSize(20).text('Receipt', 50, 160)
    let client = receiptInfo ? receiptInfo.client : []
    let invoice = receiptInfo ? receiptInfo.transaction : []
    this.generateHr(doc, 185)
    const customerInformationTop = 200
    doc
      .fontSize(10)
      // Order Status
      .text('Order Status#:', 50, customerInformationTop)
      .font('Helvetica')
    if (type == 'deposit') {
      if (invoice.deposit_status == 1) {
        doc.fill('green').text('Approved', 150, customerInformationTop)
      } else if (invoice.deposit_status == 0) {
        doc.fill('red').text('Canceled', 150, customerInformationTop)
      }
    } else if (type == 'withdraw') {
      if (invoice.withdraw_status == 1) {
        doc.fill('green').text('Approved', 150, customerInformationTop)
      } else if (invoice.withdraw_status == 0) {
        doc.fill('red').text('Canceled', 150, customerInformationTop)
      }
    }
    doc
      .fill('#444444')
      // Transaction Method
      .text('Method:', 50, customerInformationTop + 15)
      .font('Helvetica')
      .text(invoice.method_name, 150, customerInformationTop + 15)
      // Transaction ID
      .text('ID:', 50, customerInformationTop + 30)
      .font('Helvetica')
      .text(invoice.transaction_id || 'N/A', 150, customerInformationTop + 30)
      // Reference No
      .text('Ref. No:', 50, customerInformationTop + 45)
      .font('Helvetica')
      .text(invoice.reference_no || 'N/A', 150, customerInformationTop + 45)
      // Transaction Date
      .font('Helvetica')
      .text('Time:', 50, customerInformationTop + 60)
      .text(
        moment(invoice.created_at).format('DD MMM, YYYY HH:mm:ss'),
        150,
        customerInformationTop + 60
      )
      // Net Amount
      .text('Net Amount:', 50, customerInformationTop + 75)
      .text(
        this.formatCurrency(invoice.net_amount),
        150,
        customerInformationTop + 75
      )
      // Right Column
      // Client Info
      .font('Helvetica')
      .text(client.fullname, 300, customerInformationTop)
      .font('Helvetica')
      .text(
        `Email: ${client.email}` || `Email: N/A`,
        300,
        customerInformationTop + 15
      )
      .font('Helvetica')
      .text(
        `Address: ${client.address}` || `Address: N/A`,
        300,
        customerInformationTop + 30
      )
      .font('Helvetica')
      .text(
        `Mobile: ${client.mobile}` || `Mobile: N/A`,
        300,
        customerInformationTop + 60
      )
      .moveDown()
    // generating Horizontal Line
    this.generateHr(doc, 300)
    // Regards Section
    const regardsTopInformation = 500
    doc
      .fill('#444444')
      .font('Helvetica-Bold')
      .text('Regards', 50, regardsTopInformation + 15)
      .font('Helvetica')
      .text(receiptInfo.company_name, 50, regardsTopInformation + 30)
      .font('Helvetica')
      .text(receiptInfo.company_address, 50, regardsTopInformation + 45)
      .font('Helvetica')
      .text('Email:', 50, regardsTopInformation + 60)
      .font('Helvetica')
      .text(receiptInfo.support_email, 100, regardsTopInformation + 60)
      .moveDown()
  }
  /**
   * Generating Invoice Table for the PDF
   * @param {object} doc
   * @param {object} receiptInfo
   * @param {string} type
   */
  generateInvoiceTable(doc, receiptInfo, type) {
    let invoice = receiptInfo ? receiptInfo.transaction : []
    let i
    const invoiceTableTop = 380
    doc.font('Helvetica')
    this.generateTableRow(
      doc,
      invoiceTableTop,
      'Item',
      'Description',
      'Amount',
      'Fee',
      'Net Amount'
    )
    this.generateHr(doc, invoiceTableTop + 20)
    doc.font('Helvetica')
    for (i = 0; i < 1; i++) {
      const position = invoiceTableTop + (i + 1) * 30
      this.generateTableRow(
        doc,
        position,
        type == 'deposit' ? 'Deposit' : 'Withdraw',
        type == 'deposit'
          ? 'Deposit to Cash Wallet'
          : 'Withdraw from Cash Wallet',
        this.formatCurrency(invoice.amount),
        this.formatCurrency(invoice.transaction_fee),
        this.formatCurrency(invoice.net_amount)
      )
      this.generateHr(doc, position + 20)
    }
  }
  /**
   * Generating Footer Section for the PDF
   * @param {object} doc
   */
  generateFooter(doc) {
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(
        'This is an auto generated attachment thats why no signature is required.',
        50,
        750,
        { align: 'center', width: 500 }
      )
  }
  /**
   * Generating Table Row for the PDF
   * @param {object} doc
   * @param {integer} y
   * @param {object} item
   * @param {object} description
   * @param {number} amount
   * @param {number} fee
   * @param {number} net_amount
   */
  generateTableRow(doc, y, item, description, amount, fee, net_amount) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(description, 150, y)
      .text(amount, 280, y, { width: 90, align: 'right' })
      .text(fee, 370, y, { width: 90, align: 'right' })
      .text(net_amount, 0, y, { align: 'right' })
  }
  /**
   * Generating Horizontal Row Section for the PDF
   * @param {object} doc
   * @param {integer} y
   */
  generateHr(doc, y) {
    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke()
  }
  /**
   * Format Currency for the PDF
   * @param {number} cents
   */
  formatCurrency(cents) {
    return cents && cents > 0 ? '$' + cents.toFixed(2) : '$' + '0.00'
  }
  /**
   * Formatting Date Section for the PDF
   * @param {string} date
   */
  formatDate(date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return year + '/' + month + '/' + day
  }
}

module.exports = ReceiptGeneratorServices
