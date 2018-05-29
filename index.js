const Joi = require('joi');

const capitalizeFirstLetter = string => string[0].toUpperCase() + string.slice(1);

module.exports = schema => {
  const describeSchema = Joi.describe(schema);

  const flags = {
    allowOnly: 'Value must exist within the valid values list',
    allowUnknown: 'Unknown keys/items are allowed but ignored',
    stripUnknown: 'Unknown keys/items will be removed'
  };

  let output = '';

  const print = (data) => {
    output += '<ul>';

    if (data.type === 'alternatives') {
      output += '<li><strong>One of the following:</strong><ul>';
      data.alternatives.forEach(alternative => {
        output += '<li>';
        print(alternative);
        output += '</li>';
      });
      output += '</ul></li>';
    } else {
      output += `<li><strong>Type:</strong> ${capitalizeFirstLetter(data.type)}</li>`;
    }

    if (data.rules) {
      output += '<li><strong>Rules:</strong><ul>';
      data.rules.forEach(rule => {
        output += `<li>${rule.name}: ${rule.arg}</li>`;
      });
      output += '</ul></li>';
    }

    if (data.flags) {
      output += '<li><strong>Flags:</strong><ul>';

      Object.keys(data.flags).forEach(flag => {
        const filteredFlag = flags[flag] || `${capitalizeFirstLetter(flag)}: ${data.flags[flag]}`;
        output += `<li>${filteredFlag}</li>`;
      });

      output += '</ul></li>';
    }

    if (data.valids) {
      output += `<li><strong>Valid values: </strong>${data.valids
        .map(item => item || '""')
        .join(', ')}</li>`;
    }

    if (data.invalids) {
      output += `<li><strong>Invalid values: </strong>${data.invalids
        .map(item => item || '""')
        .join(', ')}</li>`;
    }

    if (data.children) {
      output += '<li><strong>Children:</strong><ul>';

      Object.keys(data.children).forEach(child => {
        output += `<li><strong>${child}</strong>`;
        print(data.children[child]);
        output += '</li>';
      });

      output += '</ul></li>';
    }

    output += '</ul>';
  };

  print(describeSchema);

  return output;
};
