const messages = {
  above: '{_field_} should be above {{argument.0}}.',
  accepted: '{_field_} should have been accepted',
  after: '{_field_} should be a date after {{argument.0}}',
  after_offset_of:
    '{_field_} should be after {{argument.0}} {{argument.1}} from today’s date',
  alpha: '{_field_} should contain letters only',
  alpha_numeric: '{_field_} should contain letters and numbers only',
  array: '{_field_} should be an ARRAY.',
  before: '{_field_} should be a date before {{argument.0}}.',
  before_offset_of:
    '{_field_} should be before {{argument.0}} {{argument.1}} from today’s date',
  between: '{_field_} should be between {{argument.0}} and {{argument.1}}.',
  boolean: '{_field_} should be true or false.',
  confirmed: '{_field_} confirmation does not match.',
  date: '{_field_} should be a valid date',
  date_format:
    '{_field_} should be a valid date according to given format {{argument.0}}.',
  different: '{_field_} and {{argument.0}} should be different.',
  email: '{_field_} should be a valid email address.',
  ends_with: '{_field_} should end with given letters ({{argument}}).',
  equals: '{_field_} should should equal {{argument.0}}.',
  in: '{_field_} should fall within defined values of ({{argument}}).',
  includes: '{_field_} should include define letters ({{argument}}).',
  integer: '{_field_} should be an INTEGER.',
  ip: '{_field_} should be a valid IP address.',
  ipv4: '{_field_} should be a valid IPV4 address.',
  ipv6: '{_field_} should be a valid IPV6 address.',
  json: '{_field_} should be a valid JSON string.',
  max: '{ _field_ } should not be more than {maxLength} character(s)',
  min: '{_field_} should not be less than {length} character(s)',
  not_equals: '{_field_} should be different than {{argument.0}}.',
  not_in: '{_field_} should not be one of ({{argument}}).',
  object: '{_field_} should be a valid OBJECT.',
  range: '{_field_} should be between {{argument.0}} and {{argument.1}}.',
  regex: '{_field_} format is invalid.',
  required: '{_field_} is required.',
  required_if: '{_field_} is required when {{argument.0}} exist.',
  required_when:
    '{_field_} is required when value of {{argument.0}} is equal to {{argument.1}}',
  required_with_all:
    '{_field_} is required when all of ({{argument}}) are present.',
  required_with_any:
    '{_field_} is required when any of ({{argument}}) are present.',
  required_without_all:
    '{_field_} is required when none of ({{argument}}) are present.',
  required_without_any:
    '{_field_} is required when any of ({{argument}}) are present.',
  same: '{_field_} and {{argument.0}} should match.',
  starts_with: '{_field_} should starts with given letters ({{argument}}).',
  string: '{_field_} should be a STRING.',
  under: '{_field_} should be under {{argument.0}}.',
  unique: '{{_field_}} has already been added.',
  url: '{_field_} should be a valid url.'
}
export default messages
