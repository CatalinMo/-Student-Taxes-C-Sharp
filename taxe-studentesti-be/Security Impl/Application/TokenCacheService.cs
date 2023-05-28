using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using taxe_studentesti_be.Security_Api.Domain.Dto;
using taxe_studentesti_be.Security_Impl.Config.Properties;

namespace taxe_studentesti_be.Security_Impl.Application
{
    public class TokenCacheService
    {
        private readonly JwtAuthProperties _jwtAuthProperties;
        private readonly ConcurrentDictionary<string, TokenDetailsDto> _tokens;

        public TokenCacheService(IOptions<JwtAuthProperties> jwtOptions)
        {
            _jwtAuthProperties = jwtOptions.Value;
            _tokens = new ConcurrentDictionary<string, TokenDetailsDto>();
        }

        public void CleanUp()
        {
            DateTime currentDate = GetCurrentDate();
            List<string> expiredTokens = _tokens
                .Where(x => x.Value.ValidUntil < currentDate)
                .Select(x => x.Key)
                .ToList();

            foreach (string token in expiredTokens)
            {
                _tokens.TryRemove(token, out _);
            }
        }

        public void AddToken(AuthTokenDto authToken)
        {
            DateTime validityDate = GetValidityDate();
            TokenDetailsDto tokenDetails = new TokenDetailsDto(validityDate, authToken.Authentication);
            _tokens.TryAdd(authToken.Token, tokenDetails);
        }

        public bool IsTokenValid(string token)
        {
            if (_tokens.TryGetValue(token, out TokenDetailsDto tokenDetails))
            {
                return CheckTokenValidity(token);
            }
            return false;
        }

        public UserAuthentication GetAuthentication(string token)
        {
            if (_tokens.TryGetValue(token, out TokenDetailsDto tokenDetails))
            {
                return new UserAuthentication(tokenDetails.Authentication);
            }
            return null;
        }

        private bool CheckTokenValidity(string token)
        {
            if (_tokens.TryGetValue(token, out TokenDetailsDto tokenDetails))
            {
                DateTime currentDate = GetCurrentDate();
                if (tokenDetails.ValidUntil > currentDate)
                {
                    tokenDetails.ValidUntil = GetValidityDate();
                    _tokens[token] = tokenDetails;
                    return true;
                }
                else
                {
                    _tokens.TryRemove(token, out _);
                }
            }
            return false;
        }

        private DateTime GetValidityDate()
        {
            long validUntil = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + _jwtAuthProperties.Validity;
            return DateTimeOffset.FromUnixTimeMilliseconds(validUntil).UtcDateTime;
        }

        private DateTime GetCurrentDate()
        {
            return DateTime.UtcNow;
        }
    }
}
