using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.ValidatorAttributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = true)]
    public class SameAsAttribute : ValidationAttribute
    {
        private object other;

        public SameAsAttribute(object other)
        {
            this.other = other;
        }

        public override bool IsValid(object value)
        {
            return value == other;
        }
    }
}
