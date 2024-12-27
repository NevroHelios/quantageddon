function combineTextArt(textLines, artLines) {
    const textWidth = Math.max(...textLines.map(line => line.length));
    const padding = "    ";  
    
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


let quantArt = `╔══════════════════ QUANTAGEDDON ══════════════════╗
║                                                  ║
║                                                  ║
║                                                  ║
╠══════════════════════════════════════════════════╣
║ Competition Link: xyz                            ║          
║                                                  ║
║ Kaggle Comp Details:                             ║
║ • Stock market prediction challenge              ║
║ • Machine learning-based market analysis         ║
║                                                  ║
║ Timeline:                                        ║
║ Day 1: Kickoff & Dataset Release                 ║
║ Day 2: Development & Public Leaderboard          ║
║ Day 3: Feature Engineering Workshop              ║
║ Day 4: Finals & Winner Announcement              ║
║                                                  ║
║ Evaluation:                                      ║
║ • 80% Model Performance                          ║
║ • 20% Documentation                              ║
║                                                  ║
║ Required Skills:                                 ║
║ • Python                                         ║
║ • Financial Analysis                             ║
║ • Machine Learning                               ║
║                                                  ║
║ Type "ls" to explore learning resources          ║
╚══════════════════════════════════════════════════╝`

let helpArt = `┌─ Essential Commands ─────────────────────┐
│ quant   - View competition details       │
│ ls      - List available resources       │
│ cat     - View resource contents         │
├─ Other Commands ─────────────────────────┤
│ pwd     - Print working directory        │
│ clear   - Clear terminal                 │
│ theme   - Change color theme             │
│ date    - Show current date and time     │
│ tree    - Show resource structure        │
│ whoami  - Show current user              │
└──────────────────────────────────────────┘`


let anime1 = `⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣ `;

// quantArt = combineTextArt(quantArt.split('\n'), anime1.split('\n'));

export {quantArt, helpArt, anime1, combineTextArt};