/*

MIT License

Copyright (c) 2024-2025 JustStudio. <https://juststudio.is-a.dev/>

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

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

function truncateString(str, num) {
    return str.length > num ? str.slice(0, num) : str;
}

function truncateString2(str, num) {
    let output__ = truncateString(str, num);
    if (str !== output__) {
        output__ += "...";
    }
    return output__;
}

function decodeBadges(encoded) {
    return Array.from({
        length: 100
    }, (_, index) => (encoded % Math.pow(10, index + 1) >= Math.pow(10, index)));
}

async function fetchData() {
    try {
        const response = await fetch(`https://api.juststudio.is-a.dev/cs/${id}`);
        if (response.status === 404) {
            alert('not found!');
            throw new Error('Not Found');
        }
        const data = await response.json();
        document.getElementById('output').innerHTML = data.code;
        codeInput_();
        let codeInput = document.getElementById('codeInput');
        codeInput.className = '';
        codeInput.classList.add(data.lang || data.langDone);
        codeInput.value = document.getElementById('output').innerText;
        codeInput.disabled = true;
        codeInput.dispatchEvent(new Event('input'));

        let __user__avatar = "https://img.juststudio.is-a.dev/cs/no.png";
        let __user__name = `deleted_user_${data.authorId}`;
        let __user__badge = '';

        const response2 = await fetch(`https://api.juststudio.is-a.dev/user/${data.authorId}`);
        let __data2 = 'deleted';
        if (response2.status !== 404) {
            __data2 = await response2.json();
        }

        if (__data2 !== 'deleted') {
            if (!__data2.banned) {
                __user__name = '@' + __data2.username;
                __user__avatar = __data2.avatar;
                if (decodeBadges(__data2.data.badges)[0] === true) {
                    __user__badge = "JavaScript Developer";
                }
            } else {
                __user__name = `banned_user_${data.authorId}`;
            }
        }
        const pre_data_lang = data.lang || data.langDone;
        let data_lang = pre_data_lang ? languageClasses[pre_data_lang] : 'text';
        document.getElementById('output').innerHTML = `
                        <div class="info_">
                            <user>
                                <img id="_user_avatar" src="${__user__avatar}" width=25 height=25>
                                <span id="_user_name">${truncateString2(__user__name, 30)}</span>
                                <badge id="_user_badge">${__user__badge}</badge>
                            </user>
                            <h1 id="_code_name">${truncateString2(data.name, 26)}
                                <lang id="_code_lang">${data_lang}</lang>
                            </h1>
                        </div>
                    ` + document.getElementById('output').innerHTML;

        if (__user__badge == '') {
            document.getElementById('_user_badge').style.display = 'none';
        }

        codeInput.remove();
    } catch (error) {
        console.error('Error:', error);
    }
}
setTimeout(() => fetchData, 10);
fetchData();
