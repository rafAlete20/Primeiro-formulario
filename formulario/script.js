/*
Esse comando basicamente dá acesso a algum elemento dentro do documento html com o "form = document.getElementBy". 
Nesse caso pegamos a referência dos IDs
*/
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_confirmation = document.getElementById("password_confirmation");
/*
Quando clickamos em CADASTRAR, esse evento é iniciado e vai chamar a função checkForm(),
essa função vai verificar uma por uma das funções chamadas dentro dela.
Se algum tiver erro, cada função de verificação é ativada mostrando ou não a mensagem que deve mostrar.
A função checkForm então verifica se todos os itens estão com a classe form_content ou se tem algum com erro.
Se todos estiverem válidos, ele manda o alerta de sucesso no cadastro. Se tiver algum erro, ele falha antes de dar o alerta.
*/
//Coloca um evento dentro do formulário. Como é um evento do tipo submit, nós recebemos um evento do submit
form.addEventListener("submit", (event) =>{
    // Cria um comportamento/evento padrão 
    event.preventDefault();
    checkForm();
})

//Esse evento acontece quando você tira o foco do input, quando da blur(clicka fora).
username.addEventListener("blur", () =>{
    checkInputUsername();
})
email.addEventListener("blur", () =>{
    checkInputEmail();
})
password.addEventListener("blur", () =>{
    checkInputPassword();
})
password_confirmation.addEventListener("blur", () =>{
    checkInputPasswordConfirmation();
})
function checkInputUsername(){
    //Captura o que o usuário digitou na referência do elemento username lá em cima e coloca na usernameValue
    const usernameValue = username.value;
    console.log(usernameValue);
    if(usernameValue === ""){
        //Se o valor da usernameValue for igual a uma string vazia(ou seja, nada), mostra a mensagem de erro através da função errorInput
        errorInput(username, "Username Obrigatório");
    }else{
        //Se o valor for preenchido, você captura o input do username com o "username.parentElement" e acessa a classe "form_content" normalmente 
        const formItem = username.parentElement;
        //o className só muda o nome da classe, tamo usando pra mudar ao invés de usar a calsse de erro
        formItem.className = "form_content"
    }
}
function chackInputEmail(){
    const emailValue = email.value;
    if (emailValue === ""){
        errorInput(email, "O email é obrigatório");
    }else{
        const formItem = email.parentElement;
        formItem.className = "form_content";
    }
}
function checkInputPassword(){
    const passwordValue = password.value;
    if(passwordValue === ""){
        errorInput(password, "Digite a sua senha!")
    }else if(passwordValue.length < 8){
        //se o Valor da passwordValue for menor que 8, faz isso aqui
        errorInput(password, "Asenha deve ter no mínimo 8 caracteres")
    }else{
        const formItem = password.parentElement;
        formItem.className = "form_content";
    }
}
function checkInputPasswordConfirmation(){
    const passwordValue = password.value;
    const confirmationPasswordValue = password_confirmation.value;
    
   if(confirmationPasswordValue === ""){
    errorInput(password_confirmation, "A confirmação de senha é obrigatória!")
   }else if(confirmationPasswordValue !== passwordValue){
    errorInput(password_confirmation, "As senhas não são iguais!")
   }else{
    const formItem = password_confirmation.parentElement;
    formItem.className = "form_content"
   }
}

function checkForm(){
    checkInputUsername();
    chackInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation()

    // Captura  todos os elementos do "form" que forem "form_content"
    const formItems = form.querySelectorAll(".form_content");
    /*
    Variável que armazena todos os itens do forms em um array
    
    Esse "()=>{}" é uma função anônima

    O "every()" verifica se o array passa em alguma condição. 
    No caso a condição é: every() todos os items vaão dar retorno caso o nome da classe do item for a "form_content".
    Caso de um erro, o every trava a função.
    

    */
    const isValid = [...formItems].every( (item) => {
        return item.className === "form_content"
    });
    if(isValid){
        alert("CADASTRO CONCLUIDO!");
    }else{
        alert("Preencha TODOS os campos!");
    }
}
function errorInput(input, message){
    /*
    Nessa função vc captura o input, mas sem o "input.parentElement" 
    que captura o input pai(ou seja, a div) o input capturado será o do próprio formulário
    */
    const formItem = input.parentElement;
    //captura a mensagem escrita no <a>
    const textMessage = formItem.querySelector("a");
    //exibe a mensagem dentro do <a>
    textMessage.innerText = message;
    //Dentro do form, faz a classe "form_content error" ser válida (a classe que mostra os texto vermelho no css) 
    formItem.className = "form_content error";
}