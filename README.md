# PONTUAL

O Pontual é um aplicativo em Flask / Python & HTML5.

O Pontual é um aplicativo que busca o minimalismo para o cliente final e oferece uma ampla gama de dados para registro de apontamento em sua empresa.

## Índice

- [Requisitos](#requisitos)
- [Composição](#composição) 
- [Interface](#interface)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Licença](#licença)
- [Links](#links)

## Requisitos
- Docker
- Docker Compose

## Composição
**Pontual:3.0a**
- Python:3.8
- Flask:2.0.3
- MySQL:5.7
- HTML:5, CSS:3, JS/ES:2021

Para mais informações tecnicas, verifique a [Documentação](docs/index.md)

Para mais informações sobre componentes usados no projeto, leia o arquivo requirements.txt ou [Componentes de Terceiros](THIRD-PARTY.md)

## Interface
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;"> 
<figure> <img width="300" height="475" src="https://raw.githubusercontent.com/JonathanAPaes/Software-Product/main/docs/architecture/screenshots/checkbox.on.png"> </figure>
<figure> <img width="300" height="475" src="https://raw.githubusercontent.com/JonathanAPaes/Software-Product/main/docs/architecture/screenshots/checkbox.off.png"> </figure>
</div>

Caso queira ter uma prévia do front-end clique [aqui](https://jonathanapaes.github.io/Software-Product/views/static/funcionario.html)

## Instalação
- Extraia o conteúdo do zip em um diretório
- Navegue até o diretório com o terminal e escreva: 
- **`docker compose up`**

Em paralelo, pode ser iniciado pelo arquivo **`#docker.ps1`**, opção 1

## Utilização

O primeiro acesso possui modo debug ativado e fará gravações direto no banco.

URL de acesso: [localhost](http://localhost/)

Caso o banco não funcione, abra-o manualmente no arquivo **`#docker.ps1`**, opção 4 e cole o conteúdo do arquivo db.sql no console mysql manualmente.

## Licença

O software é licenciado com licença MIT e permite o uso comercial e não comercial do software, alteração e distribuição livre. 

Para mais informações, leia o arquivo de [licença](LICENSE)

## Links

[O Pontual](https://opontual.app) | [GitHub](https://github.com/jonathanapaes/Software-Product) | [GitHub Sites](https://jonathanapaes.github.io/Software-Product) | [Board](https://github.com/users/JonathanAPaes/projects/1)
