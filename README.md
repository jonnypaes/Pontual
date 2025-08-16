# O PONTUAL

O Pontual é um aplicativo que busca o minimalismo para o cliente final e oferece uma ampla gama de dados para registro de apontamento em sua empresa.

![Wallpaper](views/static/public/graph/1280x720.jpg)

> O Pontual - Um aplicativo minimalista para apontamento

___

## Índice

- [Requisitos](#requisitos)
- [Composição](#composição) 
- [Interface](#interface)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Licença](#licença)
- [Links](#links)

### Requisitos
- Docker
- Docker Compose

### Composição
**Pontual:3.0α** (Alpha)

- Python:3.8
- Flask:2.0.3
- MySQL:5.7
- HTML:5, CSS:3, JS/ES:2021

Para mais informações técnicas, verifique a [Documentação](docs/index.md)

Para mais informações sobre componentes usados no projeto, leia [Componentes de Terceiros](THIRD-PARTY.md)

### Interface
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
<figure> <img width="300" height="475" src="views/static/public/graph/screenshots/checkbox-off.png"> </figure>
<figure> <img width="300" height="475" src="views/static/public/graph/screenshots/checkbox-on.png"> </figure>
</div>

Veja uma demonstração clicando [aqui](views/static/funcionario.html)

### Instalação
- Extraia o conteúdo do zip em um diretório
- Navegue até o diretório com o terminal e escreva: 
- **`docker compose up`**

Em paralelo, pode ser iniciado pelo arquivo **`#docker.ps1`**, opção 1

### Utilização

O primeiro acesso possui modo debug ativado e fará gravações direto no banco.

URL de acesso: [localhost](http://localhost/)

Caso o banco não funcione, abra-o manualmente no arquivo **`#docker.ps1`**, opção 4 e cole o conteúdo do arquivo db.sql no console mysql manualmente.

### Licença

O software é licenciado com licença MIT e permite o uso comercial e não comercial do software, alteração e distribuição livre. 

Para mais informações, leia o arquivo de [licença](LICENSE.txt)

## Links

[GitHub](https://github.com/JonnyPaes/Pontual) | [GitHub Sites](https://JonnyPaes.github.io/Pontual)
