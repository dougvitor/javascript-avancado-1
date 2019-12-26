class NegociacaoService{
    
    obterNegociacaoDaSemana(callback){
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4){

                if(xhr.status == 200){
                   
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                }else{

                    console.log(xhr.responseText);

                    callback('Não foi possivel obter as negociacoes do servidor.', null);

                }
            }

        }

        xhr.send();
    }
}