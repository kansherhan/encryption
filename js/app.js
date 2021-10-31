class EncryptData {
    constructor() {
        this.text = '';
        this.key = '';
        this.uppercase = true;
    }
}

const isSpace = (text) => text === ' ';
const NumberRange = function(min, max, value) {
    if (min > value) {
        return max;
    }
    else if (max < value) {
        return min;
    }
    else {
        return value;
    }
};

const videnereCipher = function(videnereData, normalizer) {
    let text = videnereData.text.toUpperCase();
    let key = videnereData.key.toUpperCase();

    if (text === '' || key === '') {
        return;
    }

    let keyCount = Math.ceil(text.length / key.length);
    let keyText = key.repeat(keyCount).substr(0, text.length);
    let output = '';

    for (let i = 0; i < text.length; i++) {
        if (isSpace(text.charAt(i))) {
            output += text.charAt(i);
        }
        else {
            let textCode = text.charCodeAt(i);
            let keyCode = keyText.charCodeAt(i);
            
            output += normalizer(textCode, keyCode);
        }
    }

    if (!videnereData.uppercase) {
        output = output.toLowerCase();
    }

    return output;
};

const caesarCipher = function(caesarData, normalizer) {
    if (isNaN(caesarData.key * 1)) {
        return;
    }

    let text = caesarData.text.toUpperCase();
    let output = '';

    for (let i = 0; i < text.length; i++) {
        if (isSpace(text.charAt(i))) {
            output += text.charAt(i);
        }
        else {
            let textCode = text.charCodeAt(i);

            output += normalizer(textCode, caesarData.key);
        }
    }

    if (!caesarData.uppercase) {
        output = output.toLowerCase();
    }

    return output;
};

const App = {
    data: function() {
        return {
            vigenere: {
                encrypt: new EncryptData(),
                dencrypt: new EncryptData()
            },
            caesar: {
                encrypt: new EncryptData(),
                dencrypt: new EncryptData()
            }
        }
    },
    methods: {
        hideLoaderPanel() {
            let loader = this.$refs['loader'];

            loader.classList.remove('d-flex');
            loader.classList.add('d-none');
        }
    },
    computed: {
        videnereEncrypt() {
            return videnereCipher(
                this.vigenere.encrypt,
                function(textCode, keyCode) {
                    return String.fromCharCode(((textCode + keyCode) % 26) + 65);
                }
            );
        },
        videnereDencrypt() {
            return videnereCipher(
                this.vigenere.dencrypt,
                function(textCode, keyCode) {
                    let code = textCode - keyCode;

                    if (code < 0) {
                        code = code + 26;
                    }

                    return String.fromCharCode(code + 65);
                }
            );
        },
        caesarEncrypt() {
            return caesarCipher(
                this.caesar.encrypt,
                function(textCode, key) {
                    return String.fromCharCode(NumberRange(65, 90, textCode + key));
                }
            );
        },
        caesarDencrypt() {
            return caesarCipher(
                this.caesar.dencrypt,
                function(textCode, key) {
                    return String.fromCharCode(NumberRange(65, 90, textCode - key));
                }
            );
        }
    },
    mounted: function() {
        this.hideLoaderPanel();
    }
};

window.vueApp = Vue.createApp(App).mount('#app');
