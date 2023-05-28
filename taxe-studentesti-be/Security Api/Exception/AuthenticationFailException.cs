namespace taxe_studentesti_be.Security_Api.exception
{
    public class AuthenticationFailException : Exception
    {
        public AuthenticationFailException(string message) : base(message)
        {
        }
    }
}
