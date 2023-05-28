using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using taxe_studentesti_be.Security_Api.Domain.Dto;
using taxe_studentesti_be.Security_Impl.Config.Properties;

namespace taxe_studentesti_be.Security_Impl.Application
{
    public class JwtTokenProvider
    {
        private static readonly string AUTHORITIES_KEY = "roles";
        private readonly JwtAuthProperties _jwtProperties;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private SymmetricSecurityKey _secretKey;

        public JwtTokenProvider(IOptions<JwtAuthProperties> jwtOptions, JwtSecurityTokenHandler tokenHandler)
        {
            _jwtProperties = jwtOptions.Value;
            _tokenHandler = tokenHandler;

            string secret = Convert.ToBase64String(Encoding.UTF8.GetBytes(_jwtProperties.SecretKey));
            _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        }

        public bool ValidateToken(string token)
        {
            try
            {
                validateToken(token);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public string CreateToken(UserAuthentication authentication)
        {
            string username = authentication.Name;
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]{new Claim(ClaimTypes.Name, username)});
            AddAuthorities(authentication, claimsIdentity);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = DateTime.UtcNow.AddMilliseconds(_jwtProperties.Validity),
                SigningCredentials = new SigningCredentials(_secretKey, SecurityAlgorithms.HmacSha512Signature)
            };
            SecurityToken token = _tokenHandler.CreateToken(tokenDescriptor);
            return _tokenHandler.WriteToken(token);
        }

        public UserAuthentication GetAuthentication(string token)
        {
            ClaimsPrincipal principal = validateToken(token);
            var identity = (ClaimsIdentity) principal.Identity;
            string authoritiesClaim = identity.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role)?.Value;
            List<string> authorities = AddGrantedAuthorities(authoritiesClaim);
            return new UserAuthentication(authorities, principal.Identity.Name, principal.Identity.IsAuthenticated);
        }

        public List<string> AddGrantedAuthorities(string authorities)
        {
            return authorities?.Split(',')?.ToList() ?? new List<string>();
        }

        private void AddAuthorities(UserAuthentication authentication, ClaimsIdentity claimsIdentity)
        {
            if (authentication.Authorities != null && authentication.Authorities.Count > 0)
            {
                string authorities = string.Join(",", authentication.Authorities);
                claimsIdentity.AddClaim(new Claim(AUTHORITIES_KEY, authorities));
            }
        }

        private ClaimsPrincipal validateToken(string token)
        {
           return _tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                IssuerSigningKey = _secretKey,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false
            }, out _);
        }
    }
}
