const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(process.env.TEMP, 'paiza_works.html'), 'utf8');
const match = content.match(/data-json='([^']+)'/);
if (match) {
  const jsonStr = match[1]
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'");
  const data = JSON.parse(jsonStr);
  const props = data.serverRenderingProps;
  console.log('Keys in serverRenderingProps:', Object.keys(props));
  fs.writeFileSync(path.join(process.env.TEMP, 'paiza_props.json'), JSON.stringify(props, null, 2));
} else {
  console.log('No data-json found');
}

