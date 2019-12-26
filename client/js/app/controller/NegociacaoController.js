class NegociacaoController{

    constructor(){

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'add', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        
    }    

    adiciona(event){
        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this._listaNegociacoes.add(negociacao);

        this._mensagem.texto = 'Negociação adicionada com sucesso.';

        this._limpaForm();
       
    }

    _criaNegociacao(){
       
        let negociacao = new Negociacao(DateHelper.textoParaData(this._inputData.value), this._inputQuantidade.value, this._inputValor.value);
        return negociacao
    }

    _limpaForm(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }
}