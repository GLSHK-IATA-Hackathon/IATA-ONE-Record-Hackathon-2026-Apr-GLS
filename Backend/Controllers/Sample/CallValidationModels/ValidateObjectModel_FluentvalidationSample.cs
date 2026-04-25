using FluentValidation;
using GLSHK.Common;

namespace WebAPITemplate.Controllers.Sample.ValidModels
{

    /// <summary>
    /// https://docs.fluentvalidation.net/en/latest/aspnet.html#
    /// </summary>
    public class ValidateObjectModel_FluentvalidationSample
    {
        public class Person
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public int Age { get; set; }
            public ContactInfo contactInfo { get; set; }
        }

        public class ContactInfo
        {
            public string TelNo { get; set; }
            public string MobileNo { get; set; }
            public string Address { get; set; }
            public string EmergencyPerson { get; set; } = "Default";

            public string AdditionalEmail { get; set; }
        }

        public class PersonValidator : AbstractValidator<Person>
        {
            public PersonValidator()
            {
                RuleFor(x => x.Id).NotNull();
                RuleFor(x => x.Name).Length(0, 10);
                RuleFor(x => x.Email).EmailAddress().WithMessage("Invalid email address");
                RuleFor(x => x.Age).InclusiveBetween(18, 60);
                RuleFor(x => x.contactInfo.TelNo).NotEmpty();
                RuleFor(x => x.contactInfo.TelNo).Length(8, 8);
                RuleFor(x => x.contactInfo.AdditionalEmail).Matches(@"[a-z]*@[a-z]+");
            }
        }
        public class ContactInfoValidator: AbstractValidator<ContactInfo>
        {
            public ContactInfoValidator()
            {
                RuleFor(x=>x.Address).NotEmpty().WithMessage("Please entry address!");
            }
        }

        public class PersonName
        {
            public string Surname { get; set; }
            public string Forename { get; set; }
        }

        public class PersonNameValidator : AbstractValidator<PersonName>
        {
            public PersonNameValidator()
            {
                RuleFor(x => x.Surname).Length(0, 3).DependentRules(() =>
                {
                    RuleFor(x => x.Forename).Length(0, 10);
                });
            }
        }
    }
}
