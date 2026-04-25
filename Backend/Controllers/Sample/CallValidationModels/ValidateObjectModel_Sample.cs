using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace WebAPITemplate.Controllers.Sample.ValidModels
{

    /// <summary>
    /// sample object model for validation
    ///
    /// reference
    /// -> attribute list at "System.ComponentModel.DataAnnotations"
    /// -> https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-6.0
    /// </summary>
    public class ValidateObjectModel_Sample
    {
        /// <summary>
        /// 輸入資料的模型
        /// </summary>
        public class ValidInfoBody
        {
            /// <summary>
            /// set default value if it is optional 
            /// </summary>
            [Required]
            public string OptionalValue { get; set; } = string.Empty;

            /// <summary>
            /// limit string length
            /// </summary>
            [Required]
            [StringLength(4, ErrorMessage = "The Name value cannot exceed 4 characters.")]
            public string Name { get; set; }


            /// <summary>
            /// set int range
            /// </summary>
            [Required]
            [Range(1, 130)]
            public int Age { get; set; }

            /// <summary>
            /// set date range
            /// </summary>
            [Required]
            [Range(typeof(DateTime), "1/2/2004", "3/4/2004", ErrorMessage = "Value for {0} must be between {1} and {2}")]
            public DateTime SellEndDate { get; set; }

            /// <summary>
            /// should match input type
            /// </summary>
            [Required]
            public DateTime Birthday { get; set; }

            /// <summary>
            /// enum checking
            /// </summary>
            [Required]
            [EnumDataType(typeof(ReorderLevel))]
            public ReorderLevel testEnum { get; set; }

            /// <summary>
            /// using regular expression to check format
            /// limit string length
            /// </summary>
            [Required]
            [RegularExpression(@"[A-Z]*")]
            [StringLength(5, ErrorMessage = "The {0} value cannot exceed {1} characters.")]
            public string CapitalLetter { get; set; }

        }

        public class ValidInfoQueryString
        {
            /// <summary>
            /// 
            /// </summary>
            [Required]
            [RegularExpression(@"[A-Z]*")]
            [StringLength(4, MinimumLength = 2, ErrorMessage = "The {0} value should be [{2} - {1}] characters.")]
            public string Name { get; set; }

            /// <summary>
            /// set int range
            /// </summary>
            [Required]
            [Range(1, 130)]
            public int age { get; set; }

            [StringLength(4, ErrorMessage = "The {0} value should not exceed {1} characters.")]
            public string nickname { get; set; }// = "";
        }

        public enum ReorderLevel
        {
            Zero = 0,
            Five = 5,
            Ten = 10,
            Fifteen = 15,
            Twenty = 20,
            TwentyFive = 25,
            Thirty = 30
        }
    }
}
