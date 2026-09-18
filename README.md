# EVA LAB

> Laboratorio de prompting jurídico · Creado por **Diego Ojeda**

Herramientas para construir, auditar y verificar prompts jurídicos. Una
herramienta, un curso y un vocabulario para abogados que prefieren entender la
instrucción antes de delegarla.

**La tesis del sitio:** hubo un año en que «prompt» estuvo en todas partes y se
habló de ingeniería de prompts como de una profesión. Hoy ya nadie habla de
ello, y no porque el asunto se resolviera mal: se resolvió. Los modelos
aprendieron a reescribir la instrucción antes de responderla —metaprompting— y
la disciplina se mudó dentro del modelo, donde no se ve y no se firma. Para
quien redacta escritos, esa distancia entre lo que teclea y lo que se ejecuta es
el problema: un prompt es un mandato, y reescribirlo es interpretarlo.

---

## Secciones

| Ruta | Qué es | Estado |
|---|---|---|
| `/` | La tesis: el arco del prompt y las tres exigencias del trabajo jurídico | Publicado |
| `/prompt-lab` | Constructor de prompts en 12 decisiones explícitas; compila a prompt, system prompt y representación intermedia | Publicado |
| `/curso` | Curso e-learning «Construye tu prompt», cinco etapas a ritmo propio | Publicado |
| `/guia` | Guía completa de prompting jurídico | **En construcción** — el índice está publicado con el estado real de cada capítulo |
| `/conceptos` | Vocabulario de IA aplicada al Derecho, en tarjetas de repaso | Publicado |
| `/toolkit` | Qué herramienta para qué encargo, flujos y protocolos de confidencialidad y verificación | Publicado |

### El curso, en cinco etapas

1. **Pregunta** — responder antes de tener ayuda; la respuesta se bloquea.
2. **Prompt** — construir el encargo con decisiones, no con prosa.
3. **Auditoría** — pedir a un modelo que encuentre lo que quedó ambiguo.
4. **Verificación** — ejecutar, elegir *una* afirmación y comprobarla contra su fuente.
5. **Cierre** — volver a la pregunta inicial, comparar y descargar el trabajo.

No hay cuenta, ni servidor, ni envío: el progreso vive en `localStorage` y el
documento final se descarga en Markdown.

---

## EVA

EVA acompaña cada sección: presenta lo que hace, y sobre todo lo que no hace,
con preguntas que se despliegan.

Dos límites deliberados, declarados en la propia interfaz:

- **EVA no es un modelo.** Todo lo que dice está escrito de antemano en
  [`src/content/eva.ts`](src/content/eva.ts). No hay llamadas a ninguna API, ni
  claves, ni costo por uso.
- **EVA no tiene rostro.** Su identificador visual es un monograma geométrico
  (`src/components/eva/EvaMark.tsx`), marcado como tratamiento provisional. Para
  sustituirlo por la imagen oficial: deja el archivo en `public/` y apunta a él
  desde `EVA.assetSrc` en [`src/lib/brand.ts`](src/lib/brand.ts). Ningún otro
  archivo hay que tocar.

---

## Correr en local

```bash
npm ci
npm run dev     # http://localhost:3000
```

```bash
npm run build   # compilación de producción
npm run lint
```

Node 22. Next.js 16 (App Router) · React 19 · Tailwind v4 · framer-motion.

## Despliegue

Listo para Vercel sin configuración: `vercel.json` fija el framework, el
`installCommand` y las cabeceras de seguridad. Todas las rutas son estáticas y
no hay variables de entorno que definir.

---

## Dónde se edita cada cosa

El contenido está separado de la maquetación a propósito: se puede reescribir
sin tocar un solo componente.

| Archivo | Contiene |
|---|---|
| `src/lib/brand.ts` | Nombre, créditos, datos y asset de EVA |
| `src/lib/nav.ts` | Mapa del sitio: barra lateral, superior, móvil y pie leen de aquí |
| `src/content/eva.ts` | Todo lo que EVA dice, sección por sección |
| `src/content/tesis.ts` | El argumento de la portada |
| `src/content/guia.ts` | Índice de la guía y estado de cada capítulo |
| `src/content/curso/` | Contenido del curso: etapas, actividades, laboratorio y prompts |
| `src/data/promptBuilder.ts` | Motor del Prompt Lab: catálogos y compiladores por modelo |
| `src/data/flashcards.ts` | Tarjetas de Conceptos |
| `src/data/tools.ts` | Catálogo del Toolkit |

Para publicar un capítulo de la guía: escríbelo, cambia su `estado` a `'listo'`
y añade su `href` en `src/content/guia.ts`. Mientras no tenga `href`, la tarjeta
no enlaza a ninguna parte.

---

## Advertencia de uso

Herramienta pedagógica. Todo resultado de un modelo de lenguaje debe
verificarse contra fuentes primarias antes de usarse en un escrito, y la
responsabilidad del contenido jurídico recae siempre en quien lo firma.
