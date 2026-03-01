'use strict'

/**
 ** File Name: CAdminController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** Models Section */
const Admin = use('App/Models/Admin')
const moment = use('moment')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with admins
 */
class AdminController {
      /**
   * Adding New User/Client
   * @param {Object} registrationInfo
   */
    async postRegistration({ response, request }) {
      try {
        
        const {
          email,
          password,
          fname,
          lname
        } = request.input('registrationInfo')
  
  
        const findClient = await Admin.query()
        .where('email', email)
        .first()
        if(findClient){
          return ExceptionsServices.duplicateResource('E-mail')
        }
  
        // adding the user to the clients table
        const client = new Admin()
        // Generate token
        const token = this.tokenGenerate(email)
            
        client.email = email
        client.password = password
        client.fname = fname
        client.lname = lname
        client.token = token
        client.status = 1
        await client.save()
        
      
  
        return ExceptionsServices.resourceSendSuccessful('Registration')
        // return success message
        // return response.json({
        //   SUCCESS: true,
        //   MESSAGE:
        //     'Your registration has been successfully completed',
        //   // MESSAGE:
        //   //   'A confirmation link has been sent to your email address. Please verify to login.',
        //   FIELD: 'SUCCESS'
        // })
      } catch (error) {
        console.log(error)
      }
    }

   /**
   * Function to check the Authentication of a Client/Account
   * @param loginInfo
   */
   async postLogin({ auth, request, response, antl, emails, emailInfo }) {
    try {
      
      // const { email, password } = request.all()
      // const { email, password } = request.all()
      const { email, password } = request.all();
      // finding the admin based on the provided loginInfo
    
      const findAdmin = await Admin.query()
        // .with('roles', (builder) => {
        //   builder.select('id', 'role_name')
        // })
        .where('email', email)
        .select(
          'id',
          'email',
          'password',
          'status',
          'two_factor_auth',
          'fname',
          'lname',
          'p_code'
        )
        .first()
     
      if (findAdmin) {
        
        // checking the status is active or blocked for the client || Two Factor Authentication is activated or not
        if (findAdmin.toJSON().status === 0) {
          return response.json({
            CODE: 'Error code for an inactive login attempt.',
            STATUS: 'Status description, e.g., "Account Inactive.',
            TYPE: 'Error type, e.g., "Authorization Error',
            MESSAGE: 'Message, e.g., "Your account is currently inactive. Please contact support for assistance."',
          })
          
        } else if (findAdmin.toJSON().two_factor_auth == 1) {
          // Two Factor Authentication Is Activated
          // random PIN Generation of 6 Digit
          const pin = RandomData('0', 6)
          findAdmin.p_code = pin
          findAdmin.p_code_time = moment().format('YYYY-MM-DD HH:mm:ss')
          await findAdmin.save()
          const clientInfo = {
            name: `${findAdmin.fname} ${findAdmin.lname}`,
            email: email.toLowerCase(),
            from_email: emails ? emails.no_reply : 'no-reply@forexsolver.com',
            company_name: emailInfo
              ? emailInfo.companyName
              : 'Najd.',
            pin: pin,
          }
          // Sending Verification Code to Email
          ZeroEvent.fire(
            'twofactorauthentication::SendVerificationCode',
            clientInfo
          )
          // returning response
          return response.json({
            CODE: antl.formatMessage('exceptions.code_128'),
            STATUS: antl.formatMessage('exceptions.status_128'),
            TYPE: antl.formatMessage('exceptions.type_128'),
            MESSAGE: antl.formatMessage('exceptions.message_128'),
          })
        } else {
          const client = await auth.authenticator('jwtAdmin').attempt(email, password);

          // changing the language in the data base for client
          findAdmin.language = request.header('accept-language', 'en')
          await findAdmin.save()
         
          /** Writing Log File */
          // await LoggerServices.writeToLog(
          //   'authentication',
          //   request.url(),
          //   `${findAdmin.toJSON().fname} ${findAdmin.toJSON().lname}`,
          //   request.header('ip-address', null),
          //   moment().format('YYYY-MM-DD HH:mm:SS'),
          //   `LoggedIn by ${findAdmin.toJSON().fname} ${
          //     findAdmin.toJSON().lname
          //   } (${findAdmin.toJSON().email})`,
          //   'info'
          // )
          /** End of Writing Log File */
          // returning login successful response
          return response.json({
            // CODE: antl.formatMessage('exceptions.code_121'),
            // STATUS: antl.formatMessage('exceptions.status_121'),
            // TYPE: antl.formatMessage('exceptions.type_121'),
            // MESSAGE: antl.formatMessage('exceptions.message_121', {
            //   userName:
            //     'Welcome ' +
            //     findAdmin.toJSON().fname +
            //     ' ' +
            //     findAdmin.toJSON().lname,
            // }),
            MESSAGE: {
                 userName:
                'Welcome ' +
                findAdmin.toJSON().fname +
                ' ' +
                findAdmin.toJSON().lname,
            },
            CODE: 'Z_LOGIN_SUCCESS',
            STATUS: '121',
            TYPE: 'success',
            data: client,
            user: findAdmin,
          })
        }
      } else {
        return response.json({
          CODE: 'Error code for an inactive login attempt.',
          STATUS: 'Status description, e.g., "Account Inactive.',
          TYPE: 'Error type, e.g., "Authorization Error',
          MESSAGE: 'Message, e.g., "Your account is currently inactive. Please contact support for assistance."',
        })
      }
    } catch (loginError) {
      if (loginError && loginError.name === 'PasswordMisMatchException') {
        return response.json({
          CODE: 'Error code for an inactive login attempt.',
          STATUS: 'Status description, e.g., "Account Inactive.',
          TYPE: 'Error type, e.g., "Authorization Error',
          MESSAGE: 'Message, e.g., "Your account is currently inactive. Please contact support for assistance."',
        })
      }
    }
  }

  
   /**
   * Get All Admins
   * @param null
   */
   async getAllAdmins({ auth }) {
    try {
      const admins = await Admin.query()
        // .with('roles')
        // .where('id', '<>', auth.user.id)
        .select('id', 'fname', 'lname', 'email', 'created_at', 'status')
        .fetch()
      // console.log(admins.toJSON())
      return admins
    } catch (adminError) {
      console.log(adminError)
    }
  }

   /**
   * Adding New Admin
   * @param newAccount
   */

   async postAddAdmin({ auth, response, request, antl, ipAddress }) {
    const admin = await auth.getUser()
    try {
      // console.log(request.all())
      
    
      const { fname, lname, username, email, password } = request.input(
        'newAccount'
      )

      // check exiting mail
      const findExitingAdmin = await Admin.query()
        .where('email', email)
        .first();

        if(findExitingAdmin){
        return response.json({
          STATUS: '400',
          MESSAGE:
            'Email Already Exists',
        })
       }

      const newAdmin = new Admin()
      newAdmin.language = 'en'
      newAdmin.fname = fname
      newAdmin.lname = lname
      newAdmin.email = email.toLowerCase()
      newAdmin.password = password
      newAdmin.username = email.toLowerCase()
      newAdmin.status = 1 // default is 0. Will be activated when any role is assigned
      await newAdmin.save()

      // returning the last admin
      const lastAdmin = await Admin.query().where('id', newAdmin.id).first()
      /** Writing Log File */
      // await LoggerServices.writeToLog(
      //   'admins',
      //   request.url(),
      //   `${admin.toJSON().fname} ${admin.toJSON().lname}`,
      //   ipAddress,
      //   moment().format('YYYY-MM-DD HH:mm:SS'),
      //   `Admin(${newAdmin.id}) Added by ${admin.toJSON().fname} ${
      //     admin.toJSON().lname
      //   } (${admin.toJSON().email})`,
      //   'info'
      // )
      /** End of Writing Log File */
      // returning success response
      return response.json({
        // CODE: antl.formatMessage('exceptions.code_113'),
        // STATUS: '400,
        // TYPE: antl.formatMessage('exceptions.type_113'),
        // MESSAGE: antl.formatMessage('exceptions.message_113', {
        //   resourceName: antl.formatMessage('keys.admin'),
        // }),
        STATUS: '400',
        TYPE: 'success',
        MESSAGE: 'Admin Added Successfully Done',
        DATA: lastAdmin,
      })
    } catch (addAdminError) {
      console.log(addAdminError)
      return response.json({
        // CODE: antl.formatMessage('exceptions.code_114'),
        // STATUS: antl.formatMessage('exceptions.status_114'),
        // TYPE: antl.formatMessage('exceptions.type_114'),
        // MESSAGE: antl.formatMessage('exceptions.message_114', {
        //   resourceName: antl.formatMessage('keys.admin'),
        // }),
      })
    }
  }

  /**
   * Getting User Info
   */
  async getAdminInfo({ auth, response }) {
    const client = await auth.getUser()
    try {
      console.log(client.id)
      return
      const findClient = await Admin.query()
        .where('id', client?.id)
        .select(
          'id',
          'language',
          'fname',
          'lname',
          'username',
          'email',
          'status'
        )
        .first()
      return findClient
    } catch (getInfoError) {
      console.log(getInfoError)
    }
  }

  /**
   * Generate Access Token and new Refresh Token
   * @param refreshToken
   */
  async refreshToken({ request, response, auth }) {
    try {
      const { rt_es: refreshToken } = request.cookies()

      if (refreshToken) {
        // Checking the refresh token in Database
        const clientOfToken = await ClientToken.query()
          .join('clients', 'clients.id', 'client_tokens.client_id')
          .where('client_tokens.token', Encryption.decrypt(refreshToken))
          .select(
            'clients.id',
            'clients.client_type',
            'clients.first_name',
            'clients.last_name',
            'clients.lan_lat',
            'clients.status',
            'clients.is_email_verified',
            'clients.is_phone_verified',
            'clients.status',
            'clients.user_id',
            'clients.photo',
            'client_tokens.created_at'
          )
          .first()

        if (!clientOfToken || clientOfToken.status === 0) {
          return response.status(403).send({ error: 'Invalid Token' })
        }

        let tokenCreatedAt = moment(clientOfToken.created_at).unix()
        let now = moment().unix()

        // Create new refresh token too if it is more than 1 hour old, Otherwise create only access token
        let tokens
        if (now > tokenCreatedAt + 60 * 60) {
          tokens = await auth
            .newRefreshToken()
            .generateForRefreshToken(refreshToken)
        } else {
          tokens = await auth.generateForRefreshToken(refreshToken)
        }

        response.cookie('rt_es', tokens.refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        await delete clientOfToken.created_at
        return {
          data: tokens,
          user: clientOfToken,
        }
      } else {
        return response.status(403).send({ error: 'InvalidRefreshToken' })
      }
    } catch (refreshTokenError) {
      // console.log(refreshTokenError)
      // return err
      return response.status(500).send({ error: 'Something went wrong' })
    }
  }

    // Generate token
    tokenGenerate(str) {
      let currentTime = Date.now()
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
        hash = hash & hash // Convert to 32bit integer
        hash += currentTime
      }
      let r1 = Math.random()
        .toString(20)
        .substring(2)
      let r2 = Math.random()
        .toString(25)
        .substring(2)
      let r3 = Math.random()
        .toString(30)
        .substring(2)
      let r4 = Math.random()
        .toString(35)
        .substring(2)
      let r5 = Math.random()
        .toString(36)
        .substring(2)
      let token = r1 + hash + r2 + r3 + currentTime + r4 + r5
      return token
    }

  /**
   * Render a form to be used for creating a new admin.
   * GET admins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new admin.
   * POST admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single admin.
   * GET admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing admin.
   * GET admins/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update admin details.
   * PUT or PATCH admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a admin with id.
   * DELETE admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AdminController
