# Guia de Tom de Voz — NLL Design (`nlldesign.github.io`)

> **Referência oficial:** `sobreTranslations` (PT e EN) em `assets/js/data.js`.  
> Todo texto visível do portfólio — headlines, subtítulos, resumos de cards, estudos de caso, AI Lab, jogos, Contato e rodapé — deve seguir este guia para soar como a mesma pessoa falando do início ao fim.

---

## 1. Pilares do Tom de Voz

| Pilar | O que fazer | O que evitar |
| :--- | :--- | :--- |
| **1ª pessoa ativa** | Usar "eu" e verbos ativos em 1ª pessoa (*"Eu transformo"*, *"Redesenhei"*, *"Construí"*, *"Validei"*, *"I built"*, *"I mapped"*, *"I shipped"*). | Voz passiva ou impessoal (*"Foi desenvolvido"*, *"Aplicativo pensado para..."*, *"Built an app..."* sem sujeito em EN). |
| **Direto e concreto** | Focar na cadeia **problema real → decisão de design/código → resultado mensurável**. Verbos específicos (*mapeei, cortei, validei, publiquei*). | Jargão corporativo genérico (*"soluções inovadoras"*, *"sinergia"*, *"experiências disruptivas"*). |
| **Humano, atual e sênior** | Conversar de igual para igual com líderes de produto, designers e engenheiros: claro, confiante e acessível. | Tom robótico, acadêmico demais ou excessivamente informal/exclamativo. |
| **Fidelidade aos fatos** | Preservar 100% das empresas, projetos, períodos, links e métricas reais. | Inventar números, inflar escopo ou alterar métricas existentes. |
| **Respeito ao layout** | Manter extensão próxima à original para preservar quebras de linha em cards (`line-clamp-2`/`3`), pills, botões e headlines mobile/desktop. | Textos longos que estouram cards ou empurram CTAs para fora da dobra. |

---

## 2. Regras Bilíngues (PT & EN)

- **Português (PT-BR):** primeira pessoa natural (usar `"Eu"` em headlines e frases de abertura de impacto; nos blocos internos, alternar com verbos conjugados em 1ª pessoa como *"Mapeei"*, *"Desenhei"*, *"Construí"*, *"Entreguei"* para evitar repetição excessiva do pronome).
- **Inglês (EN):** sempre manter o sujeito explícito `"I"` (*"I turn..."*, *"I redesigned..."*, *"I built..."*, *"I shipped..."*) em vez de estilo telegráfico de currículo sem sujeito (*"Redesigned..."*, *"Built..."*).
- **Fallback estático (`index.html`):** todo texto estático em português no `index.html` deve estar 100% sincronizado com `siteTranslations.pt` e `sobreTranslations.pt` para evitar flash de texto desatualizado antes do carregamento do JavaScript.

---

## 3. Checklist Rápido antes de Publicar Novo Conteúdo

1. A headline ou o resumo deixa claro **o que eu fiz** e **por que isso importa**?
2. Em EN, as frases de abordagem e resultado usam `"I + verbo ativo"`?
3. Há algum trecho em voz passiva (*"foi criado"*, *"construído no..."*) que pode virar ação direta (*"criei"*, *"construí no..."*)?
4. Todas as métricas, empresas, períodos e links continuam idênticos aos fatos reais?
5. O texto cabe no card/botão sem quebrar o layout no mobile e no desktop?
6. O fallback PT no `index.html` foi atualizado junto com `assets/js/data.js`?
