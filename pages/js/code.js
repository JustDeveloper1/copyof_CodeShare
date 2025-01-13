/*

MIT License

Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

let codeInput = document.getElementById('codeInput');
const placeholder_ = codeInput.placeholder;
const output = document.getElementById('output');
const selectElement = document.querySelector('select');

const languageClasses = {
    'js': 'javascript',
    'ts': 'typescript',
    'c': 'c',
    'c++': 'cpp',
    'c#': 'csharp',
    'css': 'css',
    'go': 'go',
    'html': 'html',
    'java': 'java',
    'json': 'json',
    'lua': 'lua',
    'luau_roblox': 'luau',
    'python': 'python',
    'text': 'plain'
};

const syntaxHighlighting = {
    'javascript': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'yellow',
        'comment': 'gray'
    },
    'typescript': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'yellow',
        'comment': 'gray'
    },
    'java': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'python': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'c': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'cpp': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'csharp': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'go': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'html': {
        'tag': 'blue',
        'attribute': 'orange',
        'value': 'green',
        'punctuation': 'red',
        'default': 'white',
        'comment': 'gray'
    },
    'css': {
        'selector': 'blue',
        'property': 'orange',
        'value': 'green',
        'punctuation': 'red',
        'default': 'white',
        'comment': 'gray'
    },
    'json': {
        'string': 'green',
        'punctuation': 'red',
        'default': 'white',
        'comment': 'gray'
    },
    'lua': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'luau': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    }
};

const syntaxVar = {
    'javascript': /^(true|false|null|const|let|var|if|else|for|while|return|console|this|globalThis|"use strict"|'use strict'|await|async|function|try|catch|new|do|import|from|as|Math|document|window|window.location|window.location.href|window.location.hash|window.location.host|window.location.hostname|window.location.origin|window.location.pathname|window.location.port|window.location.protocol|window.location.search|window.closed|window.innerHeight|window.innerWidth|window.isSecureContext|window.litHtmlVersions|window.localStorage|window.sessionStorage|window.origin|window.opener|window.name|localStorage|sessionStorage|window.document)$/,
    'typescript': /^(true|false|null|const|let|var|if|else|for|while|return|console|this|globalThis|"use strict"|'use strict'|await|async|function|try|catch|new|do|import|from|as|enum|interface|throw)$/,
    'java': /^(true|false|null|public|private|protected|static|void|int|function|if|else|for|while|return|class|System|break|continue|do|switch|case|default|String|boolean|Math|byte|short|char|long|float|double|final|import|extends|new|abstract|interface|enum|implements|try|catch)$/,
    'python': /^(if|else|for|while|return|def|import|lambda|in)$/,
    'c': /^(public|private|protected|static|void|int|function|if|else|for|while|return)$/,
    'cpp': /^(public|private|protected|static|void|int|function|if|else|for|while|return)$/,
    'csharp': /^(public|private|protected|static|void|int|function|if|else|for|while|return)$/,
    'go': /^(public|private|protected|static|void|int|function|if|else|for|while|return)$/,
    'html': '',
    'css': /^(\@import|\!important)$/,
    'json': '',
    'lua': /^(true|false|nil|local|while|function|if|else|for|return|repeat|do|end|not|continue|elseif|in|and|then|math|table|string|break|coroutine|bit32|debug|io|os|package)$/,
    'luau': /^(true|false|nil|local|while|function|if|else|for|return|repeat|do|end|not|continue|elseif|in|and|then|math|table|string|script|break|coroutine|bit32|debug|os|task|game|Enum|TweenInfo|Axes|CFrame|Color3|Content|ColorSequence|CatalogSearchParams|ColorSequenceKeypoint|DockWidgetPluginGuiInfo|DateTime|Font|Faces|FloatCurveKey|Instance|NumberRange|NumberSequence|NumberSequenceKeypoint|OverlapParams|Ray|Rect|Random|Region3|Region3int16|RaycastParams|RotationCurveKey|UDim|UDim2|utf8|vector|Vector2|Vector2int16|Vector3|Vector3int16|workspace|Workspace)$/
};
const syntaxFunc = {
    'javascript': /^(setInterval|setTimeout|alert|addEventListener|Promise|fetch|.then|.catch|console.log|console.warn|console.info|console.error|window.location.reload|window.location.replace|window.alert|window.open|window.close|localStorage.getItem|localStorage.setItem|sessionStorage.getItem|sessionStorage.setItem|window.localStorage.getItem|window.localStorage.setItem|window.sessionStorage.getItem|window.sessionStorage.setItem|globalThis.localStorage.getItem|globalThis.localStorage.setItem|globalThis.sessionStorage.getItem|globalThis.sessionStorage.setItem|window.addEventListener|document.addEventListener|toString)$/,
    'typescript': /^(setInterval|setTimeout|Promise|Error|fetch|.then|.catch|console.log|console.warn|console.info|console.error)$/,
    'java': /^(System.out.println|Math.max|Math.min|Math.sqrt|Math.abs|Math.random|sum)$/,
    'python': /^(print|type|float|int|complex|str|iter|next|len)$/,
    'c': '',
    'cpp': '',
    'csharp': '',
    'go': '',
    'html': '',
    'css': /^(url)$/,
    'json': '',
    'lua': /^(basic|_G|_VERSION|assert|collectgarbage|dofile|error|getmetatable|ipairs|load|loadfile|next|pairs|pcall|print|rawequal|rawget|rawlen|rawset|require|select|setmetatable|tonumber|tostring|type|xpcall|bit32.arshift|bit32.band|bit32.bnot|bit32.bor|bit32.btest|bit32.bxor|bit32.extract|bit32.lrotate|bit32.lshift|bit32.replace|bit32.rrotate|bit32.rshift|coroutine.create|coroutine.resume|coroutine.running|coroutine.status|coroutine.wrap|coroutine.yield|debug.debug|debug.getuservalue|debug.gethook|debug.getinfo|debug.getlocal|debug.getmetatable|debug.getregistry|debug.getupvalue|debug.setuservalue|debug.sethook|debug.setlocal|debug.setmetatable|debug.setupvalue|debug.traceback|debug.upvalueid|debug.upvaluejoin|io.close|io.flush|io.input|io.lines|io.open|io.output|io.popen|io.read|io.stderr|io.stdin|io.stdout|io.tmpfile|io.type|io.write|file:close|file:flush|file:lines|file:read|file:seek|file:setvbuf|file:write|math.abs|math.acos|math.asin|math.atan|math.atan2|math.ceil|math.cos|math.cosh|math.deg|math.exp|math.floor|math.fmod|math.frexp|math.huge|math.ldexp|math.log|math.max|math.min|math.modf|math.pi|math.pow|math.rad|math.random|math.randomseed|math.sin|math.sinh|math.sqrt|math.tan|math.tanh|os.clock|os.date|os.difftime|os.execute|os.exit|os.getenv|os.remove|os.rename|os.setlocale|os.time|os.tmpname|package.config|package.cpath|package.loaded|package.loadlib|package.path|package.preload|package.searchers|package.searchpath|string.byte|string.char|string.dump|string.find|string.format|string.gmatch|string.gsub|string.len|string.lower|string.match|string.rep|string.reverse|string.sub|string.upper|table.concat|table.insert|table.pack|table.remove|table.sort|table.unpack)$/,
    'luau': /^(_G|_VERSION|assert|collectgarbage|error|getmetatable|ipairs|next|pairs|pcall|print|rawequal|rawget|rawlen|rawset|require|select|setmetatable|tonumber|tostring|type|xpcall|bit32.arshift|bit32.band|bit32.bnot|bit32.bor|bit32.btest|bit32.bxor|bit32.extract|bit32.lrotate|bit32.lshift|bit32.replace|bit32.rrotate|bit32.rshift|coroutine.create|coroutine.resume|coroutine.running|coroutine.status|coroutine.wrap|coroutine.yield|math.abs|math.acos|math.asin|math.atan|math.atan2|math.ceil|math.cos|math.cosh|math.deg|math.exp|math.floor|math.fmod|math.frexp|math.huge|math.ldexp|math.log|math.max|math.min|math.modf|math.pi|math.pow|math.rad|math.random|math.randomseed|math.sin|math.sinh|math.sqrt|math.tan|math.tanh|os.clock|os.date|os.difftime|os.execute|os.exit|os.getenv|os.remove|os.rename|os.setlocale|os.time|os.tmpname|string.byte|string.char|string.dump|string.find|string.format|string.gmatch|string.gsub|string.len|string.lower|string.match|string.rep|string.reverse|string.sub|string.upper|table.concat|table.insert|table.pack|table.remove|table.sort|table.unpack|wait|ypcall|spawn|warn|BrickColor|buffer|delay|Delay|ElapsedTime|elapsedTime|gcinfo|getfenv|Instance.new|Instance.fromExisting|loadstring|next|newproxy|tick|time|typeof|unpack|UserSettings|Version|version|Wait)$/
};

function highlightCode(code, lang) {
    const tokens = code.split(/(\s+|;|{|}|,|\(|\)|\n)/);
    const highlightedCode = tokens.map(token => {
        if (lang === 'javascript' || lang === 'typescript') {
            if (token.match(/\/\/.*|\/\*[\s\S]*?\*\//)) return `<span style="color:${syntaxHighlighting[lang].comment}">${token}</span>`;
        } else if (lang === 'html') {
            if (token.match(/<!--[\s\S]*?-->/)) return `<span style="color:${syntaxHighlighting[lang].comment}">${token}</span>`;
        } else if (lang === 'css') {
            if (token.match(/\/\*[\s\S]*?\*\//)) return `<span style="color:${syntaxHighlighting[lang].comment}">${token}</span>`;
        } else if (lang === 'lua') {
            if (token.match(/--.*$/)) return `<span style="color:${syntaxHighlighting[lang].comment}">${token}</span>`;
        }
        if (lang === 'javascript' || lang === 'typescript') {
            if (token.match(syntaxFunc[lang])) return `<span style="color:${syntaxHighlighting[lang].function}">${token}</span>`;
            if (token.match(/'[^']*'|"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].string}">${token}</span>`;
            if (token.match(syntaxVar[lang])) return `<span style="color:${syntaxHighlighting[lang].keyword}">${token}</span>`;
            if (token.match(/^[\w]+$/) && !token.match(/^(const|let|var|function|if|else|for|while|return)$/) && !token.match(syntaxVar[lang]) && !token.match(syntaxFunc[lang])) {
                return `<span style="color:${syntaxHighlighting[lang].parameter}">${token}</span>`;
            }
        } else if (lang === 'java' || lang === 'python' || lang === 'c' || lang === 'cpp' || lang === 'csharp' || lang === 'go') {
            if (token.match(/function/)) return `<span style="color:${syntaxHighlighting[lang].function}">${token}</span>`;
            if (token.match(/'[^']*'|"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].string}">${token}</span>`;
            if (token.match(syntaxVar[lang])) return `<span style="color:${syntaxHighlighting[lang].keyword}">${token}</span>`;
            if (token.match(/^[\w]+$/) && !token.match(syntaxVar[lang])) {
                return `<span style="color:${syntaxHighlighting[lang].parameter}">${token}</span>`;
            }
        } else if (lang === 'lua' || lang === 'luau') {
            if (token.match(syntaxFunc[lang])) return `<span style="color:${syntaxHighlighting[lang].function}">${token}</span>`;
            if (token.match(/'[^']*'|"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].string}">${token}</span>`;
            if (token.match(syntaxVar[lang])) return `<span style="color:${syntaxHighlighting[lang].keyword}">${token}</span>`;
            if (token.match(/^[\w]+$/) && !token.match(syntaxVar[lang])) {
                return `<span style="color:${syntaxHighlighting[lang].parameter}">${token}</span>`;
            }
        } else if (lang === 'html') {
            if (token.match(/&lt\w+/)) return `<span style="color:${syntaxHighlighting[lang].tag}">${token}</span>`;
            if (token.match(/(\w+)=/) && !token.match(/&lt\w+/)) return `<span style="color:${syntaxHighlighting[lang].attribute}">${token}</span>`;
            if (token.match(/'[^']*'|"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].value}">${token}</span>`;
        } else if (lang === 'css') {
            if (token.match(/^[^{]+(?=\s*{)/)) return `<span style="color:${syntaxHighlighting[lang].selector}">${token}</span>`;
            if (token.match(/:\s*[^;]+/) && !token.match(/^[^{]+(?=\s*{)/)) return `<span style="color:${syntaxHighlighting[lang].property}">${token}</span>`;
            if (token.match(/;|{|}/)) return `<span style="color:${syntaxHighlighting[lang].punctuation}">${token}</span>`;
        } else if (lang === 'json') {
            if (token.match(/"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].string}">${token}</span>`;
            if (token.match(/[{}:,]/)) return `<span style="color:${syntaxHighlighting[lang].punctuation}">${token}</span>`;
        }
        if (token.match(/[;{}(),]/)) return `<span style="color:${syntaxHighlighting[lang].punctuation}">${token}</span>`;
        if (token === '\n') return `<br>`;
        return `<span style="color:${syntaxHighlighting[lang].default}">${token}</span>`;
    }).join('');
    return highlightedCode;
}

function showWarn() {
    const warnElements = document.querySelectorAll('.warn');
    warnElements.forEach(element => {
        element.style.display = 'block';
    });
}
function hideWarn() {
    const warnElements = document.querySelectorAll('.warn');
    warnElements.forEach(element => {
        element.style.display = 'none';
    });
}
try {hideWarn();} catch {};

codeInput.addEventListener('input', () => {
    const code = codeInput.value.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt');
    const langClass = Array.from(codeInput.classList).find(cls => languageClasses[cls]);
    const lang = langClass ? languageClasses[langClass] : 'text';
    if (window.location.pathname == '/code') {
        if (lang == 'python' || lang == 'c' || lang == 'cpp' || lang == 'csharp' || lang == 'go') {showWarn();} else {hideWarn();}
    } else {
        try {
            document.getElementById('text').remove();
            document.getElementById('lines_').remove();
        } catch {};
    }
    let outputText;
    if (lang !== 'text') {
        const highlighted = highlightCode(code, lang);
        outputText = highlighted;
    } else {
       outputText = code;
    }

    const codeContainer = document.createElement('div');
    codeContainer.id = 'text';
    output.appendChild(codeContainer);
    codeContainer.innerHTML = outputText.replaceAll('\n', '<br>');

    function addLines() {
        const linesContainer = document.createElement('div');
        linesContainer.id = 'lines_';
        linesContainer.style.pointerEvents = 'none';
        output.appendChild(linesContainer);
    }
    if (window.location.pathname == '/code') {
        setTimeout(() => {
            addLines();
            try {
                codeInput.placeholder = '';
            } catch {
                try {
                    document.getElementById('codeInput').placeholder = '';
                } catch {}
            }
        }, 100)
    } else {addLines();}
    
    codeInput.addEventListener('scroll', () => {
        codeContainer.scrollTop = codeInput.scrollTop;
    });
    codeContainer.addEventListener('scroll', () => {
        codeInput.scrollTop = codeContainer.scrollTop;
    });

    const lines = outputText.split('\n').length;
    linesContainer.innerHTML = '';
    for (let i = 1; i <= lines; i++) {
        linesContainer.innerHTML += `<span>${i}<br></span>`;
    }

    const syncLines = () => {
        const outputScrollTop = output.scrollTop;
        linesContainer.style.transform = `translateY(${outputScrollTop}px)`;
    };
    
    output.addEventListener('scroll', syncLines);
});

try {
    selectElement.addEventListener('change', function() {
        codeInput.className = '';
        codeInput.classList.add(selectElement.value);
        if (selectElement.value == 'python' || selectElement.value == 'c' || selectElement.value == 'cpp' || selectElement.value == 'csharp' || selectElement.value == 'go') {showWarn();} else {hideWarn();}
    });
    hideWarn();
} catch {};

function codeInput_() {
    output.innerHTML += `<textarea id="codeInput" placeholder="${placeholder_ || 'Code here'}"></textarea>`
}

try {
    output.appendChild(codeInput);
} catch {codeInput_();}
if (!(codeInput)) codeInput_();
