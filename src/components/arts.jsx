function combineTextArt(textLines, artLines) {
  const textWidth = Math.max(...textLines.map(line => line.length));
  const padding = "                         ";

  const maxLines = Math.max(textLines.length, artLines.length);

  const textStartLine = Math.floor((maxLines - textLines.length) / 2);
  const artStartLine = Math.floor((maxLines - artLines.length) / 2);

  const centeredText = Array(maxLines).fill(" ".repeat(textWidth));
  const centeredArt = Array(maxLines).fill("");

  textLines.forEach((line, index) => {
    centeredText[textStartLine + index] = line.padEnd(textWidth, " ");
  });

  artLines.forEach((line, index) => {
    centeredArt[artStartLine + index] = line;
  });

  const combined = centeredText.map((textLine, index) =>
    textLine + padding + centeredArt[index]
  );

  return combined.join("\n");
}






let anime1 = String.raw`                              ______
                            __-''zzzzzz\\\`\\\`--__
                         _-'zzzzzzzzzzzzzzzzz\\\`\`-_
                      _-'zzzzzz*zz*zzzzzzzzzzzzzz\`-_
                     /zzzzzzz,/z/ |zz*zzzzzzzzzzzzzz\`-
                    /zzzzzzz//z/  |zz|zzzzzzzzzzzzzzzz\      
                  ,/zzzzzz,//z/   |zz|\`zzz*zzzzzzzzzzzz\         
                 ,/zzz*zz/ ','    \zz||zzz|zzzzzzzzzzzzz\
                 /zzz/zz/  ,'      \z|\zzz|zzzzzzz*zzzzz\`\
                /*zz//z/   '       \z| \zz|zzzz*zzz\zzzzz|
               |/zz//z/   '         \|  \z|\zzz\zzz|zzzzz|
               ''z/ |/    .          .   \\ \zz\zzz|zzzzz|
              ' |/| ..-_-            .-_-.\\ \zz\zz|zzzz,|
             .  | | /,'#|            ,'#\` \.  \z\zz|zzzz/
                . '| |##, _----_     |###| |   \z\z|zzz/
                \/ \` \`-'./      |    \`._.'/ .   \\\/zz/
                | ---='     .    \`---------'     _+-./
                |                               /   |
                \         .----.                |  /
                 \`\        \__-\`               __-'
                   \`=-_                  ___-='
         _             \`=--___________,='|zz\
    _,-''o\             / /#|......|##\  ,zzz\
   /######o\-______   _/-/##|...../####\./zzzz\
  /#######ooo\---oo\`\/  /---\___/  \`._/  \zzzz\
 /########oooooooo###|     /####|   /     \zzz\
|########ooooooo#####| ____|---#| ----   |o|zzz\
|####ooooooooooo#####|/### |##|- /___/   |o|zzz\
 \##/././|ooo#ooo###//----|---- |###/    |o|zzzz\
  \|././.|#.####o##/ |####|_  _ |###|    |o|zzzz\
   \.....|/.|####_,--|###/*| /*|----     |o|z|zz\
     '-,....---'\`ooo/----..| |.|   |-------\z|zzz
        +-....\\\`-,__/   |../ |.|  /ooooooooo||zzz
         \.....\.../    /./  \.| |o__,,---,/z|zz z
         |......../    /./   |..\ +|.....|zzz|zz z
`;



let books = String.raw`              .__=\__                  .__==__,
            jf'      ~~=\,         _=/~'      \`\,
        ._jZ'            \`\q,   /=~             \`\__
       j5(/                 \`\./                  V\\,   
     .Z))' _____              |             .____, \)/\
    j5(K=~~     ~~~~\=_,      |      _/=~~~~'    \`~~+K\\,
  .Z)\/                \`~=L   |  _=/~                 t\ZL
 j5(_/.__/===========\__   ~q |j/   .__============___/\J(N,
4L#XXXL_________________XGm, \P  .mXL_________________JXXXW8L
~~~~~~~~~~~~~~~~~~~~~~~~~YKWmmWmmW@~~~~~~~~~~~~~~~~~~~~~~~~~~
`

// console.log(books);


export { anime1, books, combineTextArt };