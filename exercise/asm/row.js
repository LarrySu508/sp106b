var fs = require('fs');
var asmText = fs.readFileSync(process.argv[2], "utf8");
var lines = asmText.split(/\r?\n/);
for(var i=0;i<lines.length;i++)
{
  console.log(i +"  "+ lines[i]);
}