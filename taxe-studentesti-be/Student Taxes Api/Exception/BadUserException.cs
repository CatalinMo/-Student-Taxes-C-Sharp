namespace taxe_studentesti_be.student_taxes_api.exception
{
    public class BadUserException : Exception
    {
        public BadUserException(string message) : base(message)
        {
        }
    }
}
