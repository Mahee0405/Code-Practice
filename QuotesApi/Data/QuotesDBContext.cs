using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuotesApi.Models;

namespace QuotesApi.Data
{
    public class QuotesDBContext : DbContext
    {
        //use below to iject configuration for addcontext
        public QuotesDBContext(DbContextOptions<QuotesDBContext> options):base(options)
        {

        }
        public DbSet<Quote> Quotes { get; set; }
    }
}
