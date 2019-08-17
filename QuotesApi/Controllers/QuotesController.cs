using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuotesApi.Data;
using QuotesApi.Models;

namespace QuotesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private QuotesDBContext _quotesDBContext;

        public QuotesController(QuotesDBContext quotesDBContext)
        {
            this._quotesDBContext = quotesDBContext;
        }

        // GET: api/Quotes
        [HttpGet]
        [ResponseCache(Duration =60)]
        public IActionResult  Get(string sort)
        {
            IQueryable<Quote> quote;
            switch (sort)
            {
                case "desc":
                    quote=_quotesDBContext.Quotes.OrderByDescending(q => q.CreatedDate);
                         break;
                case "asc":
                    quote=_quotesDBContext.Quotes.OrderBy(q => q.CreatedDate);
                    break;
                default:
                    quote=_quotesDBContext.Quotes;
                    break;
            }
            return Ok(quote);
        }

        [HttpGet]
        [Route("[action]")] // for same method use get
        ////public IActionResult SearchQuotes(string type)
        //{

        //}

        // GET: api/Quotes/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
          var quote=  _quotesDBContext.Quotes.Find(id);
            if(quote == null)
            {
                return NotFound();
            }
            return Ok(quote);
        }

        // POST: api/Quotes
        [HttpPost]
        public IActionResult Post([FromBody] Quote value)
        {
            _quotesDBContext.Add(value);
            _quotesDBContext.SaveChanges();
            return StatusCode(StatusCodes.Status201Created);

        }

        // PUT: api/Quotes/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Quote quote)
        {
            var entity = _quotesDBContext.Quotes.Find(id);
            if (entity == null)
            {
                return NotFound();
            }
            else
            {
                entity.Title = quote.Title;
                entity.Title = quote.Author;
                entity.Description = quote.Description;
                entity.Type = quote.Type;
                entity.CreatedDate = quote.CreatedDate;

                _quotesDBContext.SaveChanges();
                return Ok();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var entity = _quotesDBContext.Quotes.Find(id);
            if (entity == null)
            {
                return NotFound();
            }
            else
            {
                _quotesDBContext.Quotes.Remove(entity);
                _quotesDBContext.SaveChanges();
                return Ok();
            }

        }
    }
}
