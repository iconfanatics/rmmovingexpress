/**
 ** File Name: guest.js
 ** Handling the Request for non logged in users
 ** Namespace: middleware
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
export default function({ store, redirect }) {
  // checking user is logged in or not
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
