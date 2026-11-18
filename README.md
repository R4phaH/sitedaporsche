# Porsche Experience

Site demonstrativo independente, desenvolvido com HTML, CSS e JavaScript puro. Projeto de estudo e portfólio, sem afiliação oficial com a Porsche.

## Funcionalidades
- Catálogo de modelos renderizado a partir de um único arquivo de dados.
- Pesquisa por nome, motor ou categoria.
- Filtros por categoria e ordenação por potência/nome.
- Detalhes de cada veículo em janela modal.
- Favoritos persistidos no navegador com `localStorage`.
- Comparador de até três modelos.
- Vídeos do YouTube carregados somente quando solicitados.
- Layout responsivo, menu mobile, animações de entrada e indicador de rolagem.

## Estrutura
```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data/cars.js
│   ├── modules/
│   │   ├── catalog.js
│   │   ├── comparator.js
│   │   ├── favorites.js
│   │   └── video.js
│   └── main.js
└── assets/
```

## Executar localmente
Abra a pasta com a extensão Live Server do VS Code ou use qualquer servidor HTTP local. Não é necessário instalar dependências.

## Observações
As especificações exibidas foram mantidas conforme a versão inicial do projeto e precisam ser verificadas antes de qualquer uso comercial. Imagens locais e vídeos externos dependem dos respectivos arquivos e serviços.
