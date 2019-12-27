class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }
    
    obterNegociacaoDaSemana(){

       return this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possivel obter as negociacoes da semana.');
                });
    }

    obterNegociacaoDaSemanaAnterior(){

        return this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possivel obter as negociacoes da semana anterior.');
                });
    }

    obterNegociacaoDaSemanaRetrasada(){

        return this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possivel obter as negociacoes da semana retrasada.');
                });
   }

   obterNegociacoes(){
        return Promise.all([
            this.obterNegociacaoDaSemana(),
            this.obterNegociacaoDaSemanaAnterior(),
            this.obterNegociacaoDaSemanaRetrasada()]
        ).then(periodos => {
            let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo), []);
            
            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        })
   }
}