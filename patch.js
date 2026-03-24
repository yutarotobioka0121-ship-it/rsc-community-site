const fs = require('fs');
const fileLoc = 'src/components/Hero.jsx';
let content = fs.readFileSync(fileLoc, 'utf8');
const replacement = `    // タグデータ（色分け用）
    const tags = [
        { text: "#自己投資", color: "yellow" },
        { text: "#自己啓発", color: "purple" },
        { text: "#投資", color: "green" },
        { text: "#東京", color: "yellow" },
        { text: "#オンライン", color: "purple" },
        { text: "#金持ち父さん", color: "green" },
        { text: "#スキルアップ", color: "yellow" },
        { text: "#株式", color: "purple" },
        { text: "#不動産", color: "green" },
        { text: "#NISA", color: "yellow" },
        { text: "#経済", color: "purple" },
        { text: "#自己実現", color: "green" }
    ];`;
content = content.replace(/\/\/\s*タグデータ（色分け用）[\s\S]*?\];/, replacement);
fs.writeFileSync(fileLoc, content, 'utf8');
