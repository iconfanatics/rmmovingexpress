/**
 ** File Name: ib.js
 ** Handling the Request for maintaining Access Control
 ** Namespace: middleware
 ** Developed By: Devech Ltd.
 ** Company Website: http://www.devech.com
 ** Maintained By: Devech Ltd.
 ** Email: info@devech.com
 ** Skype: team_devech,
 ** License: Devech Ltd.
 **/
/**
 * This Module will redirect the non IB user to IB Restriction Page
 */
export default function({ redirect, $auth, app }) {
  try {
    if ($auth.fetchUser() && $auth && $auth.user) {
      const roles = $auth.user.roles
      if (roles && roles instanceof Object && Object.keys(roles).length > 0) {
        const findSuperAdminRole = roles.find(
          (role) => role.id == 1 && role.pretty_name == 'super-admin'
        )
        if (!findSuperAdminRole || findSuperAdminRole == undefined) {
          return redirect(app.localePath('index'))
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
