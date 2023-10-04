window.onload=function(){
        if(sessionStorage.getItem('escolheuCurso') == null){sessionStorage.setItem('vez', 1)}
        else if(sessionStorage.getItem('escolheuCurso') == true){sessionStorage.setItem('vez', 1);sessionStorage.setItem('escolheuCurso', sessionStorage.getItem('cursoSIGAA'))}
        else{sessionStorage.setItem('vez', 2)}
        const fica = setTimeout(() => {
                if (window.location.href == "https://sigaa.unir.br/sigaa/graduacao/geral.jsf" & document.querySelectorAll("#discente > ul > li:nth-child(1) > ul > li:nth-child(2) > a").length > 0 & sessionStorage.getItem('cadastrarReconhecimento') == null ){
                        var linkInicial = document.querySelector("#discente > ul > li:nth-child(1) > ul > li:nth-child(2) > a")
                        linkInicial.innerText = "Consulta Dados / Imprime Diploma"
                        sessionStorage.clear()
                }
                if(window.location.href=="https://sigaa.unir.br/sigaa/graduacao/geral.jsf" & document.evaluate('//*[@id="formulario"]/h2[contains(.,"Graduação > Histórico Completo do Discente")]', document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue){
                        if(document.getElementsByTagName("ul").length < 5){
                                var topico = document.querySelector("#formulario > h2")
                                topico.innerHTML = '<h2><a href="/sigaa/verMenuGraduacao.do">Graduação</a> &gt; Consulta Dados / Imprime Diploma </h2>'
                        }
                }
        }, 100)
        if(window.location.href=="https://sigaa.unir.br/sigaa/graduacao/busca_discente.jsf"){
                const espera = setTimeout(()=>{
                        var listagem = document.getElementsByClassName('listagem')
                        const visualizacaoDados = document.getElementsByClassName('visualizacao')

                        if(listagem.length > 0 & visualizacaoDados.length < 1 & document.evaluate('//*[@id="formulario"]/h2[contains(.,"Graduação > Histórico Completo do Discente")]', document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue){
                                const concluido = document.evaluate('//*[@id="form"]/table/tbody/tr[contains(.,"CONCLUÍDO")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                                for ( var i=0; i < concluido.snapshotLength; i++ ){
                                        const selecionarDiscente = document.evaluate('.//td[7]/input', concluido.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                                        const tdNomeConcluido = document.evaluate('.//td[4]', concluido.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                                        const spanDiploma = document.createElement("div")
                                        spanDiploma.style.float = "right"
                                        tdNomeConcluido.appendChild(spanDiploma)
                                        const botaoDiploma = document.createElement("input")
                                        botaoDiploma.type = "button"
                                        botaoDiploma.title = "Na próxima tela você poderá inserir detalhes para o diploma."
                                        botaoDiploma.value = "Gerar Diploma"
                                        var matricula = (document.evaluate('.//td[2]', concluido.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).innerText
                                        botaoDiploma.id = matricula
                                        botaoDiploma.className = "btnGeraDiploma"
                                        botaoDiploma.style.cursor = "pointer"
                                        linhaAtual = concluido.snapshotItem(i)
                                        botaoDiploma.addEventListener('click',(linhaAtual)=>{
                                                matricula = linhaAtual.target.id
                                                sessionStorage.setItem('matricula', matricula)
                                                const xpathSelecionarDiscente = "//*[@id=" + "'" + matricula + "'" + "]/ancestor::tr/td[7]/input"
                                                const botaoSelecionarDiscente = document.evaluate(xpathSelecionarDiscente, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
                                                const gerarDiploma = true
                                                botaoSelecionarDiscente.click()
                                                sessionStorage.setItem('emitirDiploma', true);
                                                const cursoSIGAA = document.evaluate("//*[@id='" + matricula + "']/preceding::tr[contains(@class,'curso')][1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText
                                                const ocorrencias = (cursoSIGAA.match(/ - /g) || []).length
                                                myArraycurso = cursoSIGAA.split(' - ')
                                                if (ocorrencias == 2) {
                                                        campus = myArraycurso[1]
                                                        titulo = myArraycurso[2]
                                                }
                                                else if (ocorrencias == 3) {
                                                        campus = myArraycurso[2]
                                                        titulo = myArraycurso[3]
                                                }
                                                sessionStorage.setItem('cursoSIGAA', cursoSIGAA)
                                                sessionStorage.setItem('campus', campus)
                                                sessionStorage.setItem('titulo', titulo)
                                        })
                                        spanDiploma.appendChild(botaoDiploma)
                                        const esperaPraEntrarDenovo = setTimeout(() => {
                                                if (matricula != 'null' & sessionStorage.getItem('emitirDiploma') == 'true') {
                                                        document.getElementById(sessionStorage.getItem('matricula')).click()
                                                }
                                        }, 100)
                                }
                        }
                },50)

                const visualizacaoDados = document.getElementsByClassName('visualizacao')
                

                const aguarda = setTimeout(()=>{
                        var listagem = document.getElementsByClassName('listagem')
                        const visualizacaoDados = document.getElementsByClassName('visualizacao')
                        if (visualizacaoDados.length > 0 & listagem.length == 0 ){
                                matricula = document.querySelector("table > tbody > tr:nth-child(1) > td").innerText
                                if (sessionStorage.getItem('emitirDiploma') == 'true' & sessionStorage.getItem('vez') == 1){
                                        var header = document.querySelector("#conteudo > h2")
                                        header.innerHTML = '<h2><a href="/sigaa/verMenuGraduacao.do">Graduação</a> &gt; Diploma </h2>'
                                        document.querySelector("table > tbody > tr:nth-child(8)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(9)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(13)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(15)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(16)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(17)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(18)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(19)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(23)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(25)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(26)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(27)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(28)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(29)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(30)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(31)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(32)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(33)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(34)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(35)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(36)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(37)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(38)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(39)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(40)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(41)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(42)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(43)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(44)").style.display = 'none'
                                        document.querySelector("table > tbody > tr:nth-child(45)").style.display = 'none'
        
        
                                        nome = document.querySelector(".visualizacao > tbody > tr:nth-child(2) > td").innerText.toLowerCase()
                                        nome = nome.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
                                        nome = nome.replace(" Dos ", " dos ").replace(" Da ", " da ").replace(" De ", " de ").replace(" E ", " e ").replace(" Do ", " do ")
                                        campoCurso = document.querySelector("tr:nth-child(6) > td")
                                        cursoSIGAA = sessionStorage.getItem('cursoSIGAA')
                                        curso = cursoSIGAA.toLowerCase()
                                        campus = sessionStorage.getItem('campus').toLowerCase()
                                        myArraycurso = curso.split(" " + campus)
                                        curso = myArraycurso[0]
                                        curso = curso.replace(" -", "").replace("(vespertino)", "")
                                        curso = curso.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

                                        if(localStorage.getItem(cursoSIGAA)== null){
                                                const linhaCurso = document.querySelector("table > tbody > tr:nth-child(6) > td")
                                                const linkReconhecimento = document.createElement('a')
                                                linkReconhecimento.innerHTML = "<br>" + "ATENÇÃO!!!<br>Necessário cadastrar o Reconhecimento do curso"
                                                linkReconhecimento.style.backgroundColor = "yellow"
                                                linkReconhecimento.style.cursor = "pointer"
                                                linkReconhecimento.addEventListener('click', () => {
                                                    window.open("https://sigaa.unir.br/sigaa/graduacao/reconhecimento/lista.jsf", "_self")
                                                })
                                                linhaCurso.append(linkReconhecimento)
                                                const reconhecimento = localStorage.getItem(cursoSIGAA)
                                        }
                                        else{
                                                const linhaCurso = document.querySelector("table > tbody > tr:nth-child(6) > td")
                                                const linkReconhecimento = document.createElement('a')
                                                linkReconhecimento.innerHTML = "<br>" + localStorage.getItem(cursoSIGAA)
                                                linkReconhecimento.style.cursor = "pointer"
                                                linkReconhecimento.addEventListener('click', ()=>{
                                                        window.open("https://sigaa.unir.br/sigaa/graduacao/reconhecimento/lista.jsf", "_self")
                                                })
                                                linhaCurso.append(linkReconhecimento)
                                                const reconhecimento = localStorage.getItem(cursoSIGAA)
                                        }

                                        sexo = document.querySelector("tr:nth-child(12) > td:nth-child(2)").innerText
                                        if(sexo=="F"){
                                                titulo = sessionStorage.getItem('titulo').substring(0, 9)
                                                generoNascimento = "nascida"
                                                generoPortador = "portadora"
                                                generoDiplomado = "Diplomada"
                                        }
                                        else{
                                                titulo = sessionStorage.getItem('titulo').substring(0, 8)
                                                generoNascimento = "nascido"
                                                generoPortador = "portador"
                                                generoDiplomado = "Diplomado"
                                        }
                                        titulo = titulo.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
                                        dataNascimento = document.querySelector("tr:nth-child(12) > td:nth-child(2)").innerText
                                        naturalidade = document.querySelector("tr:nth-child(12) > td:nth-child(4)").innerText
                                        myArrayNaturalidade = naturalidade.split(" / ")
                                        municNaturalidade = myArrayNaturalidade[0].toLowerCase()
                                        municNaturalidade = municNaturalidade.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
                                        municNaturalidade = municNaturalidade.replace(" Dos ", " dos ").replace(" Da ", " da ").replace(" De ", " de ").replace(" E ", " e ").replace(" Do ", " do ")
                                        if (municNaturalidade.includes("-")){
                                                municNaturalidade = municNaturalidade.split("-")
                                                municNaturalidade = municNaturalidade[0] + "-" + municNaturalidade[1].replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
                                        }
                                        estadoNaturalidade = myArrayNaturalidade[1]
                                        if(estadoNaturalidade == "Acre"){ estadoNaturalidade = "AC";}
                                        else if(estadoNaturalidade == "Alagoas"){ estadoNaturalidade = "AL";}
                                        else if(estadoNaturalidade == "Amapá"){ estadoNaturalidade = "AP";}
                                        else if(estadoNaturalidade == "Amazonas"){ estadoNaturalidade = "AM";}
                                        else if(estadoNaturalidade == "Bahia"){ estadoNaturalidade = "BA";}
                                        else if(estadoNaturalidade == "Ceará"){ estadoNaturalidade = "CE";}
                                        else if(estadoNaturalidade == "Distrito Federal"){ estadoNaturalidade = "DF";}
                                        else if(estadoNaturalidade == "Espírito Santo"){ estadoNaturalidade = "ES";}
                                        else if(estadoNaturalidade == "Goiás"){ estadoNaturalidade = "GO";}
                                        else if(estadoNaturalidade == "Maranhão"){ estadoNaturalidade = "MA";}
                                        else if(estadoNaturalidade == "Mato Grosso"){ estadoNaturalidade = "MT";}
                                        else if(estadoNaturalidade == "Mato Grosso do Sul"){ estadoNaturalidade = "MS";}
                                        else if(estadoNaturalidade == "Minas Gerais"){ estadoNaturalidade = "MG";}
                                        else if(estadoNaturalidade == "Pará"){ estadoNaturalidade = "PA";}
                                        else if(estadoNaturalidade == "Paraíba"){ estadoNaturalidade = "PB";}
                                        else if(estadoNaturalidade == "Paraná"){ estadoNaturalidade = "PR";}
                                        else if(estadoNaturalidade == "Pernambuco"){ estadoNaturalidade = "PE";}
                                        else if(estadoNaturalidade == "Piauí"){ estadoNaturalidade = "PI";}
                                        else if(estadoNaturalidade == "Rio de Janeiro"){ estadoNaturalidade = "RJ";}
                                        else if(estadoNaturalidade == "Rio Grande do Norte"){ estadoNaturalidade = "RN";}
                                        else if(estadoNaturalidade == "Rio Grande do Sul"){ estadoNaturalidade = "RS";}
                                        else if(estadoNaturalidade == "Rondônia"){ estadoNaturalidade = "RO";}
                                        else if(estadoNaturalidade == "Roraima"){ estadoNaturalidade = "RR";}
                                        else if(estadoNaturalidade == "Santa Catarina"){ estadoNaturalidade = "SC";}
                                        else if(estadoNaturalidade == "São Paulo"){ estadoNaturalidade = "SP";}
                                        else if(estadoNaturalidade == "Sergipe"){ estadoNaturalidade = "SE";}
                                        else if(estadoNaturalidade == "Tocantins"){ estadoNaturalidade = "TO";}
                                
                        
                                        nacionalidade = document.querySelector("tr:nth-child(15) > td:nth-child(2)").innerText.toLowerCase()
                                        rg = document.querySelector("tr:nth-child(23) > td:nth-child(2)").innerText
                                        emissorRg = document.querySelector("tr:nth-child(23) > td:nth-child(4)").innerText
                                        ufEmissorRg = document.querySelector("tr:nth-child(25) > td:nth-child(4)").innerText
                                        if(ufEmissorRg == "Acre"){ ufEmissorRg = "AC";}
                                        else if(ufEmissorRg == "Alagoas"){ ufEmissorRg = "AL";}
                                        else if(ufEmissorRg == "Amapá"){ ufEmissorRg = "AP";}
                                        else if(ufEmissorRg == "Amazonas"){ ufEmissorRg = "AM";}
                                        else if(ufEmissorRg == "Bahia"){ ufEmissorRg = "BA";}
                                        else if(ufEmissorRg == "Ceará"){ ufEmissorRg = "CE";}
                                        else if(ufEmissorRg == "Distrito Federal"){ ufEmissorRg = "DF";}
                                        else if(ufEmissorRg == "Espírito Santo"){ ufEmissorRg = "ES";}
                                        else if(ufEmissorRg == "Goiás"){ ufEmissorRg = "GO";}
                                        else if(ufEmissorRg == "Maranhão"){ ufEmissorRg = "MA";}
                                        else if(ufEmissorRg == "Mato Grosso"){ ufEmissorRg = "MT";}
                                        else if(ufEmissorRg == "Mato Grosso do Sul"){ ufEmissorRg = "MS";}
                                        else if(ufEmissorRg == "Minas Gerais"){ ufEmissorRg = "MG";}
                                        else if(ufEmissorRg == "Pará"){ ufEmissorRg = "PA";}
                                        else if(ufEmissorRg == "Paraíba"){ ufEmissorRg = "PB";}
                                        else if(ufEmissorRg == "Paraná"){ ufEmissorRg = "PR";}
                                        else if(ufEmissorRg == "Pernambuco"){ ufEmissorRg = "PE";}
                                        else if(ufEmissorRg == "Piauí"){ ufEmissorRg = "PI";}
                                        else if(ufEmissorRg == "Rio de Janeiro"){ ufEmissorRg = "RJ";}
                                        else if(ufEmissorRg == "Rio Grande do Norte"){ ufEmissorRg = "RN";}
                                        else if(ufEmissorRg == "Rio Grande do Sul"){ ufEmissorRg = "RS";}
                                        else if(ufEmissorRg == "Rondônia"){ ufEmissorRg = "RO";}
                                        else if(ufEmissorRg == "Roraima"){ ufEmissorRg = "RR";}
                                        else if(ufEmissorRg == "Santa Catarina"){ ufEmissorRg = "SC";}
                                        else if(ufEmissorRg == "São Paulo"){ ufEmissorRg = "SP";}
                                        else if(ufEmissorRg == "Sergipe"){ ufEmissorRg = "SE";}
                                        else if(ufEmissorRg == "Tocantins"){ ufEmissorRg = "TO";}
                        
                                        const temConcluido = document.evaluate('/html/body/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[contains(.,"CONCLUÍDO")]', document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue
                                        if (temConcluido) {
                                                semestreConclusao = document.evaluate('/html/body/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[contains(.,"CONCLUÍDO")]/td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText
                                                dataColacao = document.evaluate('/html/body/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[contains(.,"CONCLUÍDO")]/td[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText
                                                apagarDaDataColacao = document.evaluate('/html/body/div[2]/div[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[contains(.,"CONCLUÍDO")]/td[3]/span[contains(@class,"info")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText
                                                dataColacao = dataColacao.replace("\n" + apagarDaDataColacao, "")
                                        }
                                        else {
                                            alert("Por falta de registro no SIGAA referente à colação de grau, os dados devem ser inseridos manualmente no diploma")
                                            semestreConclusao = "@ano/@semestre"
                                            dataColacao = "@dia/@mês/@ano"
                                        }
                                        
                                        const conteudo = document.getElementById("conteudo")
                                        const espaco = document.createElement("br")
                                        conteudo.appendChild(espaco)
                                        const tabela = document.createElement("table")
                                        tabela.style.width = '100%';
                                        conteudo.appendChild(tabela)
                                        const topo = document.createElement("caption")
                                        tabela.appendChild(topo)
                                        const linhaAssinaturas = document.createElement("h3")
                                        linhaAssinaturas.innerHTML = "Dados da direção e reitoria"
                                        linhaAssinaturas.classList.add("tituloTabela")
                                        topo.appendChild(linhaAssinaturas)
                                        const camposAssinatura = document.createElement("tbody")
                                        camposAssinatura.style.width = '100%'
                                        tabela.appendChild(camposAssinatura)
                                        const linha1 = document.createElement("tr")
                                        linha1.style.width = '100%';
                                        camposAssinatura.appendChild(linha1)
                                        const descricao = document.createElement("p")
                                        descricao.innerHTML = "Selecione os responsáveis por assinar o diploma:"
                                        descricao.style.fontWeight = "bold"
                                        camposAssinatura.appendChild(descricao)
                        
                        
                                        camposAssinatura.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const linhaResponsaveis = document.createElement("tr")
                                        linhaResponsaveis.style.width = '100%'
                                        camposAssinatura.appendChild(linhaResponsaveis)
                        
                                        const tdDirecao = document.createElement("td")
                                        tdDirecao.style.width = '40%'
                                        linhaResponsaveis.appendChild(tdDirecao)
                        
                                        const tituloDirecao = document.createElement("span")
                                        tituloDirecao.innerHTML = "Direção:"
                                        tituloDirecao.style.fontWeight = "bold"
                                        tdDirecao.appendChild(tituloDirecao)
                        
                                        tdDirecao.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const inputDiretor = document.createElement("input")
                                        inputDiretor.type = "radio"
                                        inputDiretor.id = "diretor"
                                        inputDiretor.checked = "true"
                                        inputDiretor.name = "direcao"
                                        inputDiretor.value = "diretor"
                                        tdDirecao.appendChild(inputDiretor)
                                        const labelDiretor = document.createElement("label")
                                        labelDiretor.for = "diretor"
                                        labelDiretor.innerHTML = "Diretor(a)"
                                        labelDiretor.style.width = '40%'
                                        labelDiretor.addEventListener('click', () => {
                                                const nomeDiretor = prompt("Insira o nome do diretor, com titulação:")
                                                const cargoDiretor = prompt("Insira o cargo do diretor de campus/núcleo. Exemplo: Diretor do campus de Cacoal")
                                                const portariaDiretor = prompt("Insira a portaria de nomeação do diretor:")
                                                localStorage.setItem('diretor', nomeDiretor + "<br>" + cargoDiretor + "<br>" + portariaDiretor)
                                        })
                                        if (localStorage.getItem('diretor') == null) {
                                                labelDiretor.style.backgroundColor = "yellow"
                                        }
                                        tdDirecao.appendChild(labelDiretor)

                        
                                        tdDirecao.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const inputViceDiretor = document.createElement("input")
                                        inputViceDiretor.type = "radio"
                                        inputViceDiretor.id = "viceDiretor"
                                        inputViceDiretor.name = "direcao"
                                        inputViceDiretor.value = "viceDiretor"
                                        tdDirecao.appendChild(inputViceDiretor)
                                        const labelViceDiretor = document.createElement("label")
                                        labelViceDiretor.for = "viceDiretor"
                                        labelViceDiretor.innerHTML = "Vice-diretor(a)"
                                        labelViceDiretor.style.width = '40%'
                                        labelViceDiretor.addEventListener('click', () => {
                                            const nomeViceDiretor = prompt("Insira o nome do vice-diretor, com titulação:")
                                            const cargoViceDiretor = prompt("Insira o cargo do vice-diretor de campus/núcleo. Exemplo: Vice-diretor do campus de Cacoal")
                                            const portariaViceDiretor = prompt("Insira a portaria de nomeação do vice-diretor:")
                                            localStorage.setItem('vice-diretor', nomeViceDiretor + "<br>" + cargoViceDiretor + "<br>" + portariaViceDiretor)
                                        })
                                        if (localStorage.getItem('vice-diretor') == null) {
                                            labelViceDiretor.style.backgroundColor = "yellow"
                                        }
                                        tdDirecao.appendChild(labelViceDiretor)
                        
                        
                                        const tdReitoria = document.createElement("td")
                                        tdReitoria.style.width = '40%'
                                        linhaResponsaveis.appendChild(tdReitoria)
                        
                                        const tituloReitoria = document.createElement("span")
                                        tituloReitoria.innerHTML = "Reitoria:"
                                        tituloReitoria.style.fontWeight = "bold"
                                        tdReitoria.appendChild(tituloReitoria)
                        
                                        tdReitoria.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const inputReitor = document.createElement("input")
                                        inputReitor.type = "radio"
                                        inputReitor.id = "reitor"
                                        inputReitor.checked = "true"
                                        inputReitor.name = "reitoria"
                                        inputReitor.value = "reitor"
                                        tdReitoria.appendChild(inputReitor)
                                        const labelReitor = document.createElement("label")
                                        labelReitor.for = "reitor"
                                        labelReitor.innerHTML = "Reitor(a)"
                                        labelReitor.style.width = '40%'
                                        labelReitor.addEventListener('click', () => {
                                            const nomeReitor = prompt("Insira o nome do(a) reitor(a), com titulação:")
                                            const cargoReitor = prompt("Insira o cargo do(a) reitor(a). Exemplo: Reitora")
                                            localStorage.setItem('reitor', nomeReitor + "<br>" + cargoReitor)
                                        })
                                        if (localStorage.getItem('reitor') == null) {
                                                labelReitor.style.backgroundColor = "yellow"
                                        }
                                        tdReitoria.appendChild(labelReitor)
                                        
                                        tdReitoria.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                                        
                                        const inputViceReitor = document.createElement("input")
                                        inputViceReitor.type = "radio"
                                        inputViceReitor.id = "viceReitor"
                                        inputViceReitor.name = "reitoria"
                                        inputViceReitor.value = "viceReitor"
                                        tdReitoria.appendChild(inputViceReitor)
                                        const labelViceReitor = document.createElement("label")
                                        labelViceReitor.for = "viceReitor"
                                        labelViceReitor.innerHTML = "Vice-reitor(a)"
                                        labelViceReitor.style.width = '40%'
                                        labelViceReitor.addEventListener('click', () => {
                                            const nomeViceReitor = prompt("Insira o nome do(a) vice-reitor(a), com titulação:")
                                            const cargoViceReitor = prompt("Insira o cargo do(a) vice-reitor(a). Exemplo: Vice-reitor")
                                            localStorage.setItem('vice-reitor', nomeViceReitor + "<br>" + cargoViceReitor)
                                        })
                                        if (localStorage.getItem('vice-reitor') == null) {
                                                labelViceReitor.style.backgroundColor = "yellow"
                                        }
                                        tdReitoria.appendChild(labelViceReitor)
                        
                                        const linhaData = document.createElement("tr")
                                        linhaData.style.width = "100%"
                                        tabela.appendChild(linhaData)
                        
                                        const celulaData = document.createElement("td")
                                        celulaData.style.width = "100%"
                                        celulaData.colSpan = 2
                                        linhaData.appendChild(celulaData)
                        
                                        celulaData.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                                        celulaData.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const dataAssinatura = document.createElement("input")
                                        dataAssinatura.id = "dataAss"
                                        dataAssinatura.type = "date"
                                        celulaData.appendChild(dataAssinatura)
                        
                                        const labelData = document.createElement("label")
                                        labelData.style.width = "100%"
                                        labelData.innerHTML = "Caso seja necessário, insira a data prevista para assinatura do diploma"
                                        celulaData.appendChild(labelData)
                        
                                        celulaData.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                                        celulaData.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const linhaProcesso = document.createElement("tr")
                                        linhaProcesso.style.width = "100%"
                                        tabela.appendChild(linhaProcesso)
                        
                                        const celulaProcesso = document.createElement("td")
                                        celulaProcesso.style.width = "100%"
                                        celulaProcesso.colSpan = 2
                                        linhaProcesso.appendChild(celulaProcesso)
                        
                                        celulaProcesso.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                                        celulaProcesso.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const processoDiploma = document.createElement("input")
                                        processoDiploma.id = "process"
                                        processoDiploma.type = "text"
                                        celulaProcesso.appendChild(processoDiploma)
                        
                                        const labelProcesso = document.createElement("label")
                                        labelProcesso.style.width = "100%"
                                        labelProcesso.innerHTML = "Copie o número do processo no SEI e cole aqui"
                                        celulaProcesso.appendChild(labelProcesso)
                        
                                        celulaProcesso.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                                        celulaProcesso.appendChild(document.createElement("br"))  //Adiciona uma linha em branco
                        
                                        const tfootDestaque = document.createElement("tfoot")
                                        tfootDestaque.style.textAlign = "center"
                                        tabela.style.width = "100%"
                                        tabela.appendChild(tfootDestaque)
                                        const linhaDestaque = document.createElement("tr")
                                        tfootDestaque.appendChild(linhaDestaque)
                                        const celulaDestaque = document.createElement("td")
                                        celulaDestaque.style.width = "100%"
                                        celulaDestaque.colSpan = 2
                                        linhaDestaque.appendChild(celulaDestaque)
                        
                                        const submeter = document.createElement("input")
                                        submeter.type = "submit"
                                        submeter.value = "Gerar Diploma"
                                        submeter.id = "geraDiploma"
                                        submeter.name = "geraDiploma"
                                        submeter.style.cursor = "pointer"
                        
                                        submeter.addEventListener('click',()=>{
                                                const processo = document.getElementById("process").value
                                                if (processo==""){alert("É preciso informar o número do processo SEI com a documentação referente ao diploma")}
                                                else{
                                                        const radioDiretor = document.getElementById("diretor").checked
                                                        if(radioDiretor){
                                                                direcao = localStorage.getItem('diretor')
                                                        }
                                                        else{
                                                                direcao = localStorage.getItem('vice-diretor')
                                                        }
                                                        const radioReitor = document.getElementById("reitor").checked
                                                        if(radioReitor){
                                                                reitoria = localStorage.getItem('reitor')
                                                        }
                                                        else{
                                                                reitoria = localStorage.getItem('vice-reitor')
                                                        }
                                                        var newWindow = window.open("", null, "height=1000,width=2600,status=yes,toolbar=no,menubar=no,location=no");
                                                        newWindow.document.write("<style>.cabecalho{text-align: center; font-style: italic;  font-size: 17px; line-height: 1; margin-top: 220px; font-weight: bold; }</style>");
                                                        newWindow.document.write("<style>p{text-align: center; line-height: 0.2; font-size: 16px; font-weight: bold;}</style>");
                                                        newWindow.document.write("<style>body .pag1{position: relative; right: 50px;}</style>");
                                                        newWindow.document.write("<style>body .pag2{position: static;}</style>");
                                                        newWindow.document.write("<style>table{width: 80%}</style>");
                                                        newWindow.document.write("<style>.inicio{text-align: center; line-height: 1; font-size: 16px; font-weight: bold;}</style>");
                                                        newWindow.document.write("<style>.vintepx{text-align: center; line-height: 0; font-size: 20px; font-weight: bold;}</style>");
                                                        newWindow.document.write("<style>.trintaQuatropx{text-align: center; line-height: 0; font-size: 34px; font-weight: bold;}</style>");
                                                        newWindow.document.write("<style>.nome{text-align: center; font-weight: bold;  font-style: italic; font-size: 50px; line-height: 0;}</style>");
                                                        newWindow.document.write("<style>.assinaturaDiplomado{text-align: center; line-height: 0.9; margin-top: 100px;}</style>");
                                                        newWindow.document.write("<style>.assinaturaDirecao{vertical-align: top; text-align: center; line-height: 1; font-weight: bold; font-size: 16px; margin-top: 80px}</style>");
                                                        newWindow.document.write("<style>.assinaturaReitoria{vertical-align: top; text-align: center; line-height: 1; font-weight: bold; font-size: 16px; margin-top: 80px; margin-left: 50px}</style>");
                                                        newWindow.document.write("<style>.assinaturasDirecaoReitoria{margin-left: 150px}</style>");
                                                        newWindow.document.write("<style>.final{text-align: center; line-height: 1; font-size: 16px; font-weight: bold;}</style>");
                                
                                                        newWindow.document.write("<style>.quebraAqui{page-break-before: always}</style>");
                                
                                                        newWindow.document.write("<style>.tenhoBorda{border-style: solid; border-width: thin; width: 50%; margin-top: 30px}</style>");
                                                        newWindow.document.write("<style>.verso{text-align: left; font-weight: 1; bold; font-size: 14px; line-height: 1.4; padding-left: 10px}</style>");
                                                        newWindow.document.write("<style>.versoTitulo{text-align: center; font-weight: bold; font-size: 14px; line-height: 0.9}</style>");
                                                        newWindow.document.write("<p class='cabecalho pag1'>Criada pela Lei n.º 7.011, de 08 de julho de 1982, D.O.U. de 09 de julho de 1982 <br> Portaria de Recredenciamento nº 1.316 de 17 de novembro de 2016 – D.O.U. de 18 de novembro de 2016</p>")
                                                        newWindow.document.write(`<p class='inicio pag1'>A Reitoria da Fundação Universidade Federal de Rondônia<br>no uso de suas atribuições e tendo em vista a conclusão do</p>`)
                                                        newWindow.document.write(`<p class='vintepx pag1'>Curso de ${curso} em  ${semestreConclusao} e a Colação de Grau em ${dataColacao}, confere o título de</p>`)
                                                        newWindow.document.write(`<p class='trintaQuatropx pag1'>${titulo} em ${curso} a</p>`)
                                                        newWindow.document.write(`<p class='nome pag1'>${nome}</p>`)
                                                        newWindow.document.write(`<p class='final pag1'>nacionalidade ${nacionalidade}, natural de ${municNaturalidade} - ${estadoNaturalidade}, ${generoNascimento} em ${dataNascimento},<br>${generoPortador} da Cédula de Identidade nº ${rg} ${emissorRg}/${ufEmissorRg},<br>e outorga-lhe o presente Diploma, a fim de que possa gozar de todos os direitos e prerrogativas legais.</p>`)
                                
                                                        const dataProvavel = document.getElementById("dataAss").valueAsDate
                                                        if (dataProvavel){
                                                                data = dataProvavel
                                                                var date = data.getDate() + 1
                                                        }
                                                        else{
                                                                data = new Date()
                                                                var date = data.getDate();
                                                        }
                                        
                                                        var month = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][data.getMonth()];
                                                        var year = data.getFullYear();

                                                        campus = campus.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
                                
                                                        newWindow.document.write(`<p class='final pag1'>${campus}–RO, ${date} de ${month} de ${year}.</p>`)
                                                        newWindow.document.write(`<p class='assinaturaDiplomado pag1'>${nome}<br>${generoDiplomado}</p>`)
                                                        newWindow.document.write("<br>")
                                                        newWindow.document.write(`<table class='assinaturasDirecaoReitoria pag1'><tbody><tr><td class='assinaturaDirecao pag1'>${direcao}</td><td class='assinaturaReitoria pag1'>${reitoria}</td></tr></tbody></table>`)
                                                        newWindow.document.write("<p class='quebraAqui'>")
                                                        newWindow.document.write("<br>")
                                                        const reconhecimento = localStorage.getItem(cursoSIGAA)
                                                        newWindow.document.write(`<div class='tenhoBorda pag2'><p class='verso pag2'>Fundação Universidade Federal de Rondônia</p><p class='verso pag2'>CNPJ 04.418.943/0001-90</p><p class='verso pag2'>Curso: ${curso}</p><p class='verso pag2'>Habilitação: Bacharelado em ${curso}</p><p class='verso pag2'>${reconhecimento}</p></div>`)
                                                        newWindow.document.write("<br><br>")
                                                        newWindow.document.write(`<div class='tenhoBorda pag2'><p class='versoTitulo pag2'>FUNDAÇÃO UNIVERSIDADE FEDERAL DE RONDÔNIA – UNIR</p><p class='verso pag2'>Diploma Registrado sob o nº___________, Livro _______, Folha _____, em _____________, por  delegação  de  competência do Ministério da Educação, nos termos da Lei nº 9394, de 20 de dezembro de 1996, e do Decreto nº 9235, de 15 de dezembro de 2017.</p><br><p class='verso pag2'>Processo SEI nº ${processo}</p><br><p class='versoTitulo pag2'>DIRETORIA DE REGISTRO E CONTROLE ACADÊMICO - DIRCA</p><br><br><p class='versoTitulo pag2'>_____________________________________________</p><p class='versoTitulo pag2'>DIRETOR(A) DA DIRCA</p></div>`)
                                                        newWindow.document.body.contentEditable='true';
                                                        newWindow.document.designMode='on';
                                                    void 0
                                                    sessionStorage.clear()
                                                }
                                        })
                                        celulaDestaque.appendChild(submeter)
                                }
                        }
                }, 100)
        }
        if (window.location.href == 'https://sigaa.unir.br/sigaa/graduacao/reconhecimento/lista.jsf' & sessionStorage.getItem('vez') == 1 & sessionStorage.getItem('escolheuCurso') == null){
                var select = document.getElementById('busca:curso')
                cursoSIGAA = sessionStorage.getItem('cursoSIGAA')
                campus = sessionStorage.getItem('campus')
                const esperaUmPouco = setTimeout(() => {
                        if (localStorage.getItem(cursoSIGAA) == null & document.getElementById('busca').length > 0) {
                                if (sessionStorage.getItem('cursoCadastrado') != null) {
                                        select.selectedIndex = sessionStorage.getItem('cursoCadastrado')
                                        if (!document.getElementById('busca:checkCurso').checked) { document.getElementById('busca:checkCurso').click() }
                                        if (sessionStorage.getItem('vez') == '1') { sessionStorage.setItem('escolheuCurso', true) }
                                        else { sessionStorage.setItem('escolheuCurso', 2) }
                                        document.getElementById('busca:buscarButton').click()
                                }
                                else {
                                        for (var i = 1; i < select.options.length; i++) {
                                                arrayOpcao = (select.options[i].text).split(" - ")
                                                const quantas = ((select.options[i].text).match(/ - /g) || []).length
                                                if (quantas == 2) {
                                                        opcao = arrayOpcao[0].split("/")[0] + " - " + arrayOpcao[1] + " - " + arrayOpcao[2]
                                                }
                                                else if (quantas == 3) {
                                                        opcao = arrayOpcao[0] + " - " + arrayOpcao[1].split("/")[0] + " - " + arrayOpcao[2] + " - " + arrayOpcao[3]
                                                }
                                                if (opcao.substring(0, 62) == cursoSIGAA.substring(0, 62)) {
                                                        select.selectedIndex = i;
                                                        if (!document.getElementById('busca:checkCurso').checked) { document.getElementById('busca:checkCurso').click() }
                                                        if (sessionStorage.getItem('vez') == '1') { sessionStorage.setItem('escolheuCurso', true) }
                                                        else { sessionStorage.setItem('escolheuCurso', i) }
                                                        document.getElementById('busca:buscarButton').click()
                                                        break;
                                                }
                                        }
                                }
                                if (sessionStorage.getItem('escolheuCurso') == null) {
                                        sessionStorage.setItem('cadastrarReconhecimento', cursoSIGAA)
                                        window.open("https://sigaa.unir.br/sigaa/graduacao/geral.jsf", "_self")
                                }
                        }
                }, 300)
        }
        if ((window.location.href == 'https://sigaa.unir.br/sigaa/graduacao/reconhecimento/lista.jsf') & (sessionStorage.getItem('escolheuCurso') == 'true') | (sessionStorage.getItem('escolheuCurso') == 'Curso não encontrado')) {
                if(document.getElementById('busca')){
                        const esperaAbrir = setTimeout(()=>{
                                const mensagemErro = document.querySelectorAll("#painel-erros > ul > li").innerHTML
                                if (mensagemErro == "Nenhum registro encontrado de acordo com os critérios de busca informados."){
                                        sessionStorage.setItem('cadastrarReconhecimento', cursoSIGAA)
                                        window.open("https://sigaa.unir.br/sigaa/graduacao/geral.jsf", "_self")
                                }
                                else{
                                        document.getElementById('busca:alterarReconhecimento').click()
                                }
                        }, 1000)
                }
                
                if (!(document.getElementById('busca'))) {
                        const esperaDadosReconhecimento = setTimeout(() => {
                                document.querySelector("#form > table > tfoot > tr > td").style.display = 'none'
                                const reconhecimento = document.getElementById('form:portaria_decreto').value
                                localStorage.setItem(sessionStorage.getItem('cursoSIGAA'), reconhecimento)
                                sessionStorage.setItem(sessionStorage.getItem('matricula'), true)
                                window.open("https://sigaa.unir.br/sigaa/graduacao/busca_discente.jsf", "_self")
                                sessionStorage.removeItem('escolheuCurso')
                        }, 100);
                }
        }
        if (window.location.href == "https://sigaa.unir.br/sigaa/graduacao/geral.jsf" & sessionStorage.getItem('cadastrarReconhecimento') != null) {
                if (sessionStorage.getItem('cadastrarReconhecimento') == sessionStorage.getItem('cursoSIGAA')) {
                        document.getElementById('elgen-2').click()
                        sessionStorage.setItem('cadastrarReconhecimento', 2)
                        document.querySelector("#cdp-cadastros > ul > li:nth-child(18) > ul > li:nth-child(1) > a").click()
                }
                else {
                        const esperaAbrir = setTimeout(() => {
                                const linhaBotoes = document.querySelector("#form > table > tfoot > tr > td")
                                const botaoGravaCurso = document.createElement('button')
                                //botaoGravaCurso.type = "submit"
                                botaoGravaCurso.innerText = "Cadastrar Reconhecimento"
                                botaoGravaCurso.addEventListener('click', () => {
                                        const portaria = document.getElementById('form:portaria_decreto').value
                                        const dataDecreto = document.getElementById('form:Data_do_Decreto').value
                                        const dataPublicacao = document.getElementById('form:Data_da_Publicacao').value
                                        const reconhecimento = portaria + ", " + dataDecreto + ". D.O.U.: " + dataPublicacao
                                        localStorage.setItem(sessionStorage.getItem('cursoSIGAA'), reconhecimento)
                                        sessionStorage.setItem(sessionStorage.getItem('matricula'), true)
                                        window.open("https://www.google.com", "_self")
                                })
                                linhaBotoes.appendChild(botaoGravaCurso)
                                document.querySelector("#form\\:Confirmar").style.display = "none"
                                sessionStorage.removeItem('escolheuCurso')
                                sessionStorage.removeItem('cadastrarReconhecimento')
                        }, 1000)
                }
        }
}
