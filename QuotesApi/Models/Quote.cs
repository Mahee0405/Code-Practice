using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuotesApi.Models
{
    public class Quote
    {
        public int ID { get; set; }
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }

        [Required]
        [StringLength(300)]
        public string Description { get; set; }

        public string  Type { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
