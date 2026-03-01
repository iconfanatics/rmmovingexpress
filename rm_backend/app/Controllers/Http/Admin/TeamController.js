'use strict'

/**
 ** File Name: TeamController.js
 ** Controlling Admin Section
 ** Namespace: App/Controllers/Http/Admin
 ** Developed By: Md. Mijanur Rahman
 ** Maintained By: Md. Mijanur Rahman
 ** Email: mizandev000@gmail.com
 **/

/** Packages Section */
const moment = use('moment')
const Jimp = use("jimp");
const ENV = use("Env");
const Helpers = use("Helpers");
const Drive = use("Drive");

/** Models Section */
const Team = use('App/Models/Team')

/** Exception Section */
const EServices = use('App/Services/Exceptions/ExceptionsServices')
const ExceptionsServices = new EServices()

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    async getTeam ({ auth, request, response }) {
          try{
            const teamInfo = await Team.query()
            .select(
              'id', 
              'designation', 
              'name', 
              'details', 
              'photo', 
              'status'
            )
            .fetch();

            return teamInfo

          }catch(teamError){
            console.log(teamError)
          }
        }

  /**
   * Render a form to be used for creating a new team.
   * GET teams/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async addTeam({ request, response }) {
    try {
    
      const {
        designation,
        name,
        details
      } = request.input('newServicePage')

       // check missing designation
      if (!designation) {
        return ExceptionsServices.resourceMissing('Designation')
      }
      // check missing title
      if (!name) {
        return ExceptionsServices.resourceMissing('name')
      }
      // check missing details
      if (!details) {
        return ExceptionsServices.resourceMissing('Details')
      }
    
    const fileInfo = request.file("photo");

    // check photo
    if (!fileInfo) {
        return ExceptionsServices.resourceMissing('About Us image')
    }


    if(fileInfo){
        if (fileInfo.size > 2000000) {
        return response.json({
            STATUS: '400',
            MESSAGE:
            'Keep in mind that the maximum file size for uploading files to Intercom is 2MB.',
        })
        }

        let fileExtension = fileInfo.extname;
        // checking files are valid
        const allowedTypes = ["png", "PNG", "jpg", "jpeg", "JPEG", "JPG", "gif", "GIF", "webp"];

        if (!allowedTypes.includes(fileExtension)) {
            return response.json({
            message: fileExtension + " File Format Not Supported",
            insertError: "File size error",
            });
        }

        let min = 11111111;
        let max = 99999999;
        let random1 = Math.floor(Math.random() * (+max - +min)) + +min;
        let newimageName = random1 + "_service." + fileExtension;

        var imageUploadUrl = ENV.get("IMG_URL");

        await fileInfo.move(Helpers.tmpPath(imageUploadUrl), {
            name: newimageName,
            overwrite: true,
        });

            if (fileInfo.moved()) {
            const teamInfo = new Team()
            teamInfo.designation = designation
            teamInfo.name  = name 
            teamInfo.details  = details 
            teamInfo.photo = newimageName
            await teamInfo.save()

            // Getting last Team
            const lastTeam = await Team.query()
            .where('id', teamInfo.id)
            .select(
              'id', 
              'designation', 
              'name', 
              'details', 
              'photo', 
              'status'
            )
            .first()
          
            return response.json({
                TYPE: 'success',
                MESSAGE:
                'Team Successfully Added',
                DATA: lastTeam
            })
        }
        
    }
    
      
    } catch (addTeamError) {
      console.log(addTeamError)
    }
  }
  

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
    async teamUpdate({ request, response }) {
    try {
     
      const {
        id,
        designation,
        name,
        details
      } = request.input('editServicePage')

      console.log(id,
        designation,
        name,
        details);
      
      

      // Finding Team
      const findTeam = await Team.query()
        .where('id', id)
        .select(
           'id', 
            'designation', 
            'name', 
            'details', 
            'photo', 
            'status'
        )
        .first()
        
      if (findTeam && findTeam !== undefined) {

        const fileInfo = request.file("photo");

        if(!fileInfo){
          findTeam.designation = designation
          findTeam.name  = name 
          findTeam.details  = details 
          await findTeam.save()

          // return successful
          return response.json({
            STATUS: '400',
            TYPE: 'success',
            MESSAGE:
              'About Us Successfully Updated'
          })
        }

           // check photo
           if (fileInfo == null) {
            return response.json({
              STATUS: '400',
              MESSAGE:
                'About Us Image Missing',
            })
          }
  
          if(fileInfo){
            if (fileInfo.size > 2000000) {
              return response.json({
                STATUS: '400',
                MESSAGE:
                  'Keep in mind that the maximum file size for uploading files to Intercom is 2MB.',
              })
            }
  
          let fileExtension = fileInfo.extname;
          // checking files are valid
          const allowedTypes = ["png", "PNG", "jpg", "jpeg", "JPEG", "JPG", "gif", "GIF", "webp"];
  
          if (!allowedTypes.includes(fileExtension)) {
            return response.json({
              STATUS: '400',
              MESSAGE: fileExtension + " File Format Not Supported",
            })
          }
  
          let min = 11111111;
          let max = 99999999;
          let random1 = Math.floor(Math.random() * (+max - +min)) + +min;
          let newimageName = random1 + "_ad." + fileExtension;
  
          var imageUploadUrl = ENV.get("IMG_URL");
  
          await fileInfo.move(Helpers.tmpPath(imageUploadUrl), {
            name: newimageName,
            overwrite: true,
          });
  
            if (fileInfo.moved()) {
              await Drive.delete(imageUploadUrl + findTeam.photo);
              findTeam.designation = designation
              findTeam.name  = name 
              findTeam.details  = details 
              findTeam.photo = newimageName
              await findTeam.save()

             // return successful
              return response.json({
                STATUS: '400',
                TYPE: 'success',
                MESSAGE:
                  'Team Successfully Updated'
              })
            }
          
          }
     
      }
     
    } catch (updateTeamError) {
      console.log(updateTeamError)
    }
  }

          /**
   * Updating Category Status
   * Updating the Status from 1 to 0 or Vice Versa
   * @param categoryId
   * @return {Object}
   */
  async teamStatus({ request, response }) {
    try {
      const { teamId } = request.all()
      if (!teamId || isNaN(teamId)) return 'error'
      // Finding Team
      const findTeam = await Team.query()
        .where('id', teamId)
        .select('id', 'status')
        .first()
      if (findTeam && findTeam !== undefined) {
        findTeam.status = findTeam.status === 1 ? 0 : 1
        await findTeam.save()
      }
        // return successful
        return response.json({
        TYPE: 'success',
        MESSAGE:
          'Team Status Successfully Changed',
        DATA: findTeam
      })
    
    } catch (updateTeamError) {
      console.log(updateTeamError)
    }
  }

  /**
   * Delete a team with id.
   * DELETE teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async deleteTeam({ params, response, request }) {
      try {
        const { id } = params;
       
        const teamInfo = await Team.query()
          .where("id", id)
          .select("id", "photo")
          .first();
  
        if (!teamInfo) {
          return response.json({
            STATUS: '400',
            MESSAGE:
              'Please reload the page',
          })
        }
        if (teamInfo != null) {
          const fileName = teamInfo.photo;
          var imageUploadUrl = ENV.get("IMG_URL");
          await Drive.delete(imageUploadUrl + fileName);
        }
        await teamInfo.delete();
        return response.json({
          TYPE: 'success',
          MESSAGE:
            'Team successfully Deleted',
            teamInfo: teamInfo.toJSON(),
        })
    
      } catch (deleteTeamExpert) {
        console.log(deleteTeamExpert);
      }
    }
}

module.exports = TeamController
