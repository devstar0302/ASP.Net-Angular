using Models;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace web.Controllers
{
    public class HomeController : Controller
    {
        private Helper.Helper service = new Helper.Helper();
        public ActionResult Index(string id)
        {
            return View();
        }
        public ActionResult Landing()
        {
            return View();
        }
        public async Task<JsonResult> GetMovie(string id)
        {
            SiteContent movie = await service.GetMovieAsync(id);
            return Json(movie, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMovieData(string id)
        {
            SiteContent movie = service.GetMovieAsync(id).Result;
            JsonResult jsReturn = Json(movie);
            return jsReturn;
        }
    }
}