const nome = new Input('nome');
const sobrenome = new Input('sobrenome');
const cpf = new CPF('cpf');
const usuario = new Input('usuario');
const senha = new Input('senha');
const repetirSenha = new Input('repetir-senha');

const form = [nome, sobrenome, cpf, usuario, senha, repetirSenha];

const botao = document.querySelector('.btn');
const alrightMsg = document.querySelector('#alright');

function submit() {
    Input.thereIsAnError = false;

    for (let input of form) {
        input.content = input.input.value;
        if(!input.isNotEmpty()) input.emptyError();
        else input.noError();
    }
    
    if(usuario.isNotEmpty() && (!usuario.isLettersAndNumbers() || !usuario.isWithinLimit(3, 12))) usuario.invalid();
    if(senha.isNotEmpty() && !senha.isWithinLimit(6, 12)) senha.invalid();
    if(repetirSenha.isNotEmpty() && !repetirSenha.isEqual(senha)) repetirSenha.equalError(senha);
    if(cpf.isNotEmpty() && !cpf.validate()) cpf.invalid();

    if(!Input.thereIsAnError) alrightMsg.innerHTML = 'Looks great!';
    else alrightMsg.innerHTML = '';
}

botao.addEventListener('click', submit);
document.addEventListener('keypress', e => {if(e.code === 'Enter') submit()});