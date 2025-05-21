using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

public class Adapter
{
    private readonly HttpClient _httpClient;

    public Adapter()
    {
        _httpClient = new HttpClient { BaseAddress = new Uri("http://10.9.23.176:4000/api/") };
        _httpClient.DefaultRequestHeaders.Accept.Clear();
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<string> GetAllRobotsWithRobotTypeId(string id,string token)
    {
        string endpoint="robots/robotType/"+id;
        _httpClient.DefaultRequestHeaders.Authorization =new AuthenticationHeaderValue("Bearer",token);
        HttpResponseMessage response = await _httpClient.GetAsync(endpoint);

        if (response.IsSuccessStatusCode)
        {
            return await response.Content.ReadAsStringAsync();
        }
        else
        {
            // Handle error response
            throw new HttpRequestException($"API request failed with status code {response.StatusCode}");
        }
    }
}
