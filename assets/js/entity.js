class Input {
    constructor(inputIdName) {
        this.input = document.querySelector(`#${inputIdName}`);
        this.p = this.input.nextElementSibling;
        this.content = '';
        this.label = this.input.parentElement.children[0].textContent.slice(0, -1);
    }

    isNotEmpty() {return Input.thereIsNoError(this.content !== '')};
    isWithinLimit(min, max) {return Input.thereIsNoError(this.content.length >= min && this.content.length <= max)}    
    isLettersAndNumbers() {
        const regExpression = /^[a-zA-Z0-9]*$/;
        return Input.thereIsNoError(regExpression.test(this.content));
    }
    isEqual(other) {return Input.thereIsNoError(this.content === other.content)}

    noError() {this.p.innerHTML = ''};
    invalid() {this.p.innerHTML = `Campo "${this.label}" inválido`};
    emptyError() {this.p.innerHTML = `Campo "${this.label}" não pode estar vazio`;};
    equalError(other) {this.p.innerHTML = `Campo "${this.label}" é diferente de "${other.label}"`};

    static thereIsAnError = false; 
    static thereIsNoError(logicalValue) {
        if(!logicalValue) Input.thereIsAnError = true;
        return logicalValue;
    };
}

class CPF extends Input {
    constructor(inputIdName) {
        super(inputIdName);
    }

    /**
     * @param {string} newContent
     */
    set content(newContent) {
        if(newContent.replace(/\D+/g, '') === '') this._content = newContent;
        else this._content = newContent.replace(/\D+/g, '');
    }

    get content() {
        return this._content;
    }

    validate() {
        if(!this._content) return false;
        if(typeof this._content !== 'string') return false;
        if(this._content.length !== 11) return false;
        if(this.isSequence()) return false;

        const cpfParcial = this._content.slice(0, -2);
        const digito1 = CPF.criaDigito(cpfParcial);
        const digito2 = CPF.criaDigito(cpfParcial + digito1);

        const novoCpf = cpfParcial + digito1 + digito2;

        return novoCpf === this._content;
    }
    
    isSequence() {
        const sequence = this._content[0].repeat(this._content.length);
        return sequence === this._content;
    }

    static criaDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);
        let regressivo = cpfArray.length + 1;

        const total = cpfArray.reduce((ac, val) => {
            ac += (regressivo * Number(val));
            regressivo--;
            return ac;
        }, 0);

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }
}