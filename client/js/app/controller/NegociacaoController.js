class NegociacaoController{

    constructor(){

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

    }

    adiciona(event){
        event.preventDefault();

        let negociacao = this.obterNegociacao();

        console.log(negociacao);

        this.limparCamposForm();
       
    }

    obterNegociacao(){
        let data = new Date(...
            this._inputData.value
            .split('-')
            .map((item, indice) => item - (indice % 2))
        );

        return new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    limparCamposForm(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
    }
}