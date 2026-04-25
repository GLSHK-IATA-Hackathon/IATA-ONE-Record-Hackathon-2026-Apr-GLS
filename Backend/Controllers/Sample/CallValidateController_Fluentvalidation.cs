using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPITemplate.Controllers.Sample.ValidModels;

namespace WebAPITemplate.Controllers.Sample
{
    /// <summary>
    /// https://docs.fluentvalidation.net/en/latest/aspnet.html#
    /// </summary>
    [AllowAnonymous]
    [Route("Fluentvalidation/")]
    [ApiController]
    public class CallValidateController_Fluentvalidation : ControllerBase
    {
        private IValidator<ValidateObjectModel_FluentvalidationSample.Person> _validatorPerson;
        private IValidator<ValidateObjectModel_FluentvalidationSample.ContactInfo> _validatorContactInfo;
        private IValidator<ValidateObjectModel_FluentvalidationSample.PersonName> _validatorPersonName;
        public CallValidateController_Fluentvalidation(
            IValidator<ValidateObjectModel_FluentvalidationSample.Person> validatorPerson,
            IValidator<ValidateObjectModel_FluentvalidationSample.ContactInfo> validatorContactInfo,
            IValidator<ValidateObjectModel_FluentvalidationSample.PersonName> validatorPersonName
            )
        {
            // Inject our validator
            _validatorPerson = validatorPerson;
            _validatorContactInfo = validatorContactInfo;
            _validatorPersonName = validatorPersonName;
        }

        [Route("Call_FluentvalidationSample_Body")]
        [HttpPost]
        public FluentValidation.Results.ValidationResult CallValidation_Body(ValidateObjectModel_FluentvalidationSample.Person person)
        {
            FluentValidation.Results.ValidationResult result = _validatorPerson.Validate(person);
            return result;
        }
        [Route("Call_FluentvalidationSample_QueryString")]
        [HttpPost]
        public FluentValidation.Results.ValidationResult CallValidation_QueryString()
        {
            ValidateObjectModel_FluentvalidationSample.ContactInfo contactInfo = GLSHK.Common.QueryStringHelper.ConvertQsToTargetType(Request.QueryString, new ValidateObjectModel_FluentvalidationSample.ContactInfo());

            FluentValidation.Results.ValidationResult result = _validatorContactInfo.Validate(contactInfo);
            return result;
        }

        [Route("Call_FluentvalidationSample_DependentRule")]
        [HttpPost]
        public FluentValidation.Results.ValidationResult Call_FluentvalidationSample_DependentRule(ValidateObjectModel_FluentvalidationSample.PersonName personName)
        {
            FluentValidation.Results.ValidationResult result = _validatorPersonName.Validate(personName);
            return result;
        }
    }
}
