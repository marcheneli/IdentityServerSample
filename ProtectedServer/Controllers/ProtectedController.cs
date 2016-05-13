using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProtectedServer.Controllers
{
    [RoutePrefix("api/protected")]
    public class ProtectedController : ApiController
    {
        [Route("")]
        [Authorize]
        public IHttpActionResult Get()
        {
            return Ok("Защищенная информация.");
        }
    }
}
