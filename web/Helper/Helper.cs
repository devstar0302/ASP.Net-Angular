using Models;
using Newtonsoft.Json;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Web.Mvc;
using System.Collections.Generic;


namespace web.Helper
{
    public class Helper
    {
        readonly string uri = ConfigurationManager.AppSettings["API"];

        public async Task<SiteContent> GetMovieAsync(string name)
        {
            //if( string.IsNullOrEmpty(name))
            //    name = "United Kingdom";

            //using (HttpClient httpClient = new HttpClient())
            //{
            //    JavaScriptSerializer json_serializer = new JavaScriptSerializer();
            //    var res = await httpClient.GetStringAsync(uri + "?name=" + name + "&type=Full");
            //    JavaScriptSerializer serializer = new JavaScriptSerializer();
            //    var jsonString = serializer.Deserialize<string>(res);
            //    ItemDetails data = JsonConvert.DeserializeObject<ItemDetails>(jsonString);

            //    return data;
            //}

            SiteContent data = new SiteContent();
            return data;
        }
    }
}