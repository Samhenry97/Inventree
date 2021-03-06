import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

let instance;
export function getInstance() {
  return instance;
}

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
    onRedirect=DEFAULT_REDIRECT_CALLBACK,
    redirectUri=window.location.origin,
    ...options
}) => {
  if (instance) return instance;
  instance = new Vue({
    data: () => ({
      loading: true,
      authed: false,
      user: {},
      auth0Client: null,
      error: null
    }),
    methods: {
      /** Authenticates the user using a popup window */
      async loginWithPopup(o) {
        try {
          await this.auth0Client.loginWithPopup(o);
        } catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
        }

        this.user = await this.auth0Client.getUser();
        this.authed = true;
      },
      /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.authed = true;
        } catch (e) {
          this.error = e;
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o) {
        return this.auth0Client.loginWithRedirect(o);
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o) {
        return this.auth0Client.getIdTokenClaims(o);
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o) {
        return this.auth0Client.getTokenSilently(o);
      },
      /** Gets the access token using a popup window */
      getTokenWithPopup(o) {
        return this.auth0Client.getTokenWithPopup(o);
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o) {
        return this.auth0Client.logout(o);
      }
    },
    async created() {
      // Create a new instance of the SDK client using members of the given options object
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience,
        redirect_uri: redirectUri
      });

      try {
        // If the user is returning to the app after authentication..
        if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
          // handle the redirect and retrieve tokens
          const { appState } = await this.auth0Client.handleRedirectCallback();

          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          onRedirect(appState);
        }
      } catch (e) {
        this.error = e;
      } finally {
        // Initialize our internal authentication state
        this.authed = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    }
  });

  return instance;
};

export default {
  install(Vue, options) {
    Vue.prototype.$auth = useAuth0(options);
  }
};
