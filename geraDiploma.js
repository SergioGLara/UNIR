const espera = setInterval(()=>{
    const visualizacaoDados = document.getElementsByClassName('visualizacao')
    const clicado = document.getElementById("clicado")
    if (visualizacaoDados){
        nome = document.querySelector(".visualizacao > tbody > tr:nth-child(2) > td").innerText.toLowerCase()
        nome = nome.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
        curso = document.querySelector("tr:nth-child(6) > td").innerText
        curso = curso.toLowerCase()
        myArraycurso = curso.split(" cacoal")
        curso = myArraycurso[0]
        if (curso=="direito -"){
            curso = "Direito"
            reconhecimento = "Renovação de Reconhecimento Portaria nº 949, D.O.U nº 165, pág. 56, Seção 1, 30/08/2021. D.O.U.: 31/08/2021"
        }
        if(curso=="ciências contábeis"){
            curso = "Ciências Contábeis"
            reconhecimento = "Renovação de Reconhecimento Portaria nº 949, D.O.U nº 165, pág. 56, Seção 1, 30/08/2021. D.O.U.: 31/08/2021"
        }
        if(curso=="administração"){
            curso = "Administração"
            reconhecimento = "Renovação de Reconhecimento Portaria nº 949, D.O.U nº 165, pág. 56, Seção 1, 30/08/2021. D.O.U.: 31/08/2021"
        }
        if(curso=="engenharia de Produçao"){
            curso = "Engenharia de Produção"
            reconhecimento = "Renovação de Reconhecimento Portaria nº 110, D.O.U nº 25, pág. 95, Seção 1, 04/02/2021. D.O.U.: 05/02/2021" //Em 21/06/2022 eu, Sérgio Gonçalves Lara, discordei da página da publicação da portaria de reconhecimento do curso. Para mim era pagina 111, mas a chefe Elisa macedo disse que era 95 e que não precisava se preocupar...
        }
        parte2Curso = myArraycurso[2]
        titulo = parte2Curso.split(" - ")[1]
        sexo = document.querySelector("tr:nth-child(11) > td:nth-child(2)").innerText
        if(sexo=="F"){
            titulo = titulo.substring(0, 9)
            generoNascimento = "nascida"
            generoPortador = "portadora"
            generoDiplomado = "Diplomada"
        }
        else{
            titulo = titulo.substring(0, 8)
            generoNascimento = "nascido"
            generoPortador = "portador"
            generoDiplomado = "Diplomado"
        }
        titulo = titulo.toLowerCase()
        dataNascimento = document.querySelector("tr:nth-child(12) > td:nth-child(2)").innerHTML
        naturalidade = document.querySelector("tr:nth-child(12) > td:nth-child(4)").innerText.toLowerCase()
        naturalidade = naturalidade.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
        nacionalidade = document.querySelector("tr:nth-child(14) > td:nth-child(2)").innerText.toLowerCase()
        rg = document.querySelector("tr:nth-child(22) > td:nth-child(2)").innerText
        emissorRg = document.querySelector("tr:nth-child(22) > td:nth-child(4)").innerText
        ufEmissorRg = document.querySelector("tr:nth-child(24) > td:nth-child(4)").innerText

        linhaPar = document.getElementsByClassName("linhaPar").length
        linhaImpar = document.getElementsByClassName("linhaImpar").length
        nLinhas = linhaPar + linhaImpar
        if(document.querySelector(`.subFormulario > tbody > tr:nth-child(${nLinhas})`).innerText.toString()=="	Migrado do SINGU - 673."){conclusao = document.querySelector(`.subFormulario > tbody > tr:nth-child(${nLinhas - 1})`).innerText.toString()	}
        else{conclusao = document.querySelector(`.subFormulario > tbody > tr:nth-child(${nLinhas})`).innerText.toString()}
    
        console.log(conclusao)
        parte1 = conclusao.split("\n")
        conclusao = parte1[0].split("\t")
        semestreConclusao = conclusao[0]
        dataColacao = conclusao[2]

        clearInterval(espera)
        
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
        tdDirecao.style.width = '50%'
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
        labelDiretor.style.width = '50%'
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
        labelViceDiretor.style.width = '50%'
        tdDirecao.appendChild(labelViceDiretor)


        const tdReitoria = document.createElement("td")
        tdReitoria.style.width = '50%'
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
        labelReitor.style.width = '50%'
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
        labelViceDiretor.style.width = '50%'
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
        tfootDestaque.style.background = "#C8D5EC"
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

        submeter.addEventListener('click',()=>{
        const processo = document.getElementById("process").value
        if (processo==""){alert("É preciso informar o número do processo SEI com a documentação referente ao diploma")}
        else{
            const radioDiretor = document.getElementById("diretor").checked
            if(radioDiretor){
                direcao = "Prof. Dr. Cleberson Eller Loose<br>Diretor do Campus de Cacoal<br>Portaria nº 222/2019/GR/UNIR"
            }
            else{
                direcao = "Prof. Dr. Denny William de Oliveira Mesquita<br>Vice-diretor do Campus de Cacoal<br>Portaria nº 223/2019/GR/UNIR"
            }
            const radioReitor = document.getElementById("reitor").checked
            if(radioReitor){
                reitoria = "Profª. Drª. Marcele Regina Nogueira Pereira<br>Reitora"
            }
            else{
                reitoria = "Prof. Dr. José Juliano Cedaro<br>Vice-reitor"
            }
            document.getElementById("geraDiploma").id = "clicado";
            var newWindow = window.open("", null, "height=1000,width=1600,status=yes,toolbar=no,menubar=no,location=no");
            newWindow.document.write("<style>.cabecalho{text-align: center; font-style: italic;  font-size: 17px; line-height: 1; margin-top: 220px; font-weight: bold;}</style>");
            newWindow.document.write("<style>p{text-align: center; line-height: 0.2; font-size: 16px; font-weight: bold;}</style>");
            newWindow.document.write("<style>table{width: 80%}</style>");
            newWindow.document.write("<style>.inicio{text-align: center; line-height: 1; font-size: 16px; font-weight: bold;}</style>");
            newWindow.document.write("<style>.vintepx{text-align: center; line-height: 0; font-size: 20px; font-weight: bold;}</style>");
            newWindow.document.write("<style>.trintaQuatropx{text-align: center; line-height: 0; font-size: 34px; font-weight: bold;}</style>");
            newWindow.document.write("<style>.nome{text-align: center; font-weight: bold;  font-style: italic; font-size: 42px; line-height: 0;}</style>");
            newWindow.document.write("<style>.assinaturaDiplomado{text-align: center; line-height: 0.9; margin-top: 35px;}</style>");
            newWindow.document.write("<style>.assinaturaDirecao{text-align: center; line-height: 0.9; font-weight: bold; font-size: 16px}</style>");
            newWindow.document.write("<style>.assinaturaReitoria{text-align: center; line-height: 0.9; font-weight: bold; font-size: 16px}</style>");
            newWindow.document.write("<style>.assinaturasDirecaoReitoria{margin-left: 130px}</style>");
            newWindow.document.write("<style>.final{text-align: center; line-height: 1; font-size: 16px; font-weight: bold;}</style>");

            newWindow.document.write("<style>.quebraAqui{page-break-before: always}</style>");

            newWindow.document.write("<style>.tenhoBorda{border-style: solid; border-width: thin; width: 50%}</style>");
            newWindow.document.write("<style>.verso{text-align: left; font-weight: bold; font-size: 14px; line-height: 0.9}</style>");
            newWindow.document.write("<style>.versoTitulo{text-align: center; font-weight: bold; font-size: 14px; line-height: 0.9}</style>");
            newWindow.document.write("<p class='cabecalho'>Criada pela Lei n.º 7.011, de 08 de julho de 1982, D.O.U. de 09 de julho de 1982 <br> Portaria de Recredenciamento nº 1.316 de 17 de novembro de 2016 – D.O.U. de 18 de novembro de 2016</p>")
            newWindow.document.write(`<p class='inicio'>A Reitoria da Fundação Universidade Federal de Rondônia<br>no uso de suas atribuições e tendo em vista a conclusão do</p>`)
            newWindow.document.write(`<p class='vintepx'>Curso de ${curso} em  ${semestreConclusao} e a Colação de Grau em ${dataColacao}, confere o título de</p>`)
            newWindow.document.write(`<p class='trintaQuatropx'>${titulo} em ${curso} a</p>`)
            newWindow.document.write(`<p class='nome'>${nome}</p>`)
            newWindow.document.write(`<p class='final'>nacionalidade ${nacionalidade}, natural de ${naturalidade}, ${generoNascimento} em ${dataNascimento},<br>${generoPortador} da Cédula de Identidade nº ${rg} ${emissorRg},<br>e outorga-lhe o presente Diploma, a fim de que possa gozar de todos os direitos e prerrogativas legais.</p>`)

            const dataProvavel = document.getElementById("dataAss").valueAsDate
            if (dataProvavel){
                data = dataProvavel
                var date = data.getDate() + 1
                console.log(date)
            }
            else{
                data = new Date()
                var date = data.getDate();
            }
    
            var month = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"][data.getMonth()];
            var year = data.getFullYear();

            newWindow.document.write(`<p class='final'>Cacoal–RO, ${date} de ${month} de ${year}.</p>`)
            newWindow.document.write(`<p class='assinaturaDiplomado'>${nome}<br>${generoDiplomado}</p>`)
            newWindow.document.write("<br>")
            newWindow.document.write(`<table class='assinaturasDirecaoReitoria'><tbody><tr><td class='assinaturaDirecao'>${direcao}</td><td class='assinaturaReitoria'>${reitoria}</td></tr></tbody></table>`)
            newWindow.document.write("<p class='quebraAqui'>")
            newWindow.document.write("<br>")
            newWindow.document.write(`<div class='tenhoBorda'><p class='verso'>Fundação Universidade Federal de Rondônia</p><p class='verso'>CNPJ 04.418.943/0001-90</p><p class='verso'>Curso: ${curso}</p><p class='verso'>Habilitação: Bacharelado em ${curso}</p><p class='verso'>${reconhecimento}</p></div>`)
            newWindow.document.write("<br><br>")
            newWindow.document.write(`<div class='tenhoBorda'><p class='versoTitulo'>FUNDAÇÃO UNIVERSIDADE FEDERAL DE RONDÔNIA – UNIR</p><p class='verso'>Diploma Registrado sob o nº___________, Livro _______, Folha _____, em _____________, por  delegação  de  competência do Ministério da Educação, nos termos da Lei nº 9394, de 20 de dezembro de 1996, e do Decreto nº 9235, de 15 de dezembro de 2017.</p><br><p class='verso'>Processo SEI nº ${processo}</p><br><p class='versoTitulo'>DIRETORIA DE REGISTRO E CONTROLE ACADÊMICO - DIRCA</p><br><br><p class='versoTitulo'>_____________________________________________</p><p class='versoTitulo'>DIRETOR(A) DA DIRCA</p></div>`)
            newWindow.document.body.contentEditable='true';
            newWindow.document.designMode='on';
            void 0
        }
        })
        celulaDestaque.appendChild(submeter)
    }
},1000)
