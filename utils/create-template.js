async function createTemplate(template, name) {
  return template.replace(/{{name}}/gi, name)
}

module.exports = { createTemplate }
