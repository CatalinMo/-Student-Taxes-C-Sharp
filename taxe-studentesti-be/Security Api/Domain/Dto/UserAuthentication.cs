namespace taxe_studentesti_be.Security_Api.Domain.Dto
{
    public class UserAuthentication
    {
        public List<string> Authorities { get; set; }
        public string Name { get; set; }
        public bool Authenticated { get; set; }

        public UserAuthentication(List<string> authorities, string name, bool authenticated)
        {
            Authorities = authorities;
            Name = name;
            Authenticated = authenticated;
        }

        public UserAuthentication(UserAuthentication authentication)
        {
            Authorities = authentication.Authorities;
            Name = authentication.Name;
            Authenticated = authentication.Authenticated;
        }
    }
}
