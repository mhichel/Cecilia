from django.shortcuts import render
from django_auth_ldap.backend import LDAPBackend, _LDAPUser
import ldap
import ldap.sasl

logger = logging.getLogger('nick')

class LDAPSaslBackend(LDAPBackend):
        """Specialized SASL backend for Kerberos LDAP.

        See https://django-auth-ldap.readthedocs.io/en/latest/install.html

        """
        def authenticate(self, request, username=None, password=None, **kwargs):
                logger.info('Trying to authenticate %s. ' % (username))
                if password or self.settings.PERMIT_EMPTY_PASSWORD:
                    ldap_user = SASLUser(self, username=username.strip(), request=request)
                    user = self.authenticate_ldap_user(ldap_user, password)
                else:
                    logger.debug("Rejecting empty password for {}".format(username))
                    user = None

                return user

        def get_user(self, user_id):
                user = None

                logger.info('Getting %s' % user_id)
                try:
                    user = self.get_user_model().objects.get(pk=user_id)
                    SASLUser(self, user=user)  # This sets user.ldap_user
                except ObjectDoesNotExist:
                    pass

                return user

        def get_group_permissions(self, user, obj=None):
                if not hasattr(user, "ldap_user") and self.settings.AUTHORIZE_ALL_USERS:
                    SASLUser(self, user=user)  # This sets user.ldap_user

                if hasattr(user, "ldap_user"):
                    permissions = user.ldap_user.get_group_permissions()
                else:
                    permissions = set()

                return permissions

        def populate_user(self, username):
                logger.info('populating  %s' % username)
                ldap_user = SASLUser(self, username=username)
                user = ldap_user.populate_user()

                return user

        def authenticate_ldap_user(self, ldap_user, password):
                """
                Returns an authenticated Django user or None.
                """
                return ldap_user.authenticate(password)


class SASLUser(_LDAPUser):
        def _authenticate_user_dn(self, password):
            """
            Binds to the LDAP server with the user's DN and password. Raises
            AuthenticationFailed on failure.
            """
            try:
                sticky = self.settings.BIND_AS_AUTHENTICATING_USER
                self._bind_as(None, password, sticky=sticky)
            except ldap.INVALID_CREDENTIALS:
                raise self.AuthenticationFailed("user DN/password rejected by LDAP server.")


        def _bind_as(self, bind_dn, bind_password, sticky=False):
                conn = self._get_connection()
                bind_dn = self._username
                auth_tokens = ldap.sasl.digest_md5(bind_dn, bind_password)
                conn.sasl_interactive_bind_s(bind_dn, auth_tokens)
                self._connection_bound = sticky

        @property
        def connection(self):
            return self._get_connection()










"""
# to be able to import ldap run pip install python-ldap

import ldap

if __name__ == "__main__":
  	ldap_server="x.x.x.x"
	username = "someuser"
	password= "somepassword"
	# the following is the user_dn format provided by the ldap server
	user_dn = "uid="+username+",ou=someou,dc=somedc,dc=local"
	# adjust this to your base dn for searching
	base_dn = "dc=somedc,dc=local"
	connect = ldap.open(ldap_server)
	search_filter = "uid="+username
	try:
		#if authentication successful, get the full user data
		connect.bind_s(user_dn,password)
		result = connect.search_s(base_dn,ldap.SCOPE_SUBTREE,search_filter)
		# return all user data results
		connect.unbind_s()
		print result
	except ldap.LDAPError:
		connect.unbind_s()
		print "authentication error"
"""
