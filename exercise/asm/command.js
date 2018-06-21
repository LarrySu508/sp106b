var dtable = {
  ""   :0b000,
  "M"  :0b001,
  "D"  :0b010,
  "MD" :0b011,
  "A"  :0b100,
  "AM" :0b101,
  "AD" :0b110,
  "AMD":0b111
}

var jtable = {
  ""   :0b000,
  "JGT":0b001,
  "JEQ":0b010,
  "JGE":0b011,
  "JLT":0b100,
  "JNE":0b101,
  "JLE":0b110,
  "JMP":0b111
}

var ctable = {
  "0"   :0b0101010,
  "1"   :0b0111111,
  "-1"  :0b0111010,
  "D"   :0b0001100,
  "A"   :0b0110000, 
  "M"   :0b1110000,
  "!D"  :0b0001101,
  "!A"  :0b0110001, 
  "!M"  :0b1110001,
  "-D"  :0b0001111,
  "-A"  :0b0110011,
  "-M"  :0b1110011,
  "D+1" :0b0011111,
  "A+1" :0b0110111,
  "M+1" :0b1110111,
  "D-1" :0b0001110,
  "A-1" :0b0110010,
  "M-1" :0b1110010,
  "D+A" :0b0000010,
  "D+M" :0b1000010,
  "D-A" :0b0010011,
  "D-M" :0b1010011,
  "A-D" :0b0000111,
  "M-D" :0b1000111,
  "D&A" :0b0000000,
  "D&M" :0b1000000,
  "D|A" :0b0010101,
  "D|M" :0b1010101
}
var fs = require('fs');
var asmText = fs.readFileSync(process.argv[2], "utf8");
var lines = asmText.split(/\r?\n/);
for(var i=0;i<lines.length;i++)
{
  console.log(i +"  "+ lines[i]);
}
for(var i=0;i<lines.length;i++)
{
  lines[i].match(/^([^\/]*)(\/.*)?$/);
  var line = RegExp.$1.trim();
  if(line!=0)
    if(line.startsWith("@")) //A指令
    {
      line=line.substring(1);
      line=line - 0; //line轉數字
      line=line.toString(2);
      line= 0 +  line; //line轉回字串
      linelen=line.length;
      for(var j=0;j<16-linelen;j++)
      {
        line = "0" + line;  
      }
      console.log("    "+line);
    }
    else
    {
      var ccd = line.split("=")
      if(ccd.length==2)
      {
        var binary=0b111<<13|ctable[ccd[1]]<<6|dtable[ccd[0]]<<3|0b000
      } //M=A cdd[0]  ccd[1]
      else
      {
        var ccd = line.split(";")
        var binary=0b111<<13|0b00000000<<6|dtable[ccd[0]]<<3|jtable[ccd[1]];
      }
      binary=binary.toString(2)
      console.log("    "+binary);
    }
    
}
