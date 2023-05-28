namespace taxe_studentesti_be.Security_Api.exception
{
    public class MissingAuthorizationException : Exception
    {
        public MissingAuthorizationException(string message) : base(message)
        {
        }
    }
}
