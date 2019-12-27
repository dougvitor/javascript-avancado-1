class NegociacaoController{

    constructor(){

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'add', 'esvazia', 'ordena', 'inverteOrdenacao');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordenacaoAtual = '';
        
    }    

    adiciona(event){
        event.preventDefault();

        try{
            let negociacao = this._criaNegociacao();
            this._listaNegociacoes.add(negociacao);
    
            this._mensagem.texto = 'Negociação adicionada com sucesso.';
    
            this._limpaForm();
        }catch(erro){
            this._mensagem.texto = erro;
        }
       
    }

    importaNegociacoes(){
         
        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes =>{
                negociacoes
                    .forEach(negociacao => this._listaNegociacoes.add(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso';
            })
            .catch(error => this._mensagem.texto = error);    
                   
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

    ordena(coluna){

        if(this._ordenacaoAtual == coluna){
            this._listaNegociacoes.inverteOrdenacao();
        }else{
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        
        this._ordenacaoAtual = coluna;
    }
}