using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class JwtValidator
{
    public static bool ValidateToken(string jwtToken, string jwtSecret)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSecret);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false, // Depending on your setup, you might want to validate the issuer
                ValidateAudience = false, // Depending on your setup, you might want to validate the audience
                ClockSkew = TimeSpan.Zero // You may adjust the tolerance for the expiration time
            };

            SecurityToken validatedToken;
            ClaimsPrincipal principal = tokenHandler.ValidateToken(jwtToken, validationParameters, out validatedToken);

            var role = principal.FindFirst(ClaimTypes.Role)?.Value;
            Console.WriteLine(role);


            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}
