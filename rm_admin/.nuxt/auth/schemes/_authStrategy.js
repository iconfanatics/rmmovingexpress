import LocalScheme from '@nuxtjs/auth/lib/schemes/local'

export default class MyCustomScheme extends LocalScheme {
  async fetchUser(endpoint) {
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )

    // Transform your user object here
    // Then set the user using `this.$auth.setUser(user)`
    this.$auth.setUser(user)
  }
}
